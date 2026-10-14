defmodule GroupherServer.Repo.Migrations.AddFixtureVersionToWallpaperSnapshots do
  use Ecto.Migration

  def change do
    alter table(:wallpaper_snapshots, prefix: "cms") do
      add(:fixture_version, :string)
    end
  end
end
