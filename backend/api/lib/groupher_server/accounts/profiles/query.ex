defmodule GroupherServer.Accounts.Profiles.Query do
  @moduledoc """
  Reads and shapes public profile projections and profile lists.

      User row / contribution facts
          -> Profiles.Query
          -> public profile projection
  """

  alias GroupherServer.{Accounts, Analysis}
  alias Accounts.Model.{Embeds, OauthProvider, User}
  alias Accounts.Profiles.List
  alias Helper.ORM

  import Ecto.Query, warn: false
  alias GroupherServer.Repo

  @default_user_meta Embeds.UserMeta.default_meta()

  @doc """
  Shapes a user into the public profile projection without changing the source row.

  ## Examples

      Accounts.Profiles.Query.project_user(user)
  """
  @spec project_user(User.t()) :: {:ok, User.t()} | {:error, term()}
  def project_user(%User{} = user) do
    with {:ok, user} <- assign_meta(user),
         {:ok, user} <- assign_contributes(user) do
      {:ok, user}
    end
  end

  @doc """
  Adds viewer-aware follow state to a public profile projection.

  ## Examples

      Accounts.Profiles.Query.project_user(user, viewer)
  """
  @spec project_user(User.t(), User.t()) :: {:ok, User.t()} | {:error, term()}
  def project_user(%User{} = user, %User{meta: nil}), do: project_user(user)

  def project_user(%User{} = user, %User{} = viewer) do
    with {:ok, user} <- project_user(user) do
      {:ok,
       Map.merge(user, %{
         viewer_been_followed: user.id in viewer.meta.follower_user_ids,
         viewer_has_followed: user.id in viewer.meta.following_user_ids
       })}
    end
  end

  @doc """
  Returns a paged user profile list.

  ## Examples

      Accounts.Profiles.Query.paged_users(%{page: 1, size: 20})
  """
  @spec paged_users(map()) :: term()
  def paged_users(filter), do: List.paged_users(filter)

  @doc """
  Returns a viewer-aware paged user profile list.

  ## Examples

      Accounts.Profiles.Query.paged_users(%{page: 1, size: 20}, viewer)
  """
  @spec paged_users(map(), User.t()) :: term()
  def paged_users(filter, %User{} = viewer), do: List.paged_users(filter, viewer)

  @doc """
  Returns default subscribed communities for the profile landing page.

  ## Examples

      Accounts.Profiles.Query.default_subscribed_communities(%{page: 1, size: 20})
  """
  @spec default_subscribed_communities(map()) :: term()
  def default_subscribed_communities(filter), do: List.default_subscribed_communities(filter)

  @doc """
  Returns communities subscribed to by a user.

  ## Examples

      Accounts.Profiles.Query.subscribed_communities(user, %{page: 1, size: 20})
  """
  @spec subscribed_communities(User.t(), map()) :: term()
  def subscribed_communities(%User{} = user, filter),
    do: List.subscribed_communities(user, filter)

  @doc """
  Returns the canonical linked OAuth-account projection for an active user.

  ## Examples

      Accounts.Profiles.Query.linked_oauth_accounts("alice")
  """
  @spec linked_oauth_accounts(String.t()) :: {:ok, map()} | {:error, term()}
  def linked_oauth_accounts(login) do
    with {:ok, user} <- ORM.find_by(User, login: login) do
      bindings =
        OauthProvider
        |> where([binding], binding.user_id == ^user.id)
        |> order_by([binding], asc: binding.inserted_at, asc: binding.id)
        |> Repo.all()

      can_unlink = length(bindings) > 1

      {:ok,
       %{
         entries:
           Enum.map(bindings, fn binding ->
             %{
               public_ref: binding.public_ref,
               provider: binding.provider,
               login: binding.login,
               nickname: binding.nickname,
               avatar: binding.avatar,
               can_unlink: can_unlink,
               linked_at: binding.inserted_at
             }
           end)
       }}
    end
  end

  defp assign_meta(%User{meta: nil} = user), do: {:ok, Map.put(user, :meta, @default_user_meta)}
  defp assign_meta(%User{} = user), do: {:ok, user}

  defp assign_contributes(%User{contributes: nil} = user) do
    with {:ok, contributes} <- Analysis.list_contributions_digest(%User{id: user.id}) do
      {:ok, Map.put(user, :contributes, contributes)}
    end
  end

  defp assign_contributes(%User{} = user), do: {:ok, user}
end
