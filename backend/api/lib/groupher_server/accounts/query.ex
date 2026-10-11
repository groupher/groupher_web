defmodule GroupherServer.Accounts.Query do
  @moduledoc """
  Owns Accounts persistence-backed reads shared by public adapters.

      Accounts facade
        -> Accounts.Query
        -> Accounts.Query.Dataloader
        -> Repo
  """

  alias __MODULE__.Dataloader, as: DataloaderQuery

  @doc "Returns the Accounts Dataloader source used by the GraphQL adapter."
  @spec dataloader_source() :: Dataloader.Ecto.t()
  defdelegate dataloader_source(), to: DataloaderQuery
end
