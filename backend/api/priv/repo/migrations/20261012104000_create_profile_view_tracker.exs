defmodule GroupherServer.Repo.Migrations.CreateProfileViewTracker do
  use Ecto.Migration

  def up do
    create table(:profile_view_dedupe_states, primary_key: false, prefix: "account") do
      add(
        :profile_id,
        references(:users, prefix: "account", type: :bigint, on_delete: :delete_all),
        null: false
      )

      add(:viewer_tracking_key, :binary, null: false)
      add(:last_counted_at, :timestamptz, null: false)
      add(:expires_at, :timestamptz, null: false)

      timestamps()
    end

    create(
      unique_index(:profile_view_dedupe_states, [:profile_id, :viewer_tracking_key],
        prefix: "account",
        name: :profile_view_dedupe_states_profile_viewer_index
      )
    )

    create(
      index(:profile_view_dedupe_states, [:expires_at, :profile_id],
        prefix: "account",
        name: :profile_view_dedupe_states_expiry_index
      )
    )

    create(
      constraint(:profile_view_dedupe_states, :profile_view_dedupe_states_tracking_key_check,
        prefix: "account",
        check: "octet_length(viewer_tracking_key) = 32"
      )
    )

    create(
      constraint(:profile_view_dedupe_states, :profile_view_dedupe_states_expiry_check,
        prefix: "account",
        check: "expires_at > last_counted_at"
      )
    )
  end

  def down do
    raise "CreateProfileViewTracker is an irreversible protocol cutover"
  end
end
