defmodule GroupherServerWeb.Resolvers.Accounts.ProfileViewTracker do
  @moduledoc """
  Adapts explicit Profile view tracking to the Accounts boundary.

      trackProfileView -> RequestActor context -> Accounts.ProfileViewTracker
  """

  alias GroupherServer.Accounts
  alias Accounts.Model.User

  @doc "Tracks one visible public Profile using the request-scoped actor identity."
  @spec track_profile_view(term(), map(), Absinthe.Resolution.t()) :: {:ok, map()} | {:error, term()}
  def track_profile_view(_root, %{user: %User{} = profile}, info) do
    {viewer, actor_opts} = view_actor(info.context)

    with {:ok, classification} <- Map.fetch(info.context, :request_actor) do
      Accounts.profile_view_tracker_track(
        profile,
        viewer,
        classification,
        Keyword.put(actor_opts, :read_purpose, :public_read)
      )
    end
  end

  defp view_actor(%{delegated_actor: %{user_actor: viewer} = delegation}) do
    {viewer, delegation: delegation}
  end

  defp view_actor(%{service_actor: service}) do
    {nil, service_credential: service}
  end

  defp view_actor(%{service_auth_failure: _code}), do: {nil, []}
  defp view_actor(%{cur_user: viewer}), do: {viewer, []}
  defp view_actor(%{anonymous_session: session}), do: {nil, anonymous_session: session}
  defp view_actor(_context), do: {nil, []}
end
