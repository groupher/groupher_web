defmodule GroupherServer.Analysis.Maintenance.Query do
  @moduledoc """
  Reads Analysis retention backlog and expiry predicates.

      metric facts / hourly projections -> Maintenance.Query
  """

  import Ecto.Query

  alias GroupherServer.{Analysis, Repo}
  alias Analysis.Model.{ArticleHourlyMetric, MetricEvent}

  @doc """
  Returns bounded raw-event backlog and delay metrics.

  ## Examples

      Analysis.Maintenance.Query.metrics()
  """
  @spec metrics() :: map()
  def metrics do
    now = DateTime.utc_now(:second)
    pending_query = from(event in MetricEvent, where: is_nil(event.aggregated_at))
    pending = Repo.aggregate(pending_query, :count)

    failed =
      pending_query
      |> where([event], event.attempts > 0 or not is_nil(event.last_error))
      |> Repo.aggregate(:count)

    oldest_pending_at =
      pending_query
      |> order_by([event], asc: event.inserted_at)
      |> limit(1)
      |> select([event], event.inserted_at)
      |> Repo.one()

    %{
      pending: pending,
      failed: failed,
      oldest_pending_at: oldest_pending_at,
      oldest_pending_age_seconds: pending_age(oldest_pending_at, now)
    }
  end

  @doc """
  Reports whether an expired aggregated raw-event batch remains.

  ## Examples

      Analysis.Maintenance.Query.expired_metric_events?(cutoff)
  """
  @spec expired_metric_events?(DateTime.t()) :: boolean()
  def expired_metric_events?(cutoff) do
    Repo.exists?(
      from(event in MetricEvent,
        where: not is_nil(event.aggregated_at) and event.occurred_at < ^cutoff
      )
    )
  end

  @doc """
  Reports whether an expired hourly projection batch remains.

  ## Examples

      Analysis.Maintenance.Query.expired_hourly_metrics?(cutoff)
  """
  @spec expired_hourly_metrics?(DateTime.t()) :: boolean()
  def expired_hourly_metrics?(cutoff) do
    Repo.exists?(from(metric in ArticleHourlyMetric, where: metric.bucket_started_at < ^cutoff))
  end

  defp pending_age(nil, _now), do: 0
  defp pending_age(inserted_at, now), do: max(DateTime.diff(now, inserted_at, :second), 0)
end
