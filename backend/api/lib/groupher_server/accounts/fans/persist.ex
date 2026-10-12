defmodule GroupherServer.Accounts.Fans.Persist do
  @moduledoc """
  Owns follower relationship rows and denormalized user counters.

  This module exposes database primitives only. It never opens a transaction,
  performs admission, emits events, or revalidates caches; Follow/Unfollow
  Commands own those boundaries.

      canonical users
          -> relationship rows
          -> user follower/following metadata
  """

  alias GroupherServer.Accounts

  alias Accounts.{FrontDesk, Model}
  alias Model.{User, UserFollower, UserFollowing}
  alias Accounts.Fans.ErrorCat
  alias Helper.{ORM, T}

  @doc """
  Resolves the canonical follower and target users for a follow action.

  ## Examples

      Accounts.Fans.Persist.prepare_pair(follower, target)
  """
  @spec prepare_pair(User.t(), User.t()) :: {:ok, map()} | {:error, term()}
  def prepare_pair(%User{} = user, %User{} = follower) do
    with true <- to_string(user.id) !== to_string(follower.id),
         {:ok, user} <- FrontDesk.fresh_user(user.login),
         {:ok, target_user} <- FrontDesk.fresh_user(follower.login) do
      {:ok, %{user: user, target_user: target_user}}
    else
      false -> {:error, ErrorCat.self_conflict("can't follow yourself")}
      {:error, reason} -> {:error, ErrorCat.not_exist(reason)}
    end
  end

  @doc """
  Inserts both directions of a follower relationship.

  ## Examples

      Accounts.Fans.Persist.insert_relationships(target_user, follower)
  """
  @spec insert_relationships(User.t(), User.t()) ::
          T.domain_res(%{follower: UserFollower.t(), following: UserFollowing.t()})
  def insert_relationships(%User{} = target_user, %User{} = user) do
    case %UserFollower{}
         |> UserFollower.changeset(%{user_id: target_user.id, follower_id: user.id})
         |> GroupherServer.Repo.insert() do
      {:ok, follower} ->
        case %UserFollowing{}
             |> UserFollowing.changeset(%{user_id: user.id, following_id: target_user.id})
             |> GroupherServer.Repo.insert() do
          {:ok, following} -> {:ok, %{follower: follower, following: following}}
          {:error, reason} -> {:error, {:insert_following_failed, reason}}
        end

      {:error, reason} ->
        {:error, {:insert_follower_failed, reason}}
    end
  end

  @doc """
  Deletes both directions of a follower relationship.

  ## Examples

      Accounts.Fans.Persist.delete_relationships(target_user, follower)
  """
  @spec delete_relationships(User.t(), User.t()) :: {:ok, UserFollower.t()} | {:error, term()}
  def delete_relationships(%User{} = target_user, %User{} = user) do
    case ORM.findby_delete!(UserFollower, %{user_id: target_user.id, follower_id: user.id}) do
      {:ok, follower} ->
        case ORM.findby_delete!(UserFollowing, %{
               user_id: user.id,
               following_id: target_user.id
             }) do
          {:ok, _following} -> {:ok, follower}
          {:error, reason} -> {:error, {:delete_following_failed, reason}}
        end

      {:error, reason} ->
        {:error, {:delete_follower_failed, reason}}
    end
  end

  @doc """
  Updates follower/following counters and embedded relationship IDs.

  ## Examples

      Accounts.Fans.Persist.update_follow_info(target_user, follower, :add)
  """
  @spec update_follow_info(User.t(), User.t(), :add | :remove) ::
          {:ok, User.t()} | {:error, term()}
  def update_follow_info(%User{} = target_user, %User{} = user, operation) do
    with {:ok, user} <- ORM.fill_meta(user),
         {:ok, follower_user_ids, following_user_ids} <-
           relationship_ids(target_user, user, operation),
         {:ok, target_user} <-
           ORM.update(target_user, %{followers_count: length(follower_user_ids)}),
         {:ok, target_user} <-
           ORM.update_meta(target_user, %{follower_user_ids: follower_user_ids}),
         {:ok, _user} <- ORM.update(user, %{followings_count: length(following_user_ids)}),
         {:ok, _user} <- ORM.update_meta(user, %{following_user_ids: following_user_ids}) do
      {:ok, target_user}
    end
  end

  defp relationship_ids(target_user, user, :add) do
    {:ok, Enum.uniq(target_user.meta.follower_user_ids ++ [user.id]),
     Enum.uniq(user.meta.following_user_ids ++ [target_user.id])}
  end

  defp relationship_ids(target_user, user, :remove) do
    {:ok, Enum.uniq(target_user.meta.follower_user_ids -- [user.id]),
     Enum.uniq(user.meta.following_user_ids -- [target_user.id])}
  end
end
