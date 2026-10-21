defmodule GroupherServer.Repo.Migrations.DropLegacyLifecycleIdentity do
  use Ecto.Migration

  @moduledoc "Drops the retired physical Article hash keys from Lifecycle authorities."

  def up do
    execute("DROP INDEX IF EXISTS cms.article_lifecycles_identity_index")
    execute("DROP INDEX IF EXISTS cms.doc_lifecycles_identity_index")

    cut_over_when_backfilled(:article_lifecycles)
    cut_over_when_backfilled(:doc_lifecycles)
  end

  def down do
    alter table(:doc_lifecycles, prefix: "cms") do
      add(:article_hash_id, :uuid)
      modify(:article_id, :uuid, null: true)
    end

    alter table(:article_lifecycles, prefix: "cms") do
      add(:article_hash_id, :uuid)
      modify(:article_id, :uuid, null: true)
    end
  end

  defp cut_over_when_backfilled(table) do
    table_name = Atom.to_string(table)

    execute("""
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM cms.#{table_name}
        WHERE article_id IS NULL
      ) THEN
        ALTER TABLE cms.#{table_name} DROP COLUMN IF EXISTS article_hash_id;
        ALTER TABLE cms.#{table_name} ALTER COLUMN article_id SET NOT NULL;
      END IF;
    END
    $$
    """)
  end
end
