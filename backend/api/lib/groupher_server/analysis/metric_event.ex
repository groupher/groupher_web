defmodule GroupherServer.Analysis.MetricEvent do
  @moduledoc """
  Public contract for appending and marking Analysis metric facts.

      Business mutation -> Analysis.MetricEvent -> fact Persist -> Aggregator
  """

  alias __MODULE__.Persist

  @doc """
  Appends an Article action using the non-visitor `all` dimension.

  ## Examples

      Analysis.MetricEvent.append_article_action(article, operation_id, :views)
  """
  @spec append_article_action(map(), Ecto.UUID.t(), atom(), keyword()) ::
          {:ok, :pass} | {:error, term()}
  defdelegate append_article_action(article, operation_id, metric, opts \\ []), to: Persist

  @doc """
  Appends one idempotent metric fact.

  ## Examples

      Analysis.MetricEvent.append(%{operation_id: operation_id, metric: :views})
  """
  @spec append(map()) :: {:ok, :pass} | {:error, term()}
  defdelegate append(attrs), to: Persist

  @doc """
  Marks metric events as failed for operational retry inspection.

  ## Examples

      Analysis.MetricEvent.record_failure(event_ids, reason)
  """
  @spec record_failure([Ecto.UUID.t()], term()) :: {:ok, :pass}
  defdelegate record_failure(ids, reason), to: Persist
end
