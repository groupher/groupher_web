defmodule GroupherServer.Repo.Migrations.AddCoverBackgroundAssetRefs do
  use Ecto.Migration

  @prefix "cms"

  def change do
    alter table(:cover_backgrounds, prefix: @prefix) do
      add(:asset_public_ref, :string)
      add(:static_asset_public_ref, :string)
    end
  end
end
