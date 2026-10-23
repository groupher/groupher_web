defmodule GroupherServer.Jobs.AlertBoardReportRetention do
  @moduledoc """
  Daily bounded cleanup for expired AlertBoard report details.

      Oban cron -> AlertBoardReportRetention -> AlertBoard.Maintenance
  """

  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:alert_board_report_retention),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:alert_board_report_retention),
    unique: GroupherServer.Jobs.Config.unique(:alert_board_report_retention)

  @doc """
  Clears expired report details and snoozes if bounded batches leave work.

  ## Examples

      perform(%Oban.Job{})
  """
  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    case GroupherServer.AlertBoard.redact_expired_report_details() do
      {:ok, %{more?: true}} ->
        {:snooze, GroupherServer.AlertBoard.report_retention_snooze_seconds()}

      {:ok, %{more?: false}} ->
        {:ok, :pass}

      {:error, reason} ->
        raise "AlertBoard report retention failed: #{inspect(reason)}"
    end
  end
end
