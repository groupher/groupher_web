defmodule GroupherServer.Repo.Migrations.DropLegacyContentAuditFields do
  use Ecto.Migration

  def up do
    execute("""
    ALTER TABLE cms.articles
      DROP COLUMN moderation_state,
      DROP COLUMN illegal_reason,
      DROP COLUMN illegal_words
    """)

    execute("""
    ALTER TABLE cms.doc_branch_states
      DROP COLUMN moderation_state,
      DROP COLUMN illegal_reason,
      DROP COLUMN illegal_words
    """)

    migrate_legacy_pending_comments()

    execute("ALTER TABLE cms.comments DROP COLUMN pending")

    execute("""
    UPDATE cms.comments
    SET meta = meta - 'is_legal' - 'illegal_reason' - 'illegal_words'
    """)
  end

  def down do
    raise "legacy content audit fields are intentionally irreversible"
  end

  defp migrate_legacy_pending_comments do
    execute("""
    WITH legacy_comments AS (
      SELECT
        comment.id AS comment_id,
        lifecycle.id AS lifecycle_id,
        lifecycle.review_content_token AS content_token,
        md5('legacy-comment-pending:' || comment.id::text)::uuid AS operation_ref,
        COALESCE(comment.inserted_at, now()) AS opened_at
      FROM cms.comments AS comment
      JOIN cms.comment_lifecycles AS lifecycle ON lifecycle.comment_id = comment.id
      WHERE comment.pending = 1
    )
    INSERT INTO alert_board.cases (
      target_key, comment_id, scope_key, content_token, status, priority,
      version, opened_at, inserted_at, updated_at
    )
    SELECT
      'comment:' || legacy.comment_id::text,
      legacy.comment_id,
      'platform',
      legacy.content_token,
      'open',
      'normal',
      1,
      legacy.opened_at,
      legacy.opened_at,
      legacy.opened_at
    FROM legacy_comments AS legacy
    ON CONFLICT (target_key, scope_key, content_token) WHERE status = 'open'
    DO NOTHING
    """)

    execute("""
    WITH legacy_comments AS (
      SELECT
        comment.id AS comment_id,
        lifecycle.id AS lifecycle_id,
        lifecycle.review_content_token AS content_token,
        md5('legacy-comment-pending:' || comment.id::text)::uuid AS operation_ref,
        COALESCE(comment.inserted_at, now()) AS applied_at
      FROM cms.comments AS comment
      JOIN cms.comment_lifecycles AS lifecycle ON lifecycle.comment_id = comment.id
      WHERE comment.pending = 1
    )
    INSERT INTO cms.comment_review_restrictions (
      lifecycle_id, scope_key, cause_key, kind, content_token, source,
      case_id, created_by_operation_ref, applied_at, inserted_at, updated_at
    )
    SELECT
      legacy.lifecycle_id,
      'platform',
      'legacy_pending:' || legacy.comment_id::text,
      'manual_hold',
      legacy.content_token,
      'human',
      case_record.id,
      legacy.operation_ref,
      legacy.applied_at,
      legacy.applied_at,
      legacy.applied_at
    FROM legacy_comments AS legacy
    JOIN alert_board.cases AS case_record
      ON case_record.target_key = 'comment:' || legacy.comment_id::text
      AND case_record.scope_key = 'platform'
      AND case_record.content_token = legacy.content_token
      AND case_record.status = 'open'
    ON CONFLICT (lifecycle_id, scope_key, cause_key) WHERE ended_at IS NULL
    DO NOTHING
    """)
  end
end
