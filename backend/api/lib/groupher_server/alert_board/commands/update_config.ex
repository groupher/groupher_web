defmodule GroupherServer.AlertBoard.Commands.UpdateConfig do
  @moduledoc """
  Updates one scoped policy with an immutable RuleSet and command receipt.

      expected config version + strict input
        -> CMS Command Receipt
        -> authorization + locked ReviewConfig
        -> new RuleSet + config version
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  import Ecto.Query

  alias GroupherServer.{Accounts, AlertBoard, CMS, Repo}
  alias AlertBoard.Authorization
  alias AlertBoard.Model.{ReviewConfig, RuleSet}
  alias Accounts.Model.User
  alias CMS.Model.Community
  alias CMS.Command.ConfirmationDefinition

  @pipeline operation: :alert_board_update_config,
            access: :user,
            target: :scope,
            params: [:subject_kind, :expected_version, :attrs],
            confirmation: __MODULE__.Confirmation

  defmodule Confirmation do
    @moduledoc """
    Recovers the updated config key after a lost response.

        updateReviewConfig Receipt -> Confirmation -> AlertBoard Query
    """

    use ConfirmationDefinition,
      operation: :alert_board_update_config,
      data_keys: ["config_id", "command_id"],
      field_types: %{"config_id" => :integer, "command_id" => :string}
  end

  @doc "Updates a platform or community policy if its expected version is current."
  @spec execute(map(), atom(), pos_integer(), map(), User.t(), Ecto.UUID.t()) ::
          {:ok, ReviewConfig.t()} | {:error, term()}
  def execute(scope, subject_kind, expected_version, attrs, %User{} = actor, command_id)
      when subject_kind in [:article, :comment, :doc] and is_integer(expected_version) and
             is_map(attrs) do
    execute_pipeline(scope, subject_kind, expected_version, attrs, actor, command_id)
  end

  def execute(_scope, _subject_kind, _expected_version, _attrs, _actor, _command_id) do
    {:error, AlertBoard.ErrorCat.review_config_invalid()}
  end

  receipt_pipeline execute_pipeline(
                     scope,
                     subject_kind,
                     expected_version,
                     attrs,
                     actor,
                     command_id
                   ) do
    prepare(fn -> prepare(scope, subject_kind, expected_version, attrs) end)
    gate(fn prepared -> authorize(prepared, actor) end)

    change(fn prepared ->
      context = %{actor: actor, command_id: command_id}

      persist(
        context,
        prepared.scope,
        prepared.scope_key,
        prepared.subject_kind,
        prepared.expected_version,
        prepared.attrs
      )
    end)

    confirm(fn confirmation -> {:ok, confirmation} end)
    present(&present_result/1)
  end

  defp prepare(scope, subject_kind, expected_version, attrs) do
    with {:ok, scope_key, target} <- normalize_scope(scope) do
      {:ok,
       %{
         scope: scope,
         scope_key: scope_key,
         subject_kind: subject_kind,
         expected_version: expected_version,
         attrs: attrs
       },
       target: target,
       params: %{
         "scope_key" => scope_key,
         "subject_kind" => Atom.to_string(subject_kind),
         "expected_version" => expected_version,
         "config" => attrs
       }}
    end
  end

  defp authorize(%{scope: scope} = prepared, actor) do
    with {:ok, :pass} <- Authorization.authorize(scope, configure_action(scope), actor) do
      {:ok, prepared}
    end
  end

  defp persist(context, _scope, scope_key, subject_kind, expected_version, attrs) do
    with {:ok, :pass} <- validate_attrs(attrs),
         %ReviewConfig{} = config <- locked_config(scope_key, subject_kind),
         {:ok, :pass} <- check_version(config, expected_version),
         {:ok, ruleset_id} <- persist_ruleset(config, attrs, context.actor, context.command_id),
         {:ok, updated} <-
           config
           |> ReviewConfig.changeset(%{
             version: config.version + 1,
             publish_mode: attrs.publish_mode,
             edit_mode: attrs.edit_mode,
             background_check: attrs.background_check,
             ruleset_id: ruleset_id
           })
           |> Repo.update() do
      {:ok,
       %Confirmation{
         data: %{"config_id" => updated.id, "command_id" => context.command_id}
       }}
    else
      nil -> {:error, AlertBoard.ErrorCat.review_config_not_found()}
      {:error, _reason} = error -> error
      _ -> {:error, AlertBoard.ErrorCat.review_config_invalid()}
    end
  end

  defp validate_attrs(attrs) do
    allowed = [
      :publish_mode,
      :edit_mode,
      :background_check,
      :rules,
      :prompt,
      :provider_profile,
      :required_modalities
    ]

    rules = Map.get(attrs, :rules)
    modalities = Map.get(attrs, :required_modalities)

    cond do
      Map.keys(attrs) -- allowed != [] ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      attrs.publish_mode not in [:immediate, :ai_first, :human_first] ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      attrs.edit_mode not in [:immediate, :ai_first] ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      not is_boolean(attrs.background_check) ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      not is_map(rules) or not is_list(Map.get(rules, "items", Map.get(rules, :items))) ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      not is_list(modalities) or not Enum.all?(modalities, &(&1 in ["text", "image"])) ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      true ->
        validate_ai_requirements(attrs, rules, modalities)
    end
  end

  defp validate_ai_requirements(attrs, rules, modalities) do
    items = Map.get(rules, "items", Map.get(rules, :items))
    model_rules = Enum.filter(items, &(value(&1, "kind") == "judge"))
    ai_mode? = attrs.publish_mode == :ai_first or attrs.edit_mode == :ai_first

    cond do
      ai_mode? and (model_rules == [] or not attrs.background_check) ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      model_rules != [] and
          (not is_binary(Map.get(attrs, :provider_profile)) or
             Map.get(attrs, :provider_profile) == "") ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      model_rules != [] and not Enum.any?(modalities, &(&1 == "text")) ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      model_rules != [] ->
        case GroupherServer.ReviewBot.profile(Map.get(attrs, :provider_profile)) do
          {:ok, profile} -> validate_profile_modalities(profile, modalities)
          {:error, _reason} -> {:error, AlertBoard.ErrorCat.review_config_invalid()}
        end

      true ->
        {:ok, :pass}
    end
  end

  defp validate_profile_modalities(profile, modalities) do
    if Enum.all?(modalities, &(&1 in profile.modalities)) do
      {:ok, :pass}
    else
      {:error, AlertBoard.ErrorCat.review_config_invalid()}
    end
  end

  defp persist_ruleset(_config, %{rules: %{"items" => []}}, _actor, _command_id), do: {:ok, nil}
  defp persist_ruleset(_config, %{rules: %{items: []}}, _actor, _command_id), do: {:ok, nil}

  defp persist_ruleset(config, attrs, actor, command_id) do
    version =
      RuleSet
      |> where([ruleset], ruleset.scope_key == ^config.scope_key)
      |> select([ruleset], max(ruleset.version))
      |> Repo.one()
      |> case do
        nil -> 1
        previous -> previous + 1
      end

    rules = attrs.rules |> stringify_map()

    Repo.insert(
      RuleSet.changeset(%RuleSet{}, %{
        scope_key: config.scope_key,
        version: version,
        rules: rules,
        prompt: Map.get(attrs, :prompt),
        provider_profile: Map.get(attrs, :provider_profile),
        required_modalities: attrs.required_modalities,
        created_by_id: actor.id,
        operation_ref: command_id
      })
    )
    |> case do
      {:ok, ruleset} -> {:ok, ruleset.id}
      {:error, reason} -> {:error, reason}
    end
  end

  defp locked_config(scope_key, subject_kind) do
    configs =
      ReviewConfig
      |> where([config], config.scope_key == ^scope_key)
      |> order_by([config], asc: config.subject_kind)
      |> lock("FOR UPDATE")
      |> Repo.all()

    Enum.find(configs, &(&1.subject_kind == subject_kind))
  end

  defp check_version(%ReviewConfig{version: version}, version), do: {:ok, :pass}

  defp check_version(_config, _expected) do
    {:error, AlertBoard.ErrorCat.review_config_version_conflict()}
  end

  defp normalize_scope(%{kind: :platform}) do
    {:ok, "platform", {:alert_board_config, "platform"}}
  end

  defp normalize_scope(%{kind: :community, community: %Community{id: id} = community}) do
    {:ok, "community:#{id}", community}
  end

  defp normalize_scope(_scope), do: {:error, AlertBoard.ErrorCat.review_config_invalid()}

  defp configure_action(%{kind: :platform}), do: "review.platform.configure"
  defp configure_action(_scope), do: "review.configure"

  defp present_result(%Confirmation{data: %{"config_id" => id}}) do
    case Repo.get(ReviewConfig, id) |> Repo.preload(:ruleset) do
      %ReviewConfig{} = config -> {:ok, config}
      nil -> {:error, AlertBoard.ErrorCat.review_config_not_found()}
    end
  end

  defp present_result(_result), do: {:error, AlertBoard.ErrorCat.review_config_invalid()}

  defp value(map, key), do: Map.get(map, key) || Map.get(map, String.to_existing_atom(key))

  defp stringify_map(map) when is_map(map) do
    Map.new(map, fn {key, value} ->
      key = if is_atom(key), do: Atom.to_string(key), else: key
      value = if is_map(value), do: stringify_map(value), else: value
      {key, value}
    end)
  end
end
