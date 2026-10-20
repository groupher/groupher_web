defmodule GroupherServer.CMS.Communities.Moderators.Query do
  @moduledoc """
  Read-only queries for Community moderators.

      Communities facade
        -> Moderators.Query
        -> QueryBuilder / Repo
        -> paged moderator users
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.CMS
  alias CMS.Model.{Community, CommunityModerator}
  alias CMS.QueryBuilder
  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @spec page(Community.t(), map()) :: T.domain_res(T.paged_data())
  def page(%Community{id: id}, %{page: page, size: size} = filters) when not is_nil(id) do
    query =
      CommunityModerator
      |> where([moderator], moderator.community_id == ^id)
      |> QueryBuilder.load_inner_users(Map.delete(filters, :sort))

    with {:ok, result} <- page_users(query, page, size, filters) do
      done(Page.to_legacy(result))
    end
  end

  def page(%Community{slug: slug}, %{page: page, size: size} = filters)
      when not is_nil(slug) do
    query =
      CommunityModerator
      |> join(:inner, [moderator], community in assoc(moderator, :community))
      |> where([_moderator, community], community.slug == ^slug)
      |> join(:inner, [moderator, _community], user in assoc(moderator, :user))
      |> select([_moderator, _community, user], user)
      |> QueryBuilder.filter_pack(Map.delete(filters, :sort))

    with {:ok, result} <- page_users(query, page, size, filters) do
      done(Page.to_legacy(result))
    end
  end

  defp page_users(query, page, size, filter) do
    ORM.pagi(
      query,
      %Params.Offset{page: page, size: size},
      for: GroupherServer.Accounts.Model.User,
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
