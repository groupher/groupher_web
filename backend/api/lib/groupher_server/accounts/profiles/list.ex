defmodule GroupherServer.Accounts.Profiles.List do
  @moduledoc """
  Profile list queries for users and subscribed communities.

  The module keeps profile-page pagination, default community suggestions, and
  subscribed-community reads under the account namespace.

  Business position:

      Accounts.Profiles.Query -> Profiles.List -> User / community read models
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.Fans
  alias Accounts.Model.User

  alias CMS.Model.{Community, CommunitySubscriber}
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @default_subscribed_communities GroupherServer.Accounts.Config.default_subscribed_communities()

  @doc """
  Returns a viewer-aware page of users.

  ## Examples

      Accounts.Profiles.List.paged_users(%{page: 1, size: 20}, viewer)
  """
  def paged_users(filter, %User{} = user) do
    ORM.find_all(User, filter) |> Fans.mark_viewer_follow_status(user) |> done
  end

  @doc """
  Returns a page of users matching the filter.

  ## Examples

      Accounts.Profiles.List.paged_users(%{page: 1, size: 20})
  """
  def paged_users(filter) do
    ORM.find_all(User, filter)
  end

  @doc """
  Returns the default community suggestions for a profile landing page.

  ## Examples

      Accounts.Profiles.List.default_subscribed_communities(%{page: 1, size: 20})
  """
  def default_subscribed_communities(%{page: _, size: _} = filter) do
    filter = Map.merge(filter, %{size: @default_subscribed_communities, category: "pl"})
    query_filter = Map.delete(filter, :sort)

    with {:ok, home_community} <- ORM.find_by(Community, slug: "home"),
         {:ok, page} <-
           Community
           |> GroupherServer.CMS.query_builder_filter_pack(query_filter)
           |> page_communities(filter.page, filter.size, filter) do
      paged_communities = Page.to_legacy(page)

      %{
        entries: paged_communities.entries ++ [home_community],
        page_number: paged_communities.page_number,
        page_size: paged_communities.page_size,
        total_count: paged_communities.total_count + 1,
        total_pages: paged_communities.total_pages
      }
      |> done()
    else
      _error ->
        %{
          entries: [],
          page_number: 1,
          page_size: @default_subscribed_communities,
          total_count: 0,
          total_pages: 1
        }
        |> done()
    end
  end

  @doc """
  Returns communities subscribed to by one user.

  ## Examples

      Accounts.Profiles.List.subscribed_communities(user, %{page: 1, size: 20})
  """
  def subscribed_communities(%User{id: id} = user, %{page: page, size: size} = filter) do
    filter = filter |> Map.delete(:first)
    query_filter = Map.delete(filter, :sort)

    query =
      CommunitySubscriber
      |> where([c], c.user_id == ^id)
      |> join(:inner, [c, cc], cc in assoc(c, :community))
      |> select([c, cc], cc)
      |> GroupherServer.CMS.query_builder_filter_pack(query_filter)

    with {:ok, result} <- page_communities(query, page, size, filter) do
      result
      |> Page.to_legacy()
      |> sort_communities(user)
      |> done()
    end
  end

  defp page_communities(query, page, size, filter) do
    ORM.pagi(
      query,
      %Params.Offset{page: page, size: size},
      for: Community,
      order: community_order(filter)
    )
  end

  defp community_order(%{sort: :asc_inserted}) do
    %Order{
      fields: [:inserted_at, :id],
      directions: [:asc, :asc],
      cursor_fields: [:inserted_at, :id]
    }
  end

  defp community_order(_filter) do
    %Order{
      fields: [:inserted_at, :id],
      directions: [:desc, :desc],
      cursor_fields: [:inserted_at, :id]
    }
  end

  defp sort_communities(paged_communities, _user), do: paged_communities
end
