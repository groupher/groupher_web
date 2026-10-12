defmodule GroupherServer.CMS.Model.AssetWorkflowRun do
  @moduledoc """
  Durable run identity and lease for an Asset maintenance workflow.

      maintenance request
        -> workflow run claim
        -> step processing
        -> pending, completed or failed run
  """

  use Ecto.Schema

  import Ecto.Changeset

  alias GroupherServer.CMS

  alias CMS.Model.Community
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.cms()
  @states [:pending, :running, :completed, :failed]

  schema "asset_workflow_runs" do
    field(:workflow_ref, :string)
    field(:workflow_type, :string)
    belongs_to(:community, Community)
    field(:resource_type, :string)
    field(:resource_id, :string)
    field(:status, Ecto.Enum, values: @states, default: :pending)
    field(:cursor, :string)
    field(:locked_by, :string)
    field(:lease_expires_at, :utc_datetime)
    field(:last_error, :string)
    field(:started_at, :utc_datetime)
    field(:completed_at, :utc_datetime)
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(run, attrs) do
    run
    |> cast(attrs, [
      :workflow_ref,
      :workflow_type,
      :community_id,
      :resource_type,
      :resource_id,
      :status,
      :cursor,
      :locked_by,
      :lease_expires_at,
      :last_error,
      :started_at,
      :completed_at
    ])
    |> validate_required([:workflow_ref, :workflow_type, :resource_type, :resource_id, :status])
    |> validate_inclusion(:status, @states)
    |> foreign_key_constraint(:community_id)
    |> unique_constraint(:workflow_ref)
  end
end
