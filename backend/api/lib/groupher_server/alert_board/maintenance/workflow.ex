defmodule GroupherServer.AlertBoard.Maintenance.Workflow do
  @moduledoc """
  Drains bounded report-detail redaction transactions and reports remaining work.

      daily retention trigger -> bounded transactions -> Persist -> optional snooze
  """

  alias GroupherServer.{AlertBoard, Repo}
  alias AlertBoard.{Config, Maintenance.Persist, Maintenance.Query}

  @doc "Clears details from expired reports and returns whether another worker run is needed."
  @spec redact_expired_report_details() :: {:ok, map()} | {:error, term()}
  def redact_expired_report_details do
    cutoff =
      DateTime.add(DateTime.utc_now(:second), -Config.report_details_retention_days(), :day)

    limit = Config.retention_batch_size()

    drain_batches(
      cutoff,
      limit,
      Config.retention_max_batches(),
      0,
      &Persist.clear_report_details_batch/2,
      &Query.expired_report_details?/1,
      :reports_redacted
    )
  end

  @doc "Clears notes from human decisions older than the configured retention window."
  @spec redact_expired_decision_notes() :: {:ok, map()} | {:error, term()}
  def redact_expired_decision_notes do
    cutoff =
      DateTime.add(DateTime.utc_now(:second), -Config.decision_notes_retention_days(), :day)

    drain_batches(
      cutoff,
      Config.retention_batch_size(),
      Config.retention_max_batches(),
      0,
      &Persist.clear_decision_notes_batch/2,
      &Query.expired_decision_notes?/1,
      :decision_notes_redacted
    )
  end

  defp drain_batches(_cutoff, _limit, max_batches, processed, _clear_batch, _more?, result_key)
       when max_batches <= 0 do
    {:ok, %{result_key => processed, more?: false}}
  end

  defp drain_batches(cutoff, limit, max_batches, processed, clear_batch, more?, result_key) do
    Enum.reduce_while(1..max_batches, {:ok, processed}, fn _batch, {:ok, count} ->
      case Repo.transaction(fn -> clear_batch.(cutoff, limit) end) do
        {:ok, cleared} when cleared < limit -> {:halt, {:ok, count + cleared}}
        {:ok, cleared} -> {:cont, {:ok, count + cleared}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
    |> case do
      {:error, _reason} = error ->
        error

      {:ok, count} ->
        {:ok,
         %{
           result_key => count,
           more?: more?.(cutoff)
         }}
    end
  end
end
