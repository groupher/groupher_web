defmodule GroupherServer.Repo.Migrations.AddDashboardPagination do
  use Ecto.Migration

  def change do
    alter table(:community_dashboards, prefix: "cms") do
      add(:pagination, :map)
    end
  end
end
