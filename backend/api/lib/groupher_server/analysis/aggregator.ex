defmodule GroupherServer.Analysis.Aggregator do
  @moduledoc """
  Public facade for bounded Article hourly-metric aggregation.

      Oban worker -> Analysis.Aggregator -> Aggregator.Workflow
  """

  alias __MODULE__.Workflow

  @doc """
  Consumes a bounded batch with row locks and an atomic aggregate/ack workflow.

  ## Examples

      Analysis.Aggregator.run(100)
  """
  @spec run(pos_integer()) :: {:ok, non_neg_integer()} | {:error, term()}
  defdelegate run(limit \\ GroupherServer.Analysis.Config.aggregation_batch_size()), to: Workflow

  @doc """
  Drains several bounded batches and reports whether more work remains.

  ## Examples

      Analysis.Aggregator.drain(100, 3)
  """
  @spec drain(pos_integer(), pos_integer()) ::
          {:ok, non_neg_integer(), boolean()} | {:error, term()}
  defdelegate drain(
                limit \\ GroupherServer.Analysis.Config.aggregation_batch_size(),
                max_batches \\ GroupherServer.Analysis.Config.aggregation_max_batches()
              ),
              to: Workflow
end
