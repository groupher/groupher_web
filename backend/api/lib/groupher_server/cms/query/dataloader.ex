defmodule GroupherServer.CMS.Query.Dataloader do
  @moduledoc """
  Builds the CMS Dataloader source and Context-owned association queries.

      caller -> GroupherServer.CMS.Query.Dataloader -> result
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{CMS, Repo}
  alias CMS.Model.Author

  @doc "Returns the CMS Ecto Dataloader source."
  @spec dataloader_source() :: Dataloader.Ecto.t()
  def dataloader_source, do: Dataloader.Ecto.new(Repo, query: &query/2)

  @doc false
  def query(Author, _args) do
    from(a in Author, join: u in assoc(a, :user), select: u)
  end

  def query(queryable, _args), do: queryable
end
