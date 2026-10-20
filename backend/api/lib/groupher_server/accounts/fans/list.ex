defmodule GroupherServer.Accounts.Fans.List do
  @moduledoc """
  Paginates follower and following lists for profile pages.

  Viewer-aware variants enrich each user row with follow-state booleans so the
  frontend can render follow buttons without extra round trips.

  Business position:

      Accounts.Fans.Query -> Fans.List -> follower/following read models
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]
  import ShortMaps

  alias GroupherServer.Accounts

  alias Accounts.Fans.ViewerState
  alias Accounts.Model.{User, UserFollower, UserFollowing}
  alias Helper.{ORM, QueryBuilder}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @doc """
  Returns followers with viewer-aware relationship state.

  ## Examples

      Accounts.Fans.List.paged_followers(user, %{page: 1, size: 20}, viewer)
  """
  def paged_followers(%User{id: user_id}, filter, %User{} = cur_user) do
    paged_followers(%User{id: user_id}, filter)
    |> ViewerState.mark_viewer_follow_status(cur_user)
    |> done()
  end

  @doc """
  Returns a user's followers.

  ## Examples

      Accounts.Fans.List.paged_followers(user, %{page: 1, size: 20})
  """
  def paged_followers(%User{id: user_id}, filter) do
    UserFollower
    |> where([uf], uf.user_id == ^user_id)
    |> join(:inner, [uf], u in assoc(uf, :follower))
    |> load_fans(filter)
  end

  @doc """
  Returns following users with viewer-aware relationship state.

  ## Examples

      Accounts.Fans.List.paged_followings(user, %{page: 1, size: 20}, viewer)
  """
  def paged_followings(%User{id: user_id}, filter, %User{} = cur_user) do
    paged_followings(%User{id: user_id}, filter)
    |> ViewerState.mark_viewer_follow_status(cur_user)
    |> done()
  end

  @doc """
  Returns the users followed by one account.

  ## Examples

      Accounts.Fans.List.paged_followings(user, %{page: 1, size: 20})
  """
  def paged_followings(%User{id: user_id}, filter) do
    UserFollowing
    |> where([uf], uf.user_id == ^user_id)
    |> join(:inner, [uf], u in assoc(uf, :following))
    |> load_fans(filter)
  end

  defp load_fans(queryable, ~m(page size)a = filter) do
    query =
      queryable
      |> select([uf, u], u)
      |> QueryBuilder.filter_pack(Map.delete(filter, :sort))

    with {:ok, result} <-
           ORM.pagi(
             query,
             %Params.Offset{page: page, size: size},
             for: User,
             order: user_order(filter)
           ) do
      done(Page.to_legacy(result))
    end
  end

  defp user_order(%{sort: :asc_inserted}) do
    %Order{
      fields: [:inserted_at, :id],
      directions: [:asc, :asc],
      cursor_fields: [:inserted_at, :id]
    }
  end

  defp user_order(_filter) do
    %Order{
      fields: [:inserted_at, :id],
      directions: [:desc, :desc],
      cursor_fields: [:inserted_at, :id]
    }
  end
end
