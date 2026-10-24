defmodule GroupherServer.AlertWall.Model.Report do
  @moduledoc """
  A reporter's immutable report fact tied to its original Wall item.

  Business position:

      Reporter command
        -> immutable Report target snapshot
          -> original item association
  """

  use Ecto.Schema

  import Ecto.Changeset

  alias GroupherServer.{Accounts, AlertWall, CMS}
  alias Accounts.Model.User
  alias AlertWall.Model.Item
  alias CMS.Model.Community
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.alert_wall()
  @owners [:cms, :accounts]
  @target_types [:article, :comment, :doc, :user]
  @primary_key {:id, :id, autogenerate: true}

  @type t :: %__MODULE__{}

  schema "reports" do
    belongs_to(:origin_item, Item)
    belongs_to(:reporter, User)
    field(:owner, Ecto.Enum, values: @owners)
    field(:target_type, Ecto.Enum, values: @target_types)
    field(:target_id, :string)
    belongs_to(:community, Community)
    field(:subject_ref, :string)
    field(:report_type, :string)
    field(:details, :string)
    field(:operation_ref, Ecto.UUID)
    field(:withdrawn_at, :utc_datetime)
    timestamps(type: :utc_datetime)
  end

  def changeset(report, attrs) do
    report
    |> cast(attrs, [
      :origin_item_id,
      :reporter_id,
      :owner,
      :target_type,
      :target_id,
      :community_id,
      :subject_ref,
      :report_type,
      :details,
      :operation_ref,
      :withdrawn_at
    ])
    |> validate_required([
      :origin_item_id,
      :reporter_id,
      :owner,
      :target_type,
      :target_id,
      :subject_ref,
      :report_type,
      :operation_ref
    ])
    |> validate_length(:details, max: 8_000)
    |> validate_owner_target()
    |> foreign_key_constraint(:origin_item_id)
    |> foreign_key_constraint(:reporter_id)
    |> foreign_key_constraint(:community_id)
    |> unique_constraint(:operation_ref)
  end

  defp validate_owner_target(changeset) do
    owner = get_field(changeset, :owner)
    target_type = get_field(changeset, :target_type)
    community_id = get_field(changeset, :community_id)

    cond do
      owner == :cms and target_type == :user ->
        add_error(changeset, :target_type, "is not owned by CMS")

      owner == :accounts and target_type != :user ->
        add_error(changeset, :target_type, "is not owned by Accounts")

      target_type == :doc and not is_nil(community_id) ->
        add_error(changeset, :community_id, "Doc reports use the platform scope")

      true ->
        changeset
    end
  end
end
