defmodule GroupherServer.Analysis.Maintenance.Workflow do
  @moduledoc """
  Owns bounded retention transactions and continuation decisions.

      retention trigger -> bounded transaction -> Persist delete -> snooze
  """

  alias GroupherServer.{Analysis, Repo}
  alias Analysis.Config
  alias Analysis.Maintenance.{Persist, Query}
  alias Helper.Datetime

  @doc """
  Deletes bounded raw-event and hourly-projection batches.

  ## Examples

      Analysis.Maintenance.Workflow.delete_expired()
  """
  @spec delete_expired() :: %{
          metric_events: non_neg_integer(),
          hourly_metrics: non_neg_integer(),
          more?: boolean()
        }
  def delete_expired do
    now = DateTime.utc_now(:second)
    raw_cutoff = DateTime.add(now, -Config.metric_event_retention_days(), :day)
    hourly_cutoff = Datetime.shift(now, months: -Config.hourly_metric_retention_months())
    limit = Config.retention_batch_size()
    max_batches = Config.retention_max_batches()

    {metric_events, raw_more?} =
      drain_batches(
        fn -> transaction(fn -> Persist.delete_metric_event_batch(raw_cutoff, limit) end) end,
        fn -> Query.expired_metric_events?(raw_cutoff) end,
        limit,
        max_batches
      )

    {hourly_metrics, hourly_more?} =
      drain_batches(
        fn -> transaction(fn -> Persist.delete_hourly_metric_batch(hourly_cutoff, limit) end) end,
        fn -> Query.expired_hourly_metrics?(hourly_cutoff) end,
        limit,
        max_batches
      )

    %{
      metric_events: metric_events,
      hourly_metrics: hourly_metrics,
      more?: raw_more? or hourly_more?
    }
  end

  defp transaction(fun) do
    case Repo.transaction(fun) do
      {:ok, result} -> result
      {:error, reason} -> raise "analysis retention transaction failed: #{inspect(reason)}"
    end
  end

  defp drain_batches(delete_batch, more?, limit, max_batches) do
    Enum.reduce_while(1..max_batches, 0, fn _batch, total ->
      deleted = delete_batch.()
      total = total + deleted

      if deleted < limit do
        {:halt, {total, more?.()}}
      else
        {:cont, total}
      end
    end)
    |> case do
      {total, false} -> {total, false}
      total -> {total, more?.()}
    end
  end
end
