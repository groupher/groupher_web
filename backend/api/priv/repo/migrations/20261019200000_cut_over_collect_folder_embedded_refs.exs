defmodule GroupherServer.Repo.Migrations.CutOverCollectFolderEmbeddedRefs do
  use Ecto.Migration

  @account_prefix "account"
  @cms_prefix "cms"

  def up do
    execute("""
    DO $$
    DECLARE
      expected_count bigint;
      actual_count bigint;
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '#{@account_prefix}'
          AND table_name = 'collect_folders' AND column_name = 'collects'
      ) THEN
        RAISE EXCEPTION 'collect folder cutover requires the legacy collects column';
      END IF;

      IF EXISTS (SELECT 1 FROM #{@account_prefix}.collect_folder_entry_backfill_failures) THEN
        RAISE EXCEPTION 'collect folder cutover blocked by unresolved backfill failures';
      END IF;

      WITH legacy AS (
        SELECT
          folder.id AS folder_id,
          NULLIF(COALESCE(
            collect.item->>'article_id', collect.item->>'post_id',
            collect.item->>'blog_id', collect.item->>'changelog_id',
            collect.item->>'doc_id'
          ), '')::uuid AS article_id
        FROM #{@account_prefix}.collect_folders AS folder
        CROSS JOIN LATERAL jsonb_array_elements(COALESCE(folder.collects, '[]'::jsonb)) AS collect(item)
      ), expected AS (
        SELECT DISTINCT legacy.folder_id, binding.id AS article_binding_id
        FROM legacy
        JOIN #{@cms_prefix}.article_bindings AS binding
          ON binding.article_id = legacy.article_id AND binding.visible = TRUE
      )
      SELECT COUNT(*) INTO expected_count FROM expected;

      SELECT COUNT(*) INTO actual_count FROM #{@account_prefix}.collect_folder_entries;

      IF expected_count <> actual_count THEN
        RAISE EXCEPTION
          'collect folder cutover count mismatch: expected %, got %',
          expected_count, actual_count;
      END IF;

      IF EXISTS (
        WITH legacy AS (
          SELECT
            folder.id AS folder_id,
            NULLIF(COALESCE(
              collect.item->>'article_id', collect.item->>'post_id',
              collect.item->>'blog_id', collect.item->>'changelog_id',
              collect.item->>'doc_id'
            ), '')::uuid AS article_id
          FROM #{@account_prefix}.collect_folders AS folder
          CROSS JOIN LATERAL jsonb_array_elements(COALESCE(folder.collects, '[]'::jsonb)) AS collect(item)
        ), expected AS (
          SELECT DISTINCT legacy.folder_id, binding.id AS article_binding_id
          FROM legacy
          JOIN #{@cms_prefix}.article_bindings AS binding
            ON binding.article_id = legacy.article_id AND binding.visible = TRUE
        )
        SELECT 1
        FROM expected
        FULL OUTER JOIN #{@account_prefix}.collect_folder_entries AS entry
          ON entry.folder_id = expected.folder_id
         AND entry.article_binding_id = expected.article_binding_id
        WHERE expected.folder_id IS NULL OR entry.folder_id IS NULL
      ) THEN
        RAISE EXCEPTION 'collect folder cutover read verification failed';
      END IF;

      IF EXISTS (
        SELECT 1
        FROM #{@account_prefix}.collect_folders AS folder
        LEFT JOIN LATERAL (
          SELECT COUNT(*)::integer AS entry_count
          FROM #{@account_prefix}.collect_folder_entries AS entry
          WHERE entry.folder_id = folder.id
        ) AS counted ON TRUE
        WHERE folder.total_count <> counted.entry_count
      ) THEN
        RAISE EXCEPTION 'collect folder cutover total_count verification failed';
      END IF;

      IF EXISTS (
        SELECT 1
        FROM #{@account_prefix}.collect_folders AS folder
        CROSS JOIN (VALUES ('post'), ('blog'), ('changelog'), ('doc')) AS configured(thread)
        LEFT JOIN LATERAL (
          SELECT COUNT(*)::integer AS entry_count
          FROM #{@account_prefix}.collect_folder_entries AS entry
          JOIN #{@cms_prefix}.articles AS article ON article.id = entry.article_id
          WHERE entry.folder_id = folder.id AND article.thread::text = configured.thread
        ) AS counted ON TRUE
        WHERE COALESCE((folder.meta->>(configured.thread || '_count'))::integer, -1) <>
                counted.entry_count
           OR COALESCE((folder.meta->>('has_' || configured.thread))::boolean, FALSE) <>
                (counted.entry_count > 0)
      ) THEN
        RAISE EXCEPTION 'collect folder cutover metadata verification failed';
      END IF;

      ALTER TABLE #{@account_prefix}.collect_folders DROP COLUMN collects;
    END $$;
    """)
  end

  def down do
    alter table(:collect_folders, prefix: @account_prefix) do
      add(:collects, :map)
    end

    execute("""
    WITH restored AS (
      SELECT
        entry.folder_id,
        jsonb_agg(
          jsonb_build_object(
            'article_id', entry.article_id::text,
            article.thread::text || '_id', entry.article_id::text,
            'article_binding_id', entry.article_binding_id
          ) ORDER BY entry.inserted_at, entry.id
        ) AS collects
      FROM #{@account_prefix}.collect_folder_entries AS entry
      JOIN #{@cms_prefix}.articles AS article ON article.id = entry.article_id
      GROUP BY entry.folder_id
    )
    UPDATE #{@account_prefix}.collect_folders AS folder
    SET collects = COALESCE(restored.collects, '[]'::jsonb)
    FROM (
      SELECT folder.id, restored.collects
      FROM #{@account_prefix}.collect_folders AS folder
      LEFT JOIN restored ON restored.folder_id = folder.id
    ) AS restored
    WHERE restored.id = folder.id
    """)
  end
end
