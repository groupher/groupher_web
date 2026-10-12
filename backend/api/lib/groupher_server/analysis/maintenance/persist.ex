defmodule GroupherServer.Analysis.Maintenance.Persist do
  @moduledoc """
  Owns bounded deletion primitives for retention workflows.

  The caller must hold the transaction. Row selection is locked before the
  delete, so a Workflow can safely retry saturated batches.

      Workflow transaction -> locked IDs -> bounded delete
  """

  import Ecto.Query

  alias GroupherServer.{Analysis, Repo}
  alias Analysis.Model.{ArticleHourlyMetric, MetricEvent}

  @doc """
  Deletes one bounded batch of aggregated raw metric events.

  ## Examples

      Analysis.Maintenance.Persist.delete_metric_event_batch(cutoff, 100)
  """
  @spec delete_metric_event_batch(DateTime.t(), pos_integer()) :: non_neg_integer()
  def delete_metric_event_batch(cutoff, limit) do
    ids =
      MetricEvent
      |> where([event], not is_nil(event.aggregated_at) and event.occurred_at < ^cutoff)
      |> order_by([event], asc: event.occurred_at, asc: event.id)
      |> limit(^limit)
      |> select([event], event.id)
      |> lock("FOR UPDATE SKIP LOCKED")
      |> Repo.all()

    {deleted, _} =
      Repo.delete_all(
        from(event in MetricEvent,
          where:
            event.id in ^ids and not is_nil(event.aggregated_at) and
              event.occurred_at < ^cutoff
        )
      )

    deleted
  end

  @doc """
  Deletes one bounded batch of expired hourly metric projections.

  ## Examples

      Analysis.Maintenance.Persist.delete_hourly_metric_batch(cutoff, 100)
  """
  @spec delete_hourly_metric_batch(DateTime.t(), pos_integer()) :: non_neg_integer()
  def delete_hourly_metric_batch(cutoff, limit) do
    ids =
      ArticleHourlyMetric
      |> where([metric], metric.bucket_started_at < ^cutoff)
      |> order_by([metric], asc: metric.bucket_started_at, asc: metric.id)
      |> limit(^limit)
      |> select([metric], metric.id)
      |> lock("FOR UPDATE SKIP LOCKED")
      |> Repo.all()

    {deleted, _} =
      Repo.delete_all(
        from(metric in ArticleHourlyMetric,
          where: metric.id in ^ids and metric.bucket_started_at < ^cutoff
        )
      )

    deleted
  end
end
