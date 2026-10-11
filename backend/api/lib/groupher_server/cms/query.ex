defmodule GroupherServer.CMS.Query do
  @moduledoc """
  Owns CMS persistence-backed reads shared by public adapters.

      CMS facade
        -> CMS.Query
        -> CMS.Query.Dataloader
        -> Repo
  """

  alias __MODULE__.Dataloader, as: DataloaderQuery

  @doc "Returns the CMS Dataloader source used by the GraphQL adapter."
  @spec dataloader_source() :: Dataloader.Ecto.t()
  defdelegate dataloader_source(), to: DataloaderQuery
end
