defmodule GroupherServer.Repo.Migrations.DropLegacyContentAuditFields do
  use Ecto.Migration

  @cms "cms"
  @alert_board "alert_board"

  def up do
    assert_legacy_targets_have_lifecycles()
    backfill_legacy_article_holds()
    backfill_legacy_doc_holds()
    backfill_legacy_comment_holds()
    rebuild_legacy_restriction_projections()

    alter table(:articles, prefix: @cms) do
      remove(:moderation_state)
      remove(:illegal_reason)
      remove(:illegal_words)
    end

    alter table(:doc_branch_states, prefix: @cms) do
      remove(:moderation_state)
      remove(:illegal_reason)
      remove(:illegal_words)
    end

    alter table(:comments, prefix: @cms) do
      remove(:pending)
    end

    execute("""
    UPDATE cms.comments
    SET meta = meta - 'is_legal' - 'illegal_reason' - 'illegal_words'
    """)
  end

  def down do
    raise "legacy content audit fields are intentionally irreversible"
  end

  defp assert_legacy_targets_have_lifecycles do
    execute("""
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM #{@cms}.articles AS article
        WHERE article.thread <> 'doc' AND article.moderation_state <> 'legal'
          AND NOT EXISTS (
            SELECT 1 FROM #{@cms}.article_lifecycles AS lifecycle
            WHERE lifecycle.article_id = article.id
          )
      ) OR EXISTS (
        SELECT 1 FROM #{@cms}.doc_branch_states AS state
        WHERE state.moderation_state <> 'legal'
          AND NOT EXISTS (
            SELECT 1 FROM #{@cms}.doc_lifecycles AS lifecycle
            WHERE lifecycle.article_id = state.article_id
              AND lifecycle.branch_id = state.branch_id
          )
      ) OR EXISTS (
        SELECT 1 FROM #{@cms}.comments AS comment
        WHERE comment.pending = 1
          AND NOT EXISTS (
            SELECT 1 FROM #{@cms}.comment_lifecycles AS lifecycle
            WHERE lifecycle.comment_id = comment.id
          )
      ) THEN
        RAISE EXCEPTION 'legacy restricted content has no Lifecycle target';
      END IF;
    END $$;
    """)
  end

  # Preserve only the current visibility outcome. Old provider details and state
  # fields are deliberately not copied into the new model.
  defp backfill_legacy_article_holds do
    execute("""
    WITH legacy AS (
      SELECT lifecycle.id AS lifecycle_id, article.id AS article_id,
             'article:' || article.id::text AS target_key,
             COALESCE(NULLIF(lifecycle.review_content_token, ''),
                      'legacy:article:' || article.id::text || ':' || lifecycle.review_epoch::text) AS content_token,
             gen_random_uuid() AS operation_ref
      FROM #{@cms}.articles AS article
      JOIN #{@cms}.article_lifecycles AS lifecycle ON lifecycle.article_id = article.id
      WHERE article.thread <> 'doc' AND article.moderation_state <> 'legal'
    ), stamped AS (
      UPDATE #{@cms}.article_lifecycles AS lifecycle
      SET review_content_token = legacy.content_token, updated_at = now()
      FROM legacy WHERE lifecycle.id = legacy.lifecycle_id
      RETURNING lifecycle.id
    ), cases AS (
      INSERT INTO #{@alert_board}.cases
        (target_key, article_id, scope_key, content_token, status, priority, version,
         opened_at, inserted_at, updated_at)
      SELECT legacy.target_key, legacy.article_id, 'platform', legacy.content_token,
             'open', 'high', 1, now(), now(), now()
      FROM legacy JOIN stamped ON stamped.id = legacy.lifecycle_id
      ON CONFLICT (target_key, scope_key, content_token) WHERE status = 'open'
      DO UPDATE SET priority = 'high', updated_at = now()
      RETURNING id, target_key, content_token
    )
    INSERT INTO #{@cms}.article_review_restrictions
      (lifecycle_id, scope_key, cause_key, kind, content_token, source, case_id,
       created_by_operation_ref, applied_at, version, inserted_at, updated_at)
    SELECT legacy.lifecycle_id, 'platform', 'legacy-audit:' || legacy.operation_ref::text,
           'rule_hit', legacy.content_token, 'policy', cases.id, legacy.operation_ref,
           now(), 1, now(), now()
    FROM legacy JOIN cases ON cases.target_key = legacy.target_key
      AND cases.content_token = legacy.content_token
    """)
  end

  defp backfill_legacy_doc_holds do
    execute("""
    WITH legacy AS (
      SELECT lifecycle.id AS lifecycle_id, state.article_id, state.branch_id,
             'doc:' || state.article_id::text || ':' || state.branch_id::text AS target_key,
             COALESCE(NULLIF(lifecycle.review_content_token, ''),
                      'legacy:doc:' || state.article_id::text || ':' || state.branch_id::text || ':' || lifecycle.review_epoch::text) AS content_token,
             gen_random_uuid() AS operation_ref
      FROM #{@cms}.doc_branch_states AS state
      JOIN #{@cms}.doc_lifecycles AS lifecycle
        ON lifecycle.article_id = state.article_id AND lifecycle.branch_id = state.branch_id
      WHERE state.moderation_state <> 'legal'
    ), stamped AS (
      UPDATE #{@cms}.doc_lifecycles AS lifecycle
      SET review_content_token = legacy.content_token, updated_at = now()
      FROM legacy WHERE lifecycle.id = legacy.lifecycle_id
      RETURNING lifecycle.id
    ), cases AS (
      INSERT INTO #{@alert_board}.cases
        (target_key, article_id, branch_id, scope_key, content_token, status, priority,
         version, opened_at, inserted_at, updated_at)
      SELECT legacy.target_key, legacy.article_id, legacy.branch_id, 'platform',
             legacy.content_token, 'open', 'high', 1, now(), now(), now()
      FROM legacy JOIN stamped ON stamped.id = legacy.lifecycle_id
      ON CONFLICT (target_key, scope_key, content_token) WHERE status = 'open'
      DO UPDATE SET priority = 'high', updated_at = now()
      RETURNING id, target_key, content_token
    )
    INSERT INTO #{@cms}.doc_review_restrictions
      (lifecycle_id, scope_key, cause_key, kind, content_token, source, case_id,
       created_by_operation_ref, applied_at, version, inserted_at, updated_at)
    SELECT legacy.lifecycle_id, 'platform', 'legacy-audit:' || legacy.operation_ref::text,
           'rule_hit', legacy.content_token, 'policy', cases.id, legacy.operation_ref,
           now(), 1, now(), now()
    FROM legacy JOIN cases ON cases.target_key = legacy.target_key
      AND cases.content_token = legacy.content_token
    """)
  end

  defp backfill_legacy_comment_holds do
    execute("""
    WITH legacy AS (
      SELECT lifecycle.id AS lifecycle_id, comment.id AS comment_id,
             'comment:' || comment.id::text AS target_key,
             COALESCE(NULLIF(lifecycle.review_content_token, ''),
                      'legacy:comment:' || comment.id::text || ':' || lifecycle.review_epoch::text) AS content_token,
             gen_random_uuid() AS operation_ref
      FROM #{@cms}.comments AS comment
      JOIN #{@cms}.comment_lifecycles AS lifecycle ON lifecycle.comment_id = comment.id
      WHERE comment.pending = 1
    ), stamped AS (
      UPDATE #{@cms}.comment_lifecycles AS lifecycle
      SET review_content_token = legacy.content_token, updated_at = now()
      FROM legacy WHERE lifecycle.id = legacy.lifecycle_id
      RETURNING lifecycle.id
    ), cases AS (
      INSERT INTO #{@alert_board}.cases
        (target_key, comment_id, scope_key, content_token, status, priority, version,
         opened_at, inserted_at, updated_at)
      SELECT legacy.target_key, legacy.comment_id, 'platform', legacy.content_token,
             'open', 'high', 1, now(), now(), now()
      FROM legacy JOIN stamped ON stamped.id = legacy.lifecycle_id
      ON CONFLICT (target_key, scope_key, content_token) WHERE status = 'open'
      DO UPDATE SET priority = 'high', updated_at = now()
      RETURNING id, target_key, content_token
    )
    INSERT INTO #{@cms}.comment_review_restrictions
      (lifecycle_id, scope_key, cause_key, kind, content_token, source, case_id,
       created_by_operation_ref, applied_at, version, inserted_at, updated_at)
    SELECT legacy.lifecycle_id, 'platform', 'legacy-audit:' || legacy.operation_ref::text,
           'rule_hit', legacy.content_token, 'policy', cases.id, legacy.operation_ref,
           now(), 1, now(), now()
    FROM legacy JOIN cases ON cases.target_key = legacy.target_key
      AND cases.content_token = legacy.content_token
    """)
  end

  defp rebuild_legacy_restriction_projections do
    execute("""
    UPDATE #{@cms}.article_publics AS public
    SET visible = false
    FROM #{@cms}.article_lifecycles AS lifecycle
    JOIN #{@cms}.article_review_restrictions AS restriction
      ON restriction.lifecycle_id = lifecycle.id
    WHERE public.article_id = lifecycle.article_id
      AND restriction.scope_key = 'platform' AND restriction.ended_at IS NULL
    """)

    execute("""
    UPDATE #{@cms}.article_bindings AS binding
    SET visible = false
    FROM #{@cms}.article_lifecycles AS lifecycle
    JOIN #{@cms}.article_review_restrictions AS restriction
      ON restriction.lifecycle_id = lifecycle.id
    WHERE binding.article_id = lifecycle.article_id
      AND restriction.scope_key = 'platform' AND restriction.ended_at IS NULL
    """)

    execute("""
    UPDATE #{@cms}.doc_publics AS public
    SET visible = false
    FROM #{@cms}.doc_lifecycles AS lifecycle
    JOIN #{@cms}.doc_review_restrictions AS restriction
      ON restriction.lifecycle_id = lifecycle.id
    WHERE public.article_id = lifecycle.article_id AND public.branch_id = lifecycle.branch_id
      AND restriction.scope_key = 'platform' AND restriction.ended_at IS NULL
    """)
  end
end
