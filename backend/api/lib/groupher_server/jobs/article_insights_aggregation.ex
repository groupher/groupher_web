defmodule GroupherServer.Jobs.ArticleInsightsAggregation do
  @moduledoc """
  Oban worker that consumes a bounded Article Insights MetricEvent batch.

      Oban cron -> ArticleInsightsAggregation -> Analysis.Aggregator
  """

  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:article_insights_aggregation),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:article_insights_aggregation),
    unique: GroupherServer.Jobs.Config.unique(:article_insights_aggregation)

  @doc false
  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    case GroupherServer.Analysis.aggregator_drain() do
      {:ok, _count, true} ->
        emit_metrics()
        {:snooze, GroupherServer.Analysis.config_aggregation_snooze_seconds()}

      {:ok, _count, false} ->
        emit_metrics()
        {:ok, :pass}

      {:error, reason} ->
        emit_metrics()
        {:error, reason}
    end
  end

  defp emit_metrics do
    :telemetry.execute(
      [:groupher, :analysis, :article_insights, :metrics],
      GroupherServer.Analysis.maintenance_metrics(),
      %{}
    )
  end
end
