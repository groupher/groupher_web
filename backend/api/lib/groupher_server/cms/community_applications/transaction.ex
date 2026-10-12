defmodule GroupherServer.CMS.CommunityApplications.Transaction do
  @moduledoc """
  Owns the transaction adapter shared by Community Application commands and
  reviewer/setup operations. It is not a user business action or a workflow.

      Command / reviewer / setup operation
        -> CommunityApplications.Transaction
        -> Persist / Lifecycle
        -> commit or rollback
  """

  alias GroupherServer.Repo

  @doc "Runs an operation in the current transaction or opens one."
  def run(fun) when is_function(fun, 0) do
    if Repo.in_transaction?() do
      {:ok, fun.()}
    else
      Repo.transaction(fun)
    end
  end

  @doc false
  def run(%Ecto.Multi{} = multi), do: Repo.transaction(multi)
end
