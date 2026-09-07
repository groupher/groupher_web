defmodule GroupherServer.Repo.Migrations.AddDashboardContentShadow do
  use Ecto.Migration

  def change do
    alter table(:community_dashboards, prefix: "cms") do
      add(:content_shadow, :boolean, default: false, null: false)
    end
  end
end
