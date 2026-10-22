defmodule GroupherServer.Jobs.ReviewBotCheck do
  @moduledoc """
  Oban entrypoint for one version-pinned ReviewBot Check.

      Oban job(check_id)
        -> ReviewBot.execute_check/3
        -> provider Attempt and bounded retry
  """

  use Oban.Worker,
    queue: :review_bot,
    max_attempts: 3,
    unique: [period: 86_400, keys: [:check_id], states: :incomplete]

  alias GroupherServer.ReviewBot

  @doc """
  Sets the bounded total Oban execution budget.

  ## Examples

      timeout(%Oban.Job{})
      #=> 45_000
  """
  @impl Oban.Worker
  def timeout(_job), do: 45_000

  @impl Oban.Worker
  @doc """
  Executes one persisted Check through the ReviewBot facade.

  ## Examples

      perform(%Oban.Job{args: %{"check_id" => check_id}})
      #=> :ok | {:error, reason}
  """
  def perform(%Oban.Job{args: %{"check_id" => check_id}} = job) do
    case ReviewBot.execute_check(check_id, job.attempt, job.max_attempts) do
      {:ok, result} -> {:ok, %{result: result}}
      {:error, reason} -> {:error, reason}
    end
  end
end
