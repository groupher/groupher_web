defmodule GroupherServer.Accounts.CollectFolders.Commands.Delete do
  @moduledoc """
  Owns deletion of empty collection folders.

      Facade -> Commands.Delete -> Persist
  """

  alias GroupherServer.Accounts
  alias Accounts.CollectFolders.Persist

  @doc """
  Deletes an empty collection folder.

  ## Examples

      Accounts.CollectFolders.Commands.Delete.run(folder_id)
  """
  @spec run(term()) :: {:ok, struct()} | {:error, term()}
  def run(folder_id), do: Persist.delete(folder_id)
end
