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

  @doc "Pages followers with an explicit Pagi position and optional viewer."
  defdelegate paged_followers(user, filter, pagi), to: List
  defdelegate paged_followers(user, filter, pagi, viewer), to: List

  @doc "Pages followings with an explicit Pagi position and optional viewer."
  defdelegate paged_followings(user, filter, pagi), to: List
  defdelegate paged_followings(user, filter, pagi, viewer), to: List

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
