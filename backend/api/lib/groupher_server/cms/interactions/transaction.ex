defmodule GroupherServer.CMS.Interactions.Transaction do
  @moduledoc """
  Owns the transaction adapter for interaction mutations that are not already
  inside the shared Command Receipt transaction. It is not a user workflow.

      Interaction command / recovery callback
        -> Interactions.Transaction
        -> Interactions.Persist / Effects
        -> commit or rollback
  """

  alias GroupherServer.Repo

  @doc "Runs an interaction operation in the current transaction or opens one."
  def run(fun) when is_function(fun, 0) do
    if Repo.in_transaction?() do
      {:ok, fun.()}
    else
      Repo.transaction(fun)
    end
  end
end
