defmodule GroupherServer.Repo.Migrations.CreateNotificationDeliveries do
  use Ecto.Migration

  def change do
    create table(:notification_deliveries, prefix: "messaging") do
      add(:delivery_key, :string, null: false)

      add(
        :notification_id,
        references(:notifications, prefix: "messaging", on_delete: :nilify_all)
      )

      timestamps(type: :timestamptz, updated_at: false)
    end

    create(
      unique_index(:notification_deliveries, [:delivery_key],
        prefix: "messaging",
        name: :notification_deliveries_key_index
      )
    )

    create(index(:notification_deliveries, [:notification_id], prefix: "messaging"))
  end
end
