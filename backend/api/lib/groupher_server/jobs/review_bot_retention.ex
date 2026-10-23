defmodule GroupherServer.Jobs.ReviewBotRetention do
  @moduledoc """
  Daily bounded retention for ReviewBot provider records.

      Oban cron -> ReviewBotRetention -> ReviewBot facade -> bounded database batches
  """

  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:alert_board_report_retention),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:alert_board_report_retention),
    unique: GroupherServer.Jobs.Config.unique(:alert_board_report_retention)

  @impl Oban.Worker
  @doc """
  Runs bounded cleanup of expired provider Attempts and old Check metadata.

  ## Examples

      perform(%Oban.Job{})
      #=> {:ok, :pass} | {:error, reason}
  """
  def perform(%Oban.Job{}) do
    case GroupherServer.ReviewBot.cleanup_expired_records() do
      {:ok, _result} -> {:ok, :pass}
      {:error, reason} -> raise "ReviewBot retention failed: #{inspect(reason)}"
    end
  end
end
