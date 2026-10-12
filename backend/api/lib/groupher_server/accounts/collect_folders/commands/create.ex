defmodule GroupherServer.Accounts.CollectFolders.Commands.Create do
  @moduledoc """
  Owns creation of one collection folder.

      Facade -> Commands.Create -> Persist
  """

  alias GroupherServer.Accounts
  alias Accounts.CollectFolders.Persist
  alias Accounts.Model.User

  @doc """
  Creates a user-owned collection folder.

  ## Examples

      Accounts.CollectFolders.Commands.Create.run(%{title: "Reading list"}, user)
  """
  @spec run(map(), User.t()) :: {:ok, struct()} | {:error, term()}
  def run(attrs, %User{} = user), do: Persist.create(attrs, user)
end
