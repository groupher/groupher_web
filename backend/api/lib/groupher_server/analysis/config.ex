defmodule GroupherServer.Analysis.Config do
  @moduledoc """
  Runtime limits for Article Insights ingestion and retention.

      Analysis workers -> Config -> application runtime configuration
  """

  @defaults [
    metric_event_retention_days: 90,
    hourly_metric_retention_months: 13,
    aggregation_batch_size: 100,
    aggregation_max_batches: 10,
    aggregation_snooze_seconds: 5,
    retention_batch_size: 500,
    retention_max_batches: 100,
    retention_snooze_seconds: 5
  ]

  @doc """
  Returns how many days raw MetricEvents remain available for rebuilds.

  ## Examples

      Analysis.Config.metric_event_retention_days()
  """
  def metric_event_retention_days, do: positive!(:metric_event_retention_days)

  @doc """
  Returns how many months hourly metrics remain available.

  ## Examples

      Analysis.Config.hourly_metric_retention_months()
  """
  def hourly_metric_retention_months, do: positive!(:hourly_metric_retention_months)

  @doc """
  Returns the maximum number of MetricEvents consumed in one aggregation batch.

  ## Examples

      Analysis.Config.aggregation_batch_size()
  """
  def aggregation_batch_size, do: positive!(:aggregation_batch_size)

  @doc """
  Returns the maximum number of batches drained by one aggregation Job.

  ## Examples

      Analysis.Config.aggregation_max_batches()
  """
  def aggregation_max_batches, do: positive!(:aggregation_max_batches)

  @doc """
  Returns how many seconds a saturated aggregation Job snoozes before continuing.

  ## Examples

      Analysis.Config.aggregation_snooze_seconds()
  """
  def aggregation_snooze_seconds, do: positive!(:aggregation_snooze_seconds)

  @doc """
  Returns the maximum number of expired rows deleted in one retention batch.

  ## Examples

      Analysis.Config.retention_batch_size()
  """
  def retention_batch_size, do: positive!(:retention_batch_size)

  @doc """
  Returns the maximum number of batches drained per retention table and Job run.

  ## Examples

      Analysis.Config.retention_max_batches()
  """
  def retention_max_batches, do: positive!(:retention_max_batches)

  @doc """
  Returns how many seconds a saturated retention Job snoozes before continuing.

  ## Examples

      Analysis.Config.retention_snooze_seconds()
  """
  def retention_snooze_seconds, do: positive!(:retention_snooze_seconds)

  defp value(key) do
    Application.get_env(:groupher_server, __MODULE__, []) |> Keyword.get(key, @defaults[key])
  end

  defp positive!(key) do
    case value(key) do
      value when is_integer(value) and value > 0 -> value
      value -> raise ArgumentError, "#{key} must be a positive integer, got: #{inspect(value)}"
    end
  end
end
