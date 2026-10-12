defmodule GroupherServer.Analysis.Aggregator.Workflow do
  @moduledoc """
  Owns the bounded aggregation transaction and retry failure recording.

      Aggregator.Workflow.run
          -> transaction -> Aggregator.Persist
          -> rollback -> MetricEvent failure marker
  """

  alias GroupherServer.{Analysis, Repo}
  alias Analysis.{Config, MetricEvent}
  alias Analysis.Aggregator.Persist

  @doc """
  Aggregates one bounded batch and records failed event attempts.

  ## Examples

      Analysis.Aggregator.Workflow.run(100)
  """
  @spec run(pos_integer()) :: {:ok, non_neg_integer()} | {:error, term()}
  def run(limit \\ Config.aggregation_batch_size()) when is_integer(limit) and limit > 0 do
    case Repo.transaction(fn -> Persist.run_batch(limit) end) do
      {:ok, count} ->
        {:ok, count}

      {:error, {:aggregation_failed, event_ids, reason}} ->
        MetricEvent.record_failure(event_ids, reason)
        {:error, reason}

      {:error, reason} ->
        {:error, reason}
    end
  end

  @doc """
  Drains bounded aggregation batches until the backlog is below one batch.

  ## Examples

      Analysis.Aggregator.Workflow.drain(100, 3)
  """
  @spec drain(pos_integer(), pos_integer()) ::
          {:ok, non_neg_integer(), boolean()} | {:error, term()}
  def drain(
        limit \\ Config.aggregation_batch_size(),
        max_batches \\ Config.aggregation_max_batches()
      )
      when is_integer(limit) and limit > 0 and is_integer(max_batches) and max_batches > 0 do
    do_drain(limit, max_batches, 0)
  end

  defp do_drain(_limit, 0, total), do: {:ok, total, true}

  defp do_drain(limit, batches_left, total) do
    case run(limit) do
      {:ok, count} when count < limit -> {:ok, total + count, false}
      {:ok, count} -> do_drain(limit, batches_left - 1, total + count)
      {:error, reason} -> {:error, reason}
    end
  end
end
