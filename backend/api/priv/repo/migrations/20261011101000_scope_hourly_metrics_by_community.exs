defmodule GroupherServer.Repo.Migrations.ScopeHourlyMetricsByCommunity do
  use Ecto.Migration

  @old_name :article_hourly_metrics_dimension_index
  @new_name :article_hourly_metrics_community_dimension_index

  def up do
    execute("DELETE FROM cms.article_hourly_metrics WHERE community_id IS NULL")

    execute(
      "ALTER TABLE cms.article_hourly_metrics DROP CONSTRAINT IF EXISTS article_hourly_metrics_community_id_fkey"
    )

    execute("""
    ALTER TABLE cms.article_hourly_metrics
    ADD CONSTRAINT article_hourly_metrics_community_id_fkey
    FOREIGN KEY (community_id) REFERENCES cms.communities(id) ON DELETE CASCADE
    """)

    execute("ALTER TABLE cms.article_hourly_metrics ALTER COLUMN community_id SET NOT NULL")

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
    raise "ScopeHourlyMetricsByCommunity is irreversible once one article has metrics in multiple communities"
  end
end
