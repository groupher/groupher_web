defmodule GroupherServer.Repo.Migrations.RenameActivityDenialCodeToRejectionCode do
  use Ecto.Migration

  @prefix "activity"
  @tables ~w(post_logs blog_logs changelog_logs doc_logs community_logs doc_tree_logs press_logs)a

  def up do
    Enum.each(@tables, fn table ->
      execute("ALTER TABLE #{@prefix}.#{table} RENAME COLUMN denial_code TO rejection_code")
      execute("ALTER TABLE #{@prefix}.#{table} DROP CONSTRAINT #{table}_outcome_denial_check")

      execute("""
      ALTER TABLE #{@prefix}.#{table}
      ADD CONSTRAINT #{table}_outcome_rejection_check
      CHECK ((outcome = 'allowed' AND rejection_code IS NULL) OR
             (outcome = 'denied' AND rejection_code IS NOT NULL))
      """)

      execute("ALTER TABLE #{@prefix}.#{table} DROP CONSTRAINT #{table}_source_check")

      execute("""
      ALTER TABLE #{@prefix}.#{table}
      ADD CONSTRAINT #{table}_source_check
      CHECK (source IN ('api', 'admin', 'worker', 'scheduler', 'maintenance', 'operations'))
      """)
    end)
  end

  def down do
    Enum.each(@tables, fn table ->
      execute("ALTER TABLE #{@prefix}.#{table} DROP CONSTRAINT #{table}_outcome_rejection_check")
      execute("ALTER TABLE #{@prefix}.#{table} DROP CONSTRAINT #{table}_source_check")
      execute("ALTER TABLE #{@prefix}.#{table} RENAME COLUMN rejection_code TO denial_code")

      execute("""
      ALTER TABLE #{@prefix}.#{table}
      ADD CONSTRAINT #{table}_outcome_denial_check
      CHECK ((outcome = 'allowed' AND denial_code IS NULL) OR
             (outcome = 'denied' AND denial_code IS NOT NULL))
      """)

      execute("""
      ALTER TABLE #{@prefix}.#{table}
      ADD CONSTRAINT #{table}_source_check
      CHECK (source IN ('api', 'admin', 'worker', 'scheduler', 'maintenance'))
      """)
    end)
  end
end
