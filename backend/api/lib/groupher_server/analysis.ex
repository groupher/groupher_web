defmodule GroupherServer.Analysis do
  @moduledoc """
  Platform analysis context.

  Analysis groups product-facing metrics and trend DTOs by data source and
  domain dimension. `ArticleInsights` owns Groupher business metric trends;
  `Web` owns the external Web Analytics provider boundary.

  Business position:

      Application caller
        -> Analysis
        -> domain / infrastructure boundary
  """

  alias __MODULE__.Contribution
  alias __MODULE__.ArticleInsights

  @doc """
  Rebuilds one Community contribution cache from a stable id.

  ## Examples

      Analysis.contribution_refresh_community(community_id)
  """
  defdelegate contribution_refresh_community(community_id),
    to: GroupherServer.Analysis.Contribution.Effects,
    as: :refresh_community

  @doc """
  Records contribution facts for the supplied user or community subject.

  ## Examples

      Analysis.make_contribution(user)
  """
  defdelegate make_contribution(subject), to: Contribution

  @doc """
  Returns the contribution digest associated with the supplied subject.

  ## Examples

      Analysis.list_contributions_digest(user)
  """
  defdelegate list_contributions_digest(subject), to: Contribution

  @doc """
  Returns an authorized hourly business trend for one Article.

  ## Examples

      Analysis.article_insights(article, viewer, metrics: [:views])
  """
  defdelegate article_insights(article, viewer, opts \\ []), to: ArticleInsights, as: :trend

  @doc """
  Delegates GroupherServer.Analysis.ArticleInsights.trend_by_public_filter/3 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.article_insights_trend_by_public_filter(...)
  """
  defdelegate article_insights_trend_by_public_filter(arg1, arg2, arg3),
    to: GroupherServer.Analysis.ArticleInsights,
    as: :trend_by_public_filter

  @doc """
  Delegates GroupherServer.Analysis.Web.provision_community_on_create/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_provision_community_on_create(...)
  """
  defdelegate web_provision_community_on_create(arg1),
    to: GroupherServer.Analysis.Web,
    as: :provision_community_on_create

  @doc """
  Delegates GroupherServer.Analysis.Web.provision_community/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_provision_community(...)
  """
  defdelegate web_provision_community(arg1),
    to: GroupherServer.Analysis.Web,
    as: :provision_community

  @doc """
  Delegates Analysis.MetricEvent.append_article_action/3 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.metric_event_append_article_action(...)
  """
  defdelegate metric_event_append_article_action(arg1, arg2, arg3),
    to: GroupherServer.Analysis.MetricEvent,
    as: :append_article_action

  @doc """
  Delegates Analysis.MetricEvent.append_article_action/4 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.metric_event_append_article_action(...)
  """
  defdelegate metric_event_append_article_action(arg1, arg2, arg3, arg4),
    to: GroupherServer.Analysis.MetricEvent,
    as: :append_article_action

  @doc """
  Delegates Analysis.MetricEvent.append/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.metric_event_append(...)
  """
  defdelegate metric_event_append(arg1), to: GroupherServer.Analysis.MetricEvent, as: :append

  @doc """
  Reassigns Analysis facts owned by a moved ArticleBinding.

  ## Examples

      Analysis.metric_event_reassign_binding(binding_id, destination_community_id)
  """
  defdelegate metric_event_reassign_binding(binding_id, community_id),
    to: GroupherServer.Analysis.MetricEvent,
    as: :reassign_binding

  @doc """
  Delegates Analysis.Aggregator.drain/0 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.aggregator_drain(...)
  """
  defdelegate aggregator_drain(), to: GroupherServer.Analysis.Aggregator, as: :drain

  @doc """
  Delegates Analysis.Aggregator.drain/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.aggregator_drain(...)
  """
  defdelegate aggregator_drain(arg1), to: GroupherServer.Analysis.Aggregator, as: :drain

  @doc """
  Delegates Analysis.Aggregator.drain/2 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.aggregator_drain(...)
  """
  defdelegate aggregator_drain(arg1, arg2), to: GroupherServer.Analysis.Aggregator, as: :drain

  @doc """
  Delegates Analysis.Config.aggregation_snooze_seconds/0 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.config_aggregation_snooze_seconds(...)
  """
  defdelegate config_aggregation_snooze_seconds(),
    to: GroupherServer.Analysis.Config,
    as: :aggregation_snooze_seconds

  @doc """
  Delegates Analysis.Maintenance.metrics/0 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.maintenance_metrics(...)
  """
  defdelegate maintenance_metrics(), to: GroupherServer.Analysis.Maintenance, as: :metrics

  @doc """
  Delegates Analysis.Maintenance.delete_expired/0 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.maintenance_delete_expired(...)
  """
  defdelegate maintenance_delete_expired(),
    to: GroupherServer.Analysis.Maintenance,
    as: :delete_expired

  @doc """
  Delegates Analysis.Config.retention_snooze_seconds/0 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.config_retention_snooze_seconds(...)
  """
  defdelegate config_retention_snooze_seconds(),
    to: GroupherServer.Analysis.Config,
    as: :retention_snooze_seconds

  @doc """
  Delegates Analysis.Web.summary/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_summary(...)
  """
  defdelegate web_summary(arg1), to: GroupherServer.Analysis.Web, as: :summary

  @doc """
  Delegates Analysis.Web.summary/2 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_summary(...)
  """
  defdelegate web_summary(arg1, arg2), to: GroupherServer.Analysis.Web, as: :summary

  @doc """
  Delegates Analysis.Web.tracking_website_id/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_tracking_website_id(...)
  """
  defdelegate web_tracking_website_id(arg1),
    to: GroupherServer.Analysis.Web,
    as: :tracking_website_id

  @doc """
  Delegates Analysis.Web.visitor_location_map/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_visitor_location_map(...)
  """
  defdelegate web_visitor_location_map(arg1),
    to: GroupherServer.Analysis.Web,
    as: :visitor_location_map

  @doc """
  Delegates Analysis.Web.trends_overview/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trends_overview(...)
  """
  defdelegate web_trends_overview(arg1), to: GroupherServer.Analysis.Web, as: :trends_overview

  @doc """
  Delegates Analysis.Web.trends_overview/2 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trends_overview(...)
  """
  defdelegate web_trends_overview(arg1, arg2),
    to: GroupherServer.Analysis.Web,
    as: :trends_overview

  @doc """
  Delegates Analysis.Web.active_for_dashboard/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_active_for_dashboard(...)
  """
  defdelegate web_active_for_dashboard(arg1),
    to: GroupherServer.Analysis.Web,
    as: :active_for_dashboard

  @doc """
  Delegates Analysis.Web.trend_pages/3 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trend_pages(...)
  """
  defdelegate web_trend_pages(arg1, arg2, arg3), to: GroupherServer.Analysis.Web, as: :trend_pages

  @doc """
  Delegates Analysis.Web.trend_sources/3 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trend_sources(...)
  """
  defdelegate web_trend_sources(arg1, arg2, arg3),
    to: GroupherServer.Analysis.Web,
    as: :trend_sources

  @doc """
  Delegates Analysis.Web.trend_environment/3 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trend_environment(...)
  """
  defdelegate web_trend_environment(arg1, arg2, arg3),
    to: GroupherServer.Analysis.Web,
    as: :trend_environment

  @doc """
  Delegates Analysis.Web.trend_location/3 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trend_location(...)
  """
  defdelegate web_trend_location(arg1, arg2, arg3),
    to: GroupherServer.Analysis.Web,
    as: :trend_location

  @doc """
  Delegates Analysis.Web.trend_traffic/1 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trend_traffic(...)
  """
  defdelegate web_trend_traffic(arg1), to: GroupherServer.Analysis.Web, as: :trend_traffic

  @doc """
  Delegates Analysis.Web.trend_traffic/2 through the Analysis Context boundary.

  ## Examples

      iex> GroupherServer.Analysis.web_trend_traffic(...)
  """
  defdelegate web_trend_traffic(arg1, arg2), to: GroupherServer.Analysis.Web, as: :trend_traffic
end
