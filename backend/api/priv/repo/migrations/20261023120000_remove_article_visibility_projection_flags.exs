defmodule GroupherServer.Repo.Migrations.RemoveArticleVisibilityProjectionFlags do
  use Ecto.Migration

  def up do
    execute("DROP INDEX IF EXISTS cms.article_publics_visible_active_at_index")

    execute("ALTER TABLE cms.article_bindings DROP COLUMN visible")
    execute("ALTER TABLE cms.article_publics DROP COLUMN visible")

    create(index(:article_publics, [:active_at], prefix: "cms"))
  end

  def down do
    raise "Article visibility flags were derived from Lifecycle and ReviewRestrictions and are intentionally not restored"
  end
end
