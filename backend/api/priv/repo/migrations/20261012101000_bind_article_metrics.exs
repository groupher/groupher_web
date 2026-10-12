defmodule GroupherServer.Repo.Migrations.BindArticleMetrics do
  use Ecto.Migration

  @index :article_hourly_metrics_community_dimension_index

  def up do
    execute("SELECT pg_advisory_xact_lock(2026101110001)")
    execute("LOCK TABLE cms.analysis_metric_events IN ACCESS EXCLUSIVE MODE")
    execute("LOCK TABLE cms.article_hourly_metrics IN ACCESS EXCLUSIVE MODE")

    # There is intentionally no compatibility read: facts without a Binding
    # cannot distinguish Move from Mirror and would produce misleading totals.
    execute("TRUNCATE TABLE cms.analysis_metric_events, cms.article_hourly_metrics")

    alter table(:analysis_metric_events, prefix: "cms") do
      add(:binding_id, references(:article_bindings, prefix: "cms", on_delete: :delete_all),
        null: false
      )
    end

    alter table(:article_hourly_metrics, prefix: "cms") do
      add(:binding_id, references(:article_bindings, prefix: "cms", on_delete: :delete_all),
        null: false
      )
    end

    drop_if_exists(index(:article_hourly_metrics, [], prefix: "cms", name: @index))

    create(
      unique_index(
        :article_hourly_metrics,
        [
          :community_id,
          :binding_id,
          :article_type,
          :article_id,
          :bucket_started_at,
          :metric,
          :actor_type,
          :is_authenticated,
          :policy_version
        ],
        prefix: "cms",
        name: :article_hourly_metrics_binding_dimension_index
      )
    )

    create(index(:analysis_metric_events, [:binding_id], prefix: "cms"))
    create(index(:article_hourly_metrics, [:binding_id], prefix: "cms"))
  end

  def down do
    raise "Binding-aware Article metrics cannot be downgraded without inventing ambiguous data"
  end
end
