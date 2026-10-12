defmodule GroupherServer.Repo.Migrations.RestoreRollingSafeCmsOutboxStatuses do
  use Ecto.Migration

  def up do
    execute("""
    DO $$
    DECLARE
      current_default text;
    BEGIN
      SELECT column_default
      INTO current_default
      FROM information_schema.columns
      WHERE table_schema = 'cms'
        AND table_name = 'outbox_events'
        AND column_name = 'status';

      IF current_default LIKE '%waiting%' THEN
        LOCK TABLE cms.outbox_events IN ACCESS EXCLUSIVE MODE;

        UPDATE cms.outbox_events
        SET status = CASE status
          WHEN 'waiting' THEN 'pending'
          WHEN 'running' THEN 'executing'
          WHEN 'retrying' THEN 'failed'
          WHEN 'done' THEN 'completed'
          WHEN 'failed' THEN 'dead'
          ELSE status
        END;

        ALTER TABLE cms.outbox_events ALTER COLUMN status SET DEFAULT 'pending';
      END IF;
    END
    $$;
    """)
  end

  def down, do: :ok
end
