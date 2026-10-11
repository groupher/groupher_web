defmodule GroupherServer.Repo.Migrations.ScopeHourlyMetricsByCommunity do
  use Ecto.Migration

  @old_name :article_hourly_metrics_dimension_index
  @new_name :article_hourly_metrics_community_dimension_index

  def up do
    drop_if_exists(index(:article_hourly_metrics, [], prefix: "cms", name: @old_name))

    create(
      unique_index(
        :article_hourly_metrics,
        [
          :community_id,
          :article_type,
          :article_id,
          :bucket_started_at,
          :metric,
          :actor_type,
          :is_authenticated,
          :policy_version
        ],
        prefix: "cms",
        name: @new_name
      )
    )
  end

  def down do
    drop(index(:article_hourly_metrics, [], prefix: "cms", name: @new_name))

    create(
      unique_index(
        :article_hourly_metrics,
        [
          :article_type,
          :article_id,
          :bucket_started_at,
          :metric,
          :actor_type,
          :is_authenticated,
          :policy_version
        ],
        prefix: "cms",
        name: @old_name
      )
    )
  end
end
