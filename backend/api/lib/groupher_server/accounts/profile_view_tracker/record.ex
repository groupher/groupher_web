defmodule GroupherServer.Accounts.ProfileViewTracker.Record do
  @moduledoc """
  Commits one explicit Profile view synchronously.

      Profile + request classification
        -> lock canonical User
        -> policy + conditional dedupe UPSERT
        -> User.views
        -> post-commit public-cache revalidation
  """

  require Logger

  import Ecto.Query

  alias GroupherServer.{Accounts, Repo, RequestActor}
  alias Accounts.Model.User
  alias Accounts.ProfileViewTracker.{ErrorCat, Identity, Policy, ViewCounter}
  alias RequestActor.Classification

  @telemetry_event [:groupher, :accounts, :profile_view_tracker, :track]
  @read_purposes [
    :public_read,
    :author_preview,
    :moderation_review,
    :operations_inspection,
    :internal_probe
  ]

  @doc "Commits one explicit Profile read and returns the committed view counter."
  @spec track(User.t(), User.t() | nil, Classification.t(), keyword()) ::
          {:ok, %{tracked: boolean(), views: non_neg_integer()}} | {:error, term()}
  def track(%User{} = profile, viewer, %Classification{} = classification, opts) do
    with {:ok, read_purpose} <- read_purpose(opts),
         {:ok, identity} <- Identity.resolve(viewer, classification, opts) do
      Repo.transaction(fn ->
        with {:ok, locked} <- lock_profile(profile.id) do
          process(locked, identity, read_purpose)
        else
          {:error, reason} -> Repo.rollback(reason)
        end
      end)
      |> transaction_result()
      |> maybe_revalidate()
    end
  end

  def track(_profile, _viewer, _classification, _opts) do
    {:error, ErrorCat.invalid_actor_type()}
  end

  defp process(profile, identity, read_purpose) do
    if Policy.allowed?(identity, read_purpose) do
      received_at = DateTime.utc_now() |> DateTime.truncate(:second)

      case ViewCounter.increment_if_needed(profile, identity, received_at) do
        {:counted, counted_profile} ->
          emit(:counted, identity)
          %{tracked: true, counted: true, profile: counted_profile}

        {:duplicate, current_profile} ->
          emit(:duplicate_in_window, identity)
          %{tracked: true, counted: false, profile: current_profile}

        {:error, reason} ->
          Repo.rollback(reason)
      end
    else
      emit(:excluded_by_policy, identity)
      %{tracked: false, counted: false, profile: profile}
    end
  end

  defp lock_profile(profile_id) do
    case Repo.one(from(user in User, where: user.id == ^profile_id, lock: "FOR UPDATE")) do
      %User{} = profile -> {:ok, profile}
      nil -> {:error, ErrorCat.target_not_found()}
    end
  end

  defp transaction_result({:ok, result}), do: {:ok, result}
  defp transaction_result({:error, reason}), do: {:error, reason}

  defp maybe_revalidate({:ok, %{counted: true, profile: profile}} = result) do
    try do
      {:ok, :pass} = Accounts.Profiles.Effects.revalidate_user(profile)
    rescue
      error ->
        report_revalidation_failure(profile.id, Exception.message(error))
    catch
      kind, reason ->
        report_revalidation_failure(profile.id, {kind, reason})
    end

    public_result(result)
  end

  defp maybe_revalidate({:ok, _result} = result), do: public_result(result)
  defp maybe_revalidate({:error, _reason} = error), do: error

  defp public_result({:ok, %{tracked: tracked, profile: profile}}) do
    {:ok, %{tracked: tracked, views: profile.views}}
  end

  defp read_purpose(opts) do
    case Keyword.fetch(opts, :read_purpose) do
      {:ok, purpose} when purpose in @read_purposes -> {:ok, purpose}
      {:ok, _purpose} -> {:error, ErrorCat.invalid_read_purpose()}
      :error -> {:error, ErrorCat.missing_read_purpose()}
    end
  end

  defp emit(outcome, identity) do
    :telemetry.execute(
      @telemetry_event,
      %{count: 1},
      %{outcome: outcome, actor_type: identity.actor_type}
    )
  end

  defp emit_revalidation_failure(profile_id) do
    :telemetry.execute(
      [:groupher, :accounts, :profile_view_tracker, :revalidation_failed],
      %{count: 1},
      %{profile_id: profile_id}
    )
  end

  defp report_revalidation_failure(profile_id, reason) do
    Logger.error("Profile view cache revalidation failed: #{inspect(reason)}")
    emit_revalidation_failure(profile_id)
  end
end
