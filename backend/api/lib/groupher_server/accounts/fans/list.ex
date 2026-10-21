defmodule GroupherServer.Accounts.Fans.List do
  @moduledoc """
  Pages User identities in a follower/following scope with the shared Pagi contract.
  Relationship rows scope membership; User owns ordering and cursor values.

      Accounts.Fans -> scoped Users -> ORM.Pagi -> optional viewer enrichment
  """

  import Ecto.Query

  alias GroupherServer.Accounts.Fans.ViewerState
  alias GroupherServer.Accounts.Model.{User, UserFollower, UserFollowing}
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Params}

  @spec paged_followers(User.t(), map(), Params.t() | nil, User.t() | nil) :: tuple()
  def paged_followers(%User{id: id}, filter, pagi, viewer \\ nil) do
    ids =
      from(relation in UserFollower, where: relation.user_id == ^id, select: relation.follower_id)

    page(ids, id, :followers, filter, pagi, viewer)
  end

  @spec paged_followings(User.t(), map(), Params.t() | nil, User.t() | nil) :: tuple()
  def paged_followings(%User{id: id}, filter, pagi, viewer \\ nil) do
    ids =
      from(relation in UserFollowing,
        where: relation.user_id == ^id,
        select: relation.following_id
      )

    page(ids, id, :followings, filter, pagi, viewer)
  end

  defp page(ids, owner_id, direction, filter, pagi, viewer) do
    query = from(user in User, where: user.id in subquery(ids))
    sort = Map.get(filter, :sort, :desc_inserted)

    with {:ok, order} <- user_order(sort),
         {:ok, result} <-
           ORM.pagi(query, pagi,
             for: User,
             order: order,
             surface: "accounts.#{direction}",
             query_fingerprint: :erlang.term_to_binary({owner_id, sort}) |> Base.encode64()
           ) do
      case viewer do
        %User{} -> {:ok, ViewerState.mark_viewer_follow_status({:ok, result}, viewer)}
        nil -> {:ok, result}
      end
    end
  end

  defp user_order(sort) when sort in [:asc_inserted, :desc_inserted] do
    direction = if sort == :asc_inserted, do: :asc, else: :desc

    {:ok,
     %Order{
       fields: [:inserted_at, :id],
       directions: [direction, direction],
       cursor_fields: [:inserted_at, :id]
     }}
  end

  defp user_order(_sort), do: {:error, GroupherServer.Pagi.unsupported_sort()}
end
