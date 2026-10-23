defmodule GroupherServer.AlertBoard.Maintenance.Workflow do
  @moduledoc """
  Drains bounded report-detail redaction transactions and reports remaining work.

      daily retention trigger -> bounded transactions -> Persist -> optional snooze
  """

  alias GroupherServer.Repo
  alias GroupherServer.AlertBoard.{Config, Maintenance.Persist, Maintenance.Query}

  @doc "Clears details from expired reports and returns whether another worker run is needed."
  @spec redact_expired_report_details() :: {:ok, map()} | {:error, term()}
  def redact_expired_report_details do
    cutoff =
      DateTime.add(DateTime.utc_now(:second), -Config.report_details_retention_days(), :day)

    limit = Config.retention_batch_size()

    drain_batches(cutoff, limit, Config.retention_max_batches(), 0)
  end

  defp drain_batches(_cutoff, _limit, max_batches, processed) when max_batches <= 0 do
    {:ok, %{reports_redacted: processed, more?: false}}
  end

  defp drain_batches(cutoff, limit, max_batches, processed) do
    Enum.reduce_while(1..max_batches, {:ok, processed}, fn _batch, {:ok, count} ->
      case Repo.transaction(fn -> Persist.clear_report_details_batch(cutoff, limit) end) do
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
           reports_redacted: count,
           more?: Query.expired_report_details?(cutoff)
         }}
    end
  end
end
