defmodule GroupherServer.CMS.Communities.Query do
  @moduledoc """
  Collection queries for communities.

  Business position:

      Client / reviewer
        -> CMS.Communities
        -> Query
        -> Repo / Oban
  """

  import Helper.Utils, only: [done: 1]

  alias GroupherServer.{Accounts, CMS, Repo}

  alias CMS.Gate.Context.Scope.Community, as: CommunityContext
  alias CMS.QueryBuilder
  alias Accounts.Model.User
  alias CMS.Model.{Community, Category}
  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @doc """
  Pages categories for the discovery GraphQL read model.
  """
  @spec page_categories(map()) :: T.domain_res(term())
  def page_categories(filter), do: ORM.find_all(Category, filter)

  @doc """
  Returns paged Communities annotated with the viewer's subscription state.

  ## Examples

      CMS.Communities.Query.page(%{page: 1, size: 20}, %User{meta: %{subscribed_communities_ids: [1]}})
      #=> {:ok, %{entries: [%Community{}], page_number: 1}}

  """
  @spec page(map(), User.t()) :: T.domain_res(term())
  def page(filter, %User{meta: meta}) do
    with {:ok, paged_communities} <- page(filter) do
      %{entries: entries} = paged_communities

      entries =
        Enum.map(entries, fn community ->
          viewer_has_subscribed = community.id in meta.subscribed_communities_ids
          %{community | viewer_has_subscribed: viewer_has_subscribed}
        end)

      %{paged_communities | entries: entries} |> done
    end
  end

  @spec page(map()) :: T.domain_res(term())
  def page(filter) do
    filter = filter |> Enum.reject(fn {_k, v} -> is_nil(v) end) |> Enum.into(%{})
    %{page: page, size: size} = filter

    query =
      Community
      |> CMS.Gate.scope(nil, :list, CommunityContext.public())
      |> QueryBuilder.filter_pack(Map.drop(filter, [:sort]))

    with {:ok, result} <-
           ORM.pagi(
             query,
             %Params.Offset{page: page, size: size},
             for: Community,
             order: order_by_views(Map.get(filter, :sort))
           ) do
      done(Page.to_legacy(result))
    end
  end

  defp order_by_views(:most_views) do
    %Order{
      fields: [:views, :inserted_at, :id],
      directions: [:desc_nulls_last, :desc, :desc],
      cursor_fields: [:views, :inserted_at, :id]
    }
  end

  defp order_by_views(:least_views) do
    %Order{
      fields: [:views, :inserted_at, :id],
      directions: [:asc_nulls_first, :desc, :desc],
      cursor_fields: [:views, :inserted_at, :id]
    }
  end

  defp order_by_views(_sort) do
    %Order{
      fields: [:inserted_at, :id],
      directions: [:desc, :desc],
      cursor_fields: [:inserted_at, :id]
    }
  end

  @doc false
  def get(id), do: Repo.get(Community, id)
end
