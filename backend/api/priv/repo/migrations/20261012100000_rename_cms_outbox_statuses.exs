defmodule GroupherServer.Repo.Migrations.RenameCmsOutboxStatuses do
  use Ecto.Migration

  def up do
    execute("LOCK TABLE cms.outbox_events IN ACCESS EXCLUSIVE MODE")

    execute("""
    UPDATE cms.outbox_events
    SET status = CASE status
      WHEN 'pending' THEN 'waiting'
      WHEN 'executing' THEN 'running'
      WHEN 'completed' THEN 'done'
      WHEN 'failed' THEN 'retrying'
      WHEN 'dead' THEN 'failed'
      ELSE status
    END
    """)

    execute("ALTER TABLE cms.outbox_events ALTER COLUMN status SET DEFAULT 'waiting'")
  end

  def down do
    raise "Outbox status vocabulary cutover is intentionally irreversible"
  end
end
