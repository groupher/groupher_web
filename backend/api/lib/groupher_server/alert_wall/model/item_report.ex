defmodule GroupherServer.AlertWall.Model.ItemReport do
  @moduledoc """
  An explicit link from a Wall item to an immutable user report.

  Business position:

      AlertWall.Persist links report
        -> ItemReport association
          -> report appears on the current Wall item
  """

  use Ecto.Schema

  import Ecto.Changeset

  alias GroupherServer.AlertWall
  alias AlertWall.Model.{Item, Report}
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.alert_wall()
  @primary_key {:id, :id, autogenerate: true}

  @type t :: %__MODULE__{}

  schema "item_reports" do
    belongs_to(:item, Item)
    belongs_to(:report, Report)
    field(:linked_by_ref, Ecto.UUID)
    field(:linked_at, :utc_datetime)
    timestamps(type: :utc_datetime)
  end

  def changeset(item_report, attrs) do
    item_report
    |> cast(attrs, [:item_id, :report_id, :linked_by_ref, :linked_at])
    |> validate_required([:item_id, :report_id, :linked_by_ref, :linked_at])
    |> foreign_key_constraint(:item_id)
    |> foreign_key_constraint(:report_id)
    |> unique_constraint([:item_id, :report_id])
  end
end
