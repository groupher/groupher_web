defmodule GroupherServer.Repo.Migrations.AddDashboardPagiMode do
  use Ecto.Migration

  def change do
    alter table(:community_dashboards, prefix: "cms") do
      add(:pagi_mode, :string, null: false, default: "page")
      add(:pagi_revision, :integer, null: false, default: 0)
    end
  end
end
