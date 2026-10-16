defmodule GroupherServer.Repo.Migrations.CutOverCommentBodies do
  use Ecto.Migration

  def up do
    execute("""
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM cms.comments LIMIT 1) THEN
        RAISE EXCEPTION 'Comment BodyBag cutover requires an empty comments table; preserve-data migration was explicitly not approved';
      END IF;
    END
    $$;
    """)

    create table(:comment_bodies, prefix: "cms") do
      add(:comment_id, references(:comments, prefix: "cms", on_delete: :delete_all), null: false)
      add(:json, :text, null: false)
      add(:markdown, :text, null: false)
      add(:markdown_toc, {:array, :map}, null: false, default: [])
      add(:html, :text, null: false)
      add(:plain_text, :text, null: false)
      add(:digest, :text, null: false)
      add(:body_hash, :string, null: false)
      add(:schema_version, :integer, null: false)
      add(:version, :integer, null: false, default: 1)
      timestamps()
    end

    create(unique_index(:comment_bodies, [:comment_id], prefix: "cms"))

    alter(table(:comments, prefix: "cms")) do
      remove(:body)
      remove(:body_html)
    end
  end

  def down do
    alter(table(:comments, prefix: "cms")) do
      add(:body, :text)
      add(:body_html, :text)
    end

    drop(table(:comment_bodies, prefix: "cms"))
  end
end
