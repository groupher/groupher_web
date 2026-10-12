defmodule GroupherServer.Accounts.ProfileViewTracker.ViewCounter do
  @moduledoc """
  Atomically increments a Profile view when its actor window has elapsed.

      locked Profile + tracking identity -> dedupe UPSERT -> User.views
  """

  import Ecto.Query

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Model.User
  alias Accounts.ProfileViewTracker.{Config, ErrorCat}
  alias Accounts.ProfileViewTracker.Model.ProfileViewDedupeState

  @doc "Advances dedupe state and returns the locked, committed Profile counter."
  @spec increment_if_needed(User.t(), map(), DateTime.t()) ::
          {:counted, User.t()} | {:duplicate, User.t()} | {:error, term()}
  def increment_if_needed(%User{} = profile, identity, received_at) do
    counted? = advance_dedupe_state(profile.id, identity, received_at)

    with {:ok, profile} <- current_profile(counted?, profile.id) do
      if counted?, do: {:counted, profile}, else: {:duplicate, profile}
    end
  end

  defp advance_dedupe_state(profile_id, identity, received_at) do
    window_seconds = Config.dedupe_window_seconds(identity.actor_type)
    cutoff = DateTime.add(received_at, -window_seconds, :second)

    expires_at =
      DateTime.add(received_at, Config.dedupe_state_ttl_seconds(identity.actor_type), :second)

    attrs = %{
      profile_id: profile_id,
      viewer_tracking_key: identity.viewer_tracking_key,
      last_counted_at: received_at,
      expires_at: expires_at,
      inserted_at: received_at,
      updated_at: received_at
    }

    conflict_query =
      from(state in ProfileViewDedupeState,
        update: [
          set: [
            last_counted_at: ^received_at,
            expires_at: ^expires_at,
            updated_at: ^received_at
          ]
        ],
        where: state.last_counted_at <= ^cutoff
      )

    case Repo.insert_all(ProfileViewDedupeState, [attrs],
           on_conflict: conflict_query,
           conflict_target: [:profile_id, :viewer_tracking_key],
           returning: [:profile_id]
         ) do
      {1, _rows} -> true
      {0, _rows} -> false
    end
  end

  defp current_profile(true, profile_id) do
    {count, profiles} =
      Repo.update_all(
        from(user in User, where: user.id == ^profile_id, select: user),
        [inc: [views: 1]],
        returning: true
      )

    case {count, profiles} do
      {1, [%User{} = profile]} -> {:ok, profile}
      _ -> {:error, ErrorCat.counter_not_found()}
    end
  end

  defp current_profile(false, profile_id) do
    case Repo.get(User, profile_id) do
      %User{} = profile -> {:ok, profile}
      nil -> {:error, ErrorCat.target_not_found()}
    end
  end
end
