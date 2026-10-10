defmodule GroupherServer.Repo.Migrations.CreateAssetWorkflowState do
  use Ecto.Migration

  @moduledoc "Creates durable Asset upload and maintenance workflow state."

  def change do
    create table(:asset_uploads, prefix: "cms") do
      add(:upload_ref, :string, null: false)
      add(:idempotency_key, :string, null: false)
      add(:purpose, :string, null: false)

      add(:community_id, references(:communities, prefix: "cms", on_delete: :restrict),
        null: false
      )

      add(:uploader_id, references(:users, prefix: "account", on_delete: :nilify_all))
      add(:asset_id, references(:community_assets, prefix: "cms", on_delete: :restrict))
      add(:asset_public_ref, :string, null: false)
      add(:object_key, :string, null: false)
      add(:canonical_url, :text, null: false)
      add(:declared_filename, :string, null: false)
      add(:declared_mime_type, :string, null: false)
      add(:declared_size_bytes, :bigint, null: false)
      add(:declared_asset_type, :string, null: false)
      add(:declared_thread, :string, null: false)
      add(:declared_checksum_sha256, :string)
      add(:capability_expires_at, :timestamptz, null: false)
      add(:state, :string, null: false, default: "pending")
      add(:completion, :map, null: false, default: %{})
      add(:failure_code, :string)
      add(:failure_message, :text)
      add(:callback_attempts, :integer, null: false, default: 0)
      add(:completed_at, :timestamptz)
      add(:last_callback_at, :timestamptz)
      timestamps()
    end

    create(unique_index(:asset_uploads, [:upload_ref], prefix: "cms"))
    create(unique_index(:asset_uploads, [:idempotency_key], prefix: "cms"))
    create(unique_index(:asset_uploads, [:asset_public_ref], prefix: "cms"))
    create(index(:asset_uploads, [:community_id, :state], prefix: "cms"))

    create table(:asset_workflow_runs, prefix: "cms") do
      add(:workflow_ref, :string, null: false)
      add(:workflow_type, :string, null: false)
      add(:community_id, references(:communities, prefix: "cms", on_delete: :restrict))
      add(:resource_type, :string, null: false)
      add(:resource_id, :string, null: false)
      add(:status, :string, null: false, default: "pending")
      add(:cursor, :string)
      add(:locked_by, :string)
      add(:lease_expires_at, :timestamptz)
      add(:last_error, :text)
      add(:started_at, :timestamptz)
      add(:completed_at, :timestamptz)
      timestamps()
    end

    create(unique_index(:asset_workflow_runs, [:workflow_ref], prefix: "cms"))
    create(index(:asset_workflow_runs, [:workflow_type, :status], prefix: "cms"))

    create table(:asset_workflow_steps, prefix: "cms") do
      add(:run_id, references(:asset_workflow_runs, prefix: "cms", on_delete: :delete_all),
        null: false
      )

      add(:step_ref, :string, null: false)
      add(:resource_type, :string, null: false)
      add(:resource_id, :string, null: false)
      add(:status, :string, null: false, default: "pending")
      add(:attempts, :integer, null: false, default: 0)
      add(:locked_by, :string)
      add(:lease_expires_at, :timestamptz)
      add(:payload, :map, null: false, default: %{})
      add(:result, :map, null: false, default: %{})
      add(:last_error, :text)
      timestamps()
    end

    create(
      unique_index(:asset_workflow_steps, [:run_id, :step_ref],
        prefix: "cms",
        name: :asset_workflow_steps_run_step_ref_index
      )
    )

    create(index(:asset_workflow_steps, [:run_id, :status], prefix: "cms"))
  end
end
