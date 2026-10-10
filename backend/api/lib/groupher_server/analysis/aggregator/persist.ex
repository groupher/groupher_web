defmodule GroupherServer.Analysis.Aggregator.Persist do
  @moduledoc """
  Owns metric-event locking, hourly upserts and aggregate acknowledgements.

  Persist runs inside the caller-owned aggregation transaction and never opens
  another transaction.

      pending MetricEvent rows -> aggregate upsert -> aggregated_at ack
  """

  import Ecto.Query

  alias GroupherServer.{Analysis, Repo}
  alias Analysis.Model.{ArticleHourlyMetric, MetricEvent}

  @doc """
  Aggregates one locked batch of pending metric events.

  ## Examples

      Analysis.Aggregator.Persist.run_batch(100)
  """
  @spec run_batch(pos_integer()) :: non_neg_integer()
  def run_batch(limit) when is_integer(limit) and limit > 0 do
    events = lock_pending(limit)

    try do
      aggregate_events(events)
    rescue
      exception ->
        Repo.rollback({:aggregation_failed, Enum.map(events, & &1.id), exception})
    end
  end

  defp lock_pending(limit) do
    from(event in MetricEvent,
      where: is_nil(event.aggregated_at),
      order_by: [asc: event.inserted_at],
      limit: ^limit,
      lock: "FOR UPDATE SKIP LOCKED"
    )
    |> Repo.all()
  end

  defp aggregate_events([]), do: 0

  defp aggregate_events(events) do
    now = DateTime.utc_now(:second)

    events
    |> Enum.group_by(&aggregate_key/1)
    |> Enum.each(fn {
                      {community_id, article_type, article_id, bucket, metric, actor_type,
                       is_authenticated, policy_version},
                      grouped_events
                    } ->
      value = Enum.reduce(grouped_events, 0, &(&1.value + &2))

      attrs = %{
        community_id: community_id,
        article_type: article_type,
        article_id: article_id,
        bucket_started_at: bucket,
        metric: metric,
        actor_type: actor_type,
        is_authenticated: is_authenticated,
        policy_version: policy_version,
        value: value,
        inserted_at: now,
        updated_at: now
      }

      Repo.insert_all(ArticleHourlyMetric, [attrs],
        on_conflict: [inc: [value: value], set: [updated_at: now]],
        conflict_target: [
          :article_type,
          :article_id,
          :bucket_started_at,
          :metric,
          :actor_type,
          :is_authenticated,
          :policy_version
        ]
      )
    end)

    ids = Enum.map(events, & &1.id)

    Repo.update_all(
      from(event in MetricEvent, where: event.id in ^ids),
      set: [aggregated_at: now, last_error: nil]
    )

    length(events)
  end

  defp aggregate_key(event) do
    {
      event.community_id,
      event.article_type,
      event.article_id,
      hour_start(event.occurred_at),
      event.metric,
      event.actor_type,
      event.is_authenticated,
      event.policy_version
    }
  end

  defp hour_start(%DateTime{} = datetime) do
    DateTime.from_unix!(div(DateTime.to_unix(datetime), 3600) * 3600)
  end
end
