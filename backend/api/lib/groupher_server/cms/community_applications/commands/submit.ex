defmodule GroupherServer.CMS.CommunityApplications.Commands.Submit do
  @moduledoc """
  Receipt-backed submission Command for a Community Application.

      GraphQL -> Submit Command -> Application Gate -> Persist / Lifecycle -> Receipt result
  """

  require GroupherServer.CMS.Communities.ErrorCat

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.{Command, Gate}
  alias Ecto.Multi
  alias CMS.Communities.{ErrorCat, NamePolicy, SlugClaims}
  alias CMS.CommunityApplications.{Config, Lifecycle, LogoUploads, Persist, Policy}
  alias CMS.CommunityApplications.Query
  alias CMS.CommunityApplications.Commands.{Support, Confirmation}
  alias CMS.Model.CommunityApplication
  alias Helper.{Utils, T, Transaction}

  @categories %{
    "PRODUCT" => :PRODUCT,
    "GAMING" => :GAMING,
    "TEACH" => :TEACH,
    "GROUP" => :GROUP
  }

  @spec execute(map(), User.t(), Ecto.UUID.t()) :: T.domain_res(term())
  def execute(attrs, %User{} = actor, command_id) when is_map(attrs) do
    command = %Command{
      actor: actor,
      command_id: command_id,
      operation: :community_application_submit,
      target: actor,
      params: attrs
    }

    with {:ok, confirmation} <-
           Command.execute(command, action: &action/1, confirmation: Confirmation) do
      Support.result(confirmation)
    end
  end

  defp action(%{actor: actor, params: attrs, command_id: command_id}) do
    with {:ok, application} <-
           Gate.with_application_create_check(actor, fn ->
             submit_application(attrs, actor, command_id)
           end) do
      {:ok, Support.confirmation(Confirmation, application.id, command_id)}
    end
  end

  defp submit_application(attrs, %User{} = user, submit_command_id) do
    with {:ok, normalized} <- normalize_input(attrs),
         fingerprint <- fingerprint(normalized),
         :miss <- submit_command_lookup(user.id, submit_command_id, fingerprint),
         {:ok, _slug} <- NamePolicy.check(normalized.slug),
         %{allowed: true} = policy <- Policy.can_apply(user),
         {:ok, upload} <- LogoUploads.fetch_finalized(normalized.logo_asset_ref, user) do
      now = DateTime.utc_now(:second)
      expires_at = DateTime.add(now, Config.submitted_ttl_days(), :day)

      application_changeset =
        CommunityApplication.changeset(%CommunityApplication{}, %{
          public_ref: "capp_" <> Utils.uid(24),
          user_id: user.id,
          status: :submitted,
          version: 1,
          title: normalized.title,
          slug: normalized.slug,
          desc: normalized.desc,
          logo_asset_ref: normalized.logo_asset_ref,
          locale: normalized.locale,
          apply_category: normalized.apply_category,
          apply_message: normalized.apply_message,
          submit_command_id: submit_command_id,
          input_fingerprint: fingerprint,
          policy_snapshot: policy,
          submitted_at: now,
          expires_at: expires_at
        })

      Multi.new()
      |> Multi.run(:application, fn _repo, _changes ->
        Persist.insert_application(application_changeset)
      end)
      |> SlugClaims.insert_application(:slug_claim, :application, expires_at)
      |> LogoUploads.attach(:logo_upload, upload, :application)
      |> Multi.run(:event, fn _repo, %{application: application} ->
        application
        |> Lifecycle.initial_event_changeset(%{
          type: :applicant,
          id: user.id,
          operation_ref: submit_command_id,
          occurred_at: now
        })
        |> Persist.insert_event()
      end)
      |> Transaction.run()
      |> normalize_submit_result(user.id, submit_command_id, fingerprint)
    else
      {:hit, application} -> {:ok, application}
      {:error, _} = error -> error
      %{allowed: false} = policy -> {:error, Policy.denial_error(policy)}
    end
  end

  defp normalize_input(attrs) do
    title = attrs |> get(:title) |> normalize_string()
    desc = attrs |> get(:desc) |> normalize_string()
    logo_asset_ref = attrs |> get(:logo_asset_ref) |> normalize_string()
    locale = attrs |> get(:locale, "en") |> normalize_string()
    apply_message = attrs |> get(:apply_message) |> normalize_string()
    category = attrs |> get(:apply_category) |> normalize_category()

    with {:ok, slug} <- NamePolicy.format_check(get(attrs, :slug)),
         true <- is_binary(title) and byte_size(title) <= 80,
         true <- is_binary(desc) and byte_size(desc) <= 2_000,
         true <- is_binary(logo_asset_ref),
         true <- is_binary(locale),
         true <- not is_nil(category) do
      {:ok,
       %{
         title: title,
         slug: slug,
         desc: desc,
         logo_asset_ref: logo_asset_ref,
         locale: locale,
         apply_category: category,
         apply_message: apply_message
       }}
    else
      {:error, _} = error -> error
      _ -> {:error, ErrorCat.invalid_application_input()}
    end
  end

  defp submit_command_lookup(user_id, key, fingerprint) do
    case Query.by_submit_command(user_id, key) do
      nil -> :miss
      %{input_fingerprint: ^fingerprint} = application -> {:hit, application}
      _ -> {:error, ErrorCat.command_identity_conflict()}
    end
  end

  defp normalize_submit_result({:ok, %{application: application}}, _user_id, _key, _fingerprint) do
    {:ok, application}
  end

  defp normalize_submit_result(
         {:error, :application, %Ecto.Changeset{}, _changes},
         user_id,
         key,
         fingerprint
       ) do
    case submit_command_lookup(user_id, key, fingerprint) do
      {:hit, application} ->
        {:ok, application}

      {:error, ErrorCat.error_pattern(reason: :idempotency_conflict)} ->
        {:error, ErrorCat.command_identity_conflict()}

      :miss ->
        {:error, ErrorCat.active_application_exists()}
    end
  end

  defp normalize_submit_result({:error, :slug_claim, _changeset, _changes}, _, _, _) do
    {:error, ErrorCat.slug_claimed()}
  end

  defp normalize_submit_result({:error, _step, reason, _changes}, _, _, _), do: {:error, reason}

  defp fingerprint(attrs) do
    attrs
    |> Enum.sort()
    |> :erlang.term_to_binary()
    |> then(&:crypto.hash(:sha256, &1))
    |> Base.encode16(case: :lower)
  end

  defp normalize_category(value) when is_atom(value) do
    value |> Atom.to_string() |> normalize_category()
  end

  defp normalize_category(value) when is_binary(value) do
    Map.get(@categories, String.upcase(String.trim(value)))
  end

  defp normalize_category(_), do: nil

  defp get(map, key, default \\ nil) do
    Map.get(map, key, Map.get(map, Atom.to_string(key), default))
  end

  defp normalize_string(value) when is_binary(value) do
    value = String.trim(value)
    if value == "", do: nil, else: value
  end

  defp normalize_string(_), do: nil
end
