defmodule GroupherServer.Jobs.ReviewBotRetention do
  @moduledoc "Daily bounded retention for ReviewBot provider records."

  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:alert_board_report_retention),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:alert_board_report_retention),
    unique: GroupherServer.Jobs.Config.unique(:alert_board_report_retention)

  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    case GroupherServer.ReviewBot.cleanup_expired_records() do
      {:ok, _result} -> {:ok, :pass}
      {:error, reason} -> raise "ReviewBot retention failed: #{inspect(reason)}"
    end
  end
end
