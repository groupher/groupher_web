defmodule GroupherServer.AlertBoard.Config do
  @moduledoc """
  Runtime limits for AlertBoard report and decision retention.

      Oban worker -> AlertBoard.Config -> Maintenance.Workflow
  """

  @defaults [
    report_details_retention_days: 90,
    decision_notes_retention_days: 365,
    retention_batch_size: 500,
    retention_max_batches: 100,
    retention_snooze_seconds: 5
  ]

  @doc "Returns the number of days report details are retained."
  def report_details_retention_days, do: positive!(:report_details_retention_days)

  @doc "Returns the number of days human decision notes are retained."
  def decision_notes_retention_days, do: positive!(:decision_notes_retention_days)

  @doc "Returns the number of reports cleared in one retention batch."
  def retention_batch_size, do: positive!(:retention_batch_size)

  @doc "Returns the maximum number of retention batches drained per worker run."
  def retention_max_batches, do: positive!(:retention_max_batches)

  @doc "Returns the delay before a saturated retention worker continues."
  def retention_snooze_seconds, do: positive!(:retention_snooze_seconds)

  defp positive!(key) do
    value = Application.get_env(:groupher_server, __MODULE__, @defaults) |> Keyword.get(key)

    if is_integer(value) and value > 0 do
      value
    else
      raise ArgumentError, "AlertBoard.Config #{key} must be a positive integer"
    end
  end
end
