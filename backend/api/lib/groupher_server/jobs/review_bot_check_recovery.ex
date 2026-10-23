defmodule GroupherServer.Jobs.ReviewBotCheckRecovery do
  @moduledoc """
  Reconciles provider Checks left running after worker termination.

      Oban Cron
        -> ReviewBot.recover_stale_checks/0
        -> terminal Check + human-review Case
  """

  use Oban.Worker,
    queue: :default,
    max_attempts: 3,
    unique: [period: 60, keys: [], states: :incomplete]

  alias GroupherServer.ReviewBot

  @doc """
  Runs one bounded recovery pass over orphaned provider Attempts.

  ## Examples

      perform(%Oban.Job{})
      #=> {:ok, %{recovered: count}} | {:error, reason}
  """
  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    case ReviewBot.recover_stale_checks() do
      {:ok, recovered} -> {:ok, %{recovered: recovered}}
      {:error, reason} -> {:error, reason}
    end
  end
end
