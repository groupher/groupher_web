defmodule GroupherServer.Repo.Migrations.AddDashboardPagiMobileMode do
  use Ecto.Migration

  def change do
    alter table(:community_dashboards, prefix: "cms") do
      add(:pagi_mobile_mode, :string, null: false, default: "infinite_scroll")
    end
  end
end
