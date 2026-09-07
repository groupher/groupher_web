defmodule GroupherServer.Repo.Migrations.RepairWallpaperSnapshotTables do
  use Ecto.Migration

  @prefix "cms"

  def up do
    create_if_not_exists table(:wallpaper_snapshots, prefix: @prefix) do
      add(:public_ref, :string, null: false)

      add(:community_id, references(:communities, prefix: @prefix, on_delete: :delete_all),
        null: false
      )

      add(:theme, :string, null: false)
      add(:settings, :map, null: false)
      add(:settings_schema_version, :integer, null: false)
      add(:source_batch_ref, :string)
      add(:profile_version, :integer, null: false)
      add(:created_by_id, :string, null: false)
      add(:activated_at, :timestamptz, null: false)
      add(:history_used_at, :timestamptz, null: false)
      add(:delete_after, :timestamptz)

      timestamps()
    end

    create_if_not_exists(unique_index(:wallpaper_snapshots, [:public_ref], prefix: @prefix))
    create_if_not_exists(index(:wallpaper_snapshots, [:community_id, :theme], prefix: @prefix))

    create_if_not_exists(
      index(:wallpaper_snapshots, [:community_id, :history_used_at], prefix: @prefix)
    )

    create_if_not_exists table(:wallpaper_snapshot_images, prefix: @prefix) do
      add(
        :wallpaper_snapshot_ref,
        references(:wallpaper_snapshots,
          prefix: @prefix,
          column: :public_ref,
          type: :string,
          on_delete: :delete_all
        ),
        null: false
      )

      add(:profile, :string, null: false)
      add(:width, :integer, null: false)
      add(:height, :integer, null: false)
      add(:format, :string, null: false, default: "webp")
      add(:checksum, :string, null: false)
      add(:asset_public_ref, :string, null: false)

      timestamps()
    end

    create_if_not_exists(
      unique_index(:wallpaper_snapshot_images, [:wallpaper_snapshot_ref, :profile],
        prefix: @prefix,
        name: :wallpaper_snapshot_images_profile_index
      )
    )

    create_if_not_exists(index(:wallpaper_snapshot_images, [:asset_public_ref], prefix: @prefix))

    create_if_not_exists table(:community_wallpapers, prefix: @prefix) do
      add(:community_id, references(:communities, prefix: @prefix, on_delete: :delete_all),
        null: false
      )

      add(:public_ref, :string, null: false)
      add(:version, :integer, null: false, default: 0)
      add(:active_light_snapshot_ref, :string)
      add(:active_dark_snapshot_ref, :string)

      timestamps()
    end

    create_if_not_exists(unique_index(:community_wallpapers, [:community_id], prefix: @prefix))
    create_if_not_exists(unique_index(:community_wallpapers, [:public_ref], prefix: @prefix))

    create_if_not_exists table(:wallpaper_publish_receipts, prefix: @prefix) do
      add(:community_id, references(:communities, prefix: @prefix, on_delete: :delete_all),
        null: false
      )

      add(:idempotency_key, :string, null: false)
      add(:request_digest, :string, null: false)
      add(:request_digest_version, :integer, null: false)
      add(:response_payload, :map, null: false)
      add(:expires_at, :timestamptz, null: false)

      timestamps()
    end

    create_if_not_exists(
      unique_index(:wallpaper_publish_receipts, [:community_id, :idempotency_key],
        prefix: @prefix
      )
    )

    create_if_not_exists(index(:wallpaper_publish_receipts, [:expires_at], prefix: @prefix))
  end

  def down do
    :ok
  end
end
