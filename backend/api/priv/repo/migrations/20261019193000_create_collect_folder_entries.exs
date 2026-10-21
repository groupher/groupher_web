defmodule GroupherServer.Repo.Migrations.CreateCollectFolderEntries do
  use Ecto.Migration

  @account_prefix "account"
  @cms_prefix "cms"

  def up do
    create table(:collect_folder_entries, prefix: @account_prefix) do
      add(
        :folder_id,
        references(:collect_folders, prefix: @account_prefix, on_delete: :delete_all),
        null: false
      )

      add(
        :article_id,
        references(:articles, prefix: @cms_prefix, type: :uuid, on_delete: :restrict),
        null: false
      )

      add(
        :article_binding_id,
        references(:article_bindings, prefix: @cms_prefix, on_delete: :restrict),
        null: false
      )

      timestamps(updated_at: false)
    end

    create(
      unique_index(:collect_folder_entries, [:folder_id, :article_binding_id],
        prefix: @account_prefix,
        name: :collect_folder_entries_folder_binding_index
      )
    )

    create(
      index(:collect_folder_entries, [:folder_id, :inserted_at, :id], prefix: @account_prefix)
    )

    create table(:collect_folder_entry_backfill_failures, prefix: @account_prefix) do
      add(
        :folder_id,
        references(:collect_folders, prefix: @account_prefix, on_delete: :delete_all),
        null: false
      )

      add(:legacy_article_ref, :text, null: false)
      add(:reason, :string, null: false)
      timestamps(updated_at: false)
    end

    create(index(:collect_folder_entry_backfill_failures, [:folder_id], prefix: @account_prefix))

    execute("""
    WITH legacy AS (
      SELECT
        folder.id AS folder_id,
        NULLIF(COALESCE(
          collect.item->>'article_id',
          collect.item->>'post_id',
          collect.item->>'blog_id',
          collect.item->>'changelog_id',
          collect.item->>'doc_id'
        ), '') AS article_ref
      FROM #{@account_prefix}.collect_folders AS folder
      CROSS JOIN LATERAL jsonb_array_elements(COALESCE(folder.collects, '[]'::jsonb)) AS collect(item)
    ), valid AS (
      SELECT folder_id, article_ref, article_ref::uuid AS article_id
      FROM legacy
      WHERE article_ref ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    )
    INSERT INTO #{@account_prefix}.collect_folder_entry_backfill_failures
      (folder_id, legacy_article_ref, reason, inserted_at)
    SELECT folder_id, COALESCE(article_ref, ''),
      CASE WHEN article_ref IS NULL THEN 'missing_article_ref' ELSE 'invalid_article_ref' END,
      NOW()
    FROM legacy
    WHERE article_ref IS NULL
       OR article_ref !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    UNION ALL
    SELECT valid.folder_id, valid.article_ref, 'no_visible_article_binding', NOW()
    FROM valid
    WHERE NOT EXISTS (
      SELECT 1
      FROM #{@cms_prefix}.article_bindings AS binding
      WHERE binding.article_id = valid.article_id
        AND binding.visible = TRUE
    )
    """)

    execute("""
    WITH legacy AS (
      SELECT
        folder.id AS folder_id,
        COALESCE(folder.updated_at, NOW()) AS inserted_at,
        NULLIF(COALESCE(
          collect.item->>'article_id',
          collect.item->>'post_id',
          collect.item->>'blog_id',
          collect.item->>'changelog_id',
          collect.item->>'doc_id'
        ), '') AS article_ref
      FROM #{@account_prefix}.collect_folders AS folder
      CROSS JOIN LATERAL jsonb_array_elements(COALESCE(folder.collects, '[]'::jsonb)) AS collect(item)
    ), valid AS (
      SELECT folder_id, inserted_at, article_ref::uuid AS article_id
      FROM legacy
      WHERE article_ref ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    )
    INSERT INTO #{@account_prefix}.collect_folder_entries
      (folder_id, article_id, article_binding_id, inserted_at)
    SELECT DISTINCT
      valid.folder_id,
      binding.article_id,
      binding.id,
      valid.inserted_at
    FROM valid
    JOIN #{@cms_prefix}.article_bindings AS binding
      ON binding.article_id = valid.article_id
     AND binding.visible = TRUE
    ON CONFLICT (folder_id, article_binding_id) DO NOTHING
    """)

    execute("""
    WITH thread_counts AS (
      SELECT
        entry.folder_id,
        article.thread::text AS thread,
        COUNT(*)::integer AS entry_count
      FROM #{@account_prefix}.collect_folder_entries AS entry
      JOIN #{@cms_prefix}.articles AS article ON article.id = entry.article_id
      GROUP BY entry.folder_id, article.thread::text
    ), counters AS (
      SELECT
        folder_id,
        SUM(entry_count)::integer AS total_count,
        jsonb_object_agg(thread || '_count', entry_count) ||
          jsonb_object_agg('has_' || thread, entry_count > 0) AS meta
      FROM thread_counts
      GROUP BY folder_id
    )
    UPDATE #{@account_prefix}.collect_folders AS folder
    SET
      total_count = COALESCE(counters.total_count, 0),
      meta = COALESCE(folder.meta, '{}'::jsonb) ||
        jsonb_build_object(
          'post_count', 0, 'has_post', FALSE,
          'blog_count', 0, 'has_blog', FALSE,
          'changelog_count', 0, 'has_changelog', FALSE,
          'doc_count', 0, 'has_doc', FALSE
        ) || COALESCE(counters.meta, '{}'::jsonb)
    FROM (
      SELECT folder.id, counters.total_count, counters.meta
      FROM #{@account_prefix}.collect_folders AS folder
      LEFT JOIN counters ON counters.folder_id = folder.id
    ) AS counters
    WHERE counters.id = folder.id
    """)
  end

  def down do
    drop_if_exists(
      index(:collect_folder_entries, [:folder_id, :inserted_at, :id], prefix: @account_prefix)
    )

    drop_if_exists(
      index(:collect_folder_entries, [:folder_id, :article_binding_id],
        prefix: @account_prefix,
        name: :collect_folder_entries_folder_binding_index
      )
    )

    drop_if_exists(
      index(:collect_folder_entry_backfill_failures, [:folder_id], prefix: @account_prefix)
    )

    drop(table(:collect_folder_entry_backfill_failures, prefix: @account_prefix))

    drop(table(:collect_folder_entries, prefix: @account_prefix))
  end
end
