defmodule GroupherServerWeb.Resolvers.CMS.Search do
  @moduledoc """
  Adapts CMS search fields to public Community and Artiment search facades.

      GraphQL search field -> this resolver -> CMS search facade
  """

  alias GroupherServer.CMS

  def search_communities(_root, %{title: title, category: category}, %{context: %{cur_user: user}}) do
    CMS.search_community(title, category, user)
  end

  def search_communities(_root, %{title: title, category: category}, _info) do
    CMS.search_community(title, category)
  end

  def search_communities(_root, %{title: title}, %{context: %{cur_user: user}}) do
    CMS.search_community(title, user)
  end

  def search_communities(_root, %{title: title}, _info) do
    CMS.search_community(title)
  end

  def search_artiments(_root, %{query: query}, _info) do
    CMS.search_artiments_search(query)
  end
end
