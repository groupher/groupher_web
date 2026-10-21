defmodule GroupherServer.Accounts.Profiles.Query do
  @moduledoc """
  Reads and shapes public profile projections and profile lists.

      User row / persisted contribution projection
          -> Profiles.Query
          -> public profile projection
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Model.{Embeds, OauthProvider, User}
  alias Accounts.Profiles.List
  alias Helper.{Datetime, ORM}

  @default_user_meta Embeds.UserMeta.default_meta()

  @doc """
  Shapes a user into the public profile projection without changing the source row.

  ## Examples

      Accounts.Profiles.Query.profile(user)
  """
  @spec profile(User.t()) :: {:ok, User.t()} | {:error, term()}
  def profile(%User{} = user) do
    with {:ok, user} <- assign_meta(user) do
      assign_contributes(user)
    end
  end

  @doc """
  Adds viewer-aware follow state to a public profile projection.

  ## Examples

      Accounts.Profiles.Query.profile(user, viewer)
  """
  @spec profile(User.t(), User.t()) :: {:ok, User.t()} | {:error, term()}
  def profile(%User{} = user, %User{meta: nil}), do: profile(user)

  def profile(%User{} = user, %User{} = viewer) do
    with {:ok, user} <- profile(user) do
      {:ok,
       Map.merge(user, %{
         viewer_been_followed: user.id in viewer.meta.follower_user_ids,
         viewer_has_followed: user.id in viewer.meta.following_user_ids
       })}
    end
  end

  @doc "Pages users with a required Pagi position and optional viewer."
  defdelegate paged_users(filter, pagi), to: List
  defdelegate paged_users(filter, pagi, viewer), to: List

  @doc "Returns bounded default Community suggestions."
  defdelegate default_community_suggestions(), to: List

  @doc "Pages actual Community subscriptions using an explicit Pagi position."
  defdelegate subscribed_communities(user, filter, pagi), to: List

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
    end_date = Datetime.today()

    projection = %Embeds.UserContribute{
      start_date: Datetime.shift(end_date, months: -6),
      end_date: end_date,
      total_count: 0,
      records: []
    }

    {:ok, Map.put(user, :contributes, projection)}
  end

  defp assign_contributes(%User{} = user), do: {:ok, user}
end
