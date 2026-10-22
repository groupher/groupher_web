defmodule GroupherServer.Repo.Migrations.DropLegacyContentAuditFields do
  use Ecto.Migration

  @cms "cms"

  def up do
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
end
