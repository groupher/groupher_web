defmodule GroupherServer.Accounts.Fans do
  @moduledoc """
  Public account boundary for follow relationships and viewer-aware follower lists.

  Business position:

      Client / Auth
        -> GraphQL or internal API
        -> Accounts facade
        -> Query / Commands
           -> Persist / Effects
  """

  alias __MODULE__.{Commands, List, ViewerState}
  alias GroupherServer.Accounts

  alias Accounts.Model.User
  alias Helper.T

  @doc """
  Creates a follow relationship and its denormalized account effects.

  ## Examples

      Accounts.Fans.follow(follower, target_user)
  """
  @spec follow(User.t(), User.t()) :: T.gq_result(User.t())
  def follow(%User{} = user, %User{} = follower), do: Commands.Follow.run(user, follower)

  @doc """
  Removes a follow relationship and its denormalized account effects.

  ## Examples

      Accounts.Fans.undo_follow(follower, target_user)
  """
  @spec undo_follow(User.t(), User.t()) :: T.gq_result(User.t())
  def undo_follow(%User{} = user, %User{} = follower), do: Commands.Unfollow.run(user, follower)

  @doc """
  Returns a page of followers, optionally with viewer state.

  ## Examples

      Accounts.Fans.paged_followers(user, %{page: 1, size: 20})
  """
  @spec paged_followers(User.t(), map()) :: T.domain_res(T.paged_users())
  def paged_followers(%User{} = user, filter), do: List.paged_followers(user, filter)

  @doc """
  Returns followers with viewer-aware relationship fields.

  ## Examples

      Accounts.Fans.paged_followers(user, %{page: 1, size: 20}, viewer)
  """
  @spec paged_followers(User.t(), map(), User.t()) :: T.domain_res(T.paged_users())
  def paged_followers(%User{} = user, filter, %User{} = cur_user) do
    List.paged_followers(user, filter, cur_user)
  end

  @doc """
  Returns a page of accounts followed by the user.

  ## Examples

      Accounts.Fans.paged_followings(user, %{page: 1, size: 20})
  """
  @spec paged_followings(User.t(), map()) :: T.domain_res(T.paged_users())
  def paged_followings(%User{} = user, filter), do: List.paged_followings(user, filter)

  @doc """
  Returns followings with viewer-aware relationship fields.

  ## Examples

      Accounts.Fans.paged_followings(user, %{page: 1, size: 20}, viewer)
  """
  @spec paged_followings(User.t(), map(), User.t()) :: T.domain_res(T.paged_users())
  def paged_followings(%User{} = user, filter, %User{} = cur_user) do
    List.paged_followings(user, filter, cur_user)
  end

  @doc """
  Adds the current viewer's follow status to a paged user result.

  ## Examples

      Accounts.Fans.mark_viewer_follow_status(paged_users, viewer)
  """
  @spec mark_viewer_follow_status(T.domain_res(T.paged_users()), User.t()) ::
          T.domain_res(T.paged_users())
  def mark_viewer_follow_status(result, %User{} = cur_user) do
    ViewerState.mark_viewer_follow_status(result, cur_user)
  end
end
