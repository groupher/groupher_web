defmodule GroupherServer.Repo do
  @moduledoc """
  Ecto repository for Groupher's backend data layer.

  This module is the boundary between business domains and PostgreSQL. It powers
  query execution for contexts such as accounts, CMS content, and statistics, and
  exposes the repository used by the shared `Helper.ORM.Pagi` execution boundary.

  Business position:

      Application caller
        -> Repo
        -> domain / infrastructure boundary
  """

  use Ecto.Repo, otp_app: :groupher_server, adapter: Ecto.Adapters.Postgres

  @dialyzer {:nowarn_function, rollback: 1}

  @doc """
  Runs a business transaction whose callback returns a tagged result.

  `{:error, reason}` is converted to `rollback(reason)` so callers cannot
  accidentally commit a failed business result. Any other shape is rejected.
  """
  @spec transact_result((-> {:ok, value} | {:error, reason})) ::
          {:ok, value} | {:error, reason}
        when value: term(), reason: term()
  def transact_result(callback) when is_function(callback, 0) do
    transaction(fn ->
      case callback.() do
        {:ok, value} -> value
        {:error, reason} -> rollback(reason)
        other -> rollback({:invalid_transaction_result, other})
      end
    end)
  end

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable.
  """
  # def init(_, opts) do
  #   {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  # end
end
