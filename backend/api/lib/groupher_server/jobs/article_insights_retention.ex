defmodule GroupherServer.Jobs.ArticleInsightsRetention do
  @moduledoc """
  Oban worker that applies Article Insights raw and hourly retention.

      Oban cron -> ArticleInsightsRetention -> Analysis.Maintenance
  """

  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:article_insights_retention),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:article_insights_retention),
    unique: GroupherServer.Jobs.Config.unique(:article_insights_retention)

  @doc """
  Applies one bounded Article Insights retention batch and snoozes when more work remains.

  ## Examples

      perform(%Oban.Job{})
  """
  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    case GroupherServer.Analysis.maintenance_delete_expired() do
      %{more?: true} -> {:snooze, GroupherServer.Analysis.config_retention_snooze_seconds()}
      %{more?: false} -> {:ok, :pass}
    end
  end
end
