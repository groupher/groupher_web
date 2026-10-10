defmodule GroupherServer.Accounts.CollectFolders.Commands.Update do
  @moduledoc """
  Owns updates to editable collection-folder fields.

      Facade -> Commands.Update -> Persist
  """

  alias GroupherServer.Accounts
  alias Accounts.CollectFolders.Persist

  @doc """
  Updates editable fields on a collection folder.

  ## Examples

      Accounts.CollectFolders.Commands.Update.run(folder_id, %{title: "Read later"})
  """
  @spec run(term(), map()) :: {:ok, struct()} | {:error, term()}
  def run(folder_id, attrs), do: Persist.update(folder_id, attrs)
end
