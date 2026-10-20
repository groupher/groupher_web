defmodule GroupherServer.CMS.Communities.Subscribers.Query do
  @moduledoc """
  Read-only queries for Community subscribers.

      Communities facade
        -> Subscribers.Query
        -> QueryBuilder / Repo
        -> paged subscriber users
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.Model.User
  alias CMS.Model.{Community, CommunitySubscriber}
  alias CMS.QueryBuilder
  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @spec page(Community.t(), map()) :: T.domain_res(T.paged_data())
  def page(%Community{id: id}, %{page: page, size: size} = filters) when not is_nil(id) do
    query =
      CommunitySubscriber
      |> where([subscriber], subscriber.community_id == ^id)
      |> QueryBuilder.load_inner_users(Map.delete(filters, :sort))

    with {:ok, result} <- page_users(query, page, size, filters) do
      done(Page.to_legacy(result))
    end
  end

  def page(%Community{slug: slug}, %{page: page, size: size} = filters)
      when not is_nil(slug) do
    query =
      CommunitySubscriber
      |> join(:inner, [subscriber], community in assoc(subscriber, :community))
      |> where([_subscriber, community], community.slug == ^slug)
      |> join(:inner, [subscriber, _community], user in assoc(subscriber, :user))
      |> select([_subscriber, _community, user], user)
      |> QueryBuilder.filter_pack(Map.delete(filters, :sort))

    with {:ok, result} <- page_users(query, page, size, filters) do
      done(Page.to_legacy(result))
    end
  end

  @spec page(Community.t(), map(), User.t()) :: T.domain_res(T.paged_data())
  def page(%Community{} = community, filters, %User{} = user) do
    with {:ok, subscribers} <- page(community, filters) do
      %{entries: entries} = subscribers

      entries =
        Enum.map(entries, fn subscriber ->
          %{subscriber | viewer_has_followed: subscriber.id in user.meta.following_user_ids}
        end)

      %{subscribers | entries: entries} |> done
    end
  end

  defp page_users(query, page, size, filter) do
    ORM.pagi(
      query,
      %Params.Offset{page: page, size: size},
      for: User,
      order: user_order(filter)
    )
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
