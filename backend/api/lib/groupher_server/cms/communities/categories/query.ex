defmodule GroupherServer.CMS.Communities.Categories.Query do
  @moduledoc """
  Read-only Category queries for Community scopes.

      Query resolver -> Communities.Categories.Query -> Gate-scoped read facts
  """

  alias GroupherServer.{CMS, Repo}

  alias CMS.Communities.Query, as: CommunitiesQuery
  alias CMS.Model.Category

  @doc "Returns the paged Category projection used by the existing Community query."
  defdelegate page(filter), to: CommunitiesQuery, as: :page_categories

  @doc false
  def get(id), do: Repo.get(Category, id)
end
