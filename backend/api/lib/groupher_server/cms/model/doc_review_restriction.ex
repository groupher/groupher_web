defmodule GroupherServer.CMS.Model.DocReviewRestriction do
  @moduledoc """
  Platform-scope visibility restriction on a branch-specific Doc Lifecycle.

      Doc Branch Lifecycle -> active restrictions -> DocPublic projection
  """

  use Ecto.Schema

  import Ecto.Changeset
  alias GroupherServer.{AlertBoard, CMS, ReviewBot}

  alias AlertBoard.Model.Case
  alias CMS.Model.DocLifecycle
  alias ReviewBot.Model.Check
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.cms()
  @kinds [:awaiting_ai, :awaiting_human, :rule_hit, :manual_hold]
  @sources [:submission, :policy, :human]

  @type t :: %__MODULE__{}

  schema "doc_review_restrictions" do
    belongs_to(:lifecycle, DocLifecycle)
    field(:scope_key, :string)
    field(:cause_key, :string)
    field(:kind, Ecto.Enum, values: @kinds)
    field(:content_token, :string)
    field(:source, Ecto.Enum, values: @sources)
    belongs_to(:case, Case)
    belongs_to(:check, Check, type: Ecto.UUID)
    field(:created_by_operation_ref, Ecto.UUID)
    field(:applied_at, :utc_datetime)
    field(:ended_at, :utc_datetime)
    field(:ended_by_operation_ref, Ecto.UUID)
    field(:end_reason, :string)
    field(:version, :integer, default: 1)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates a branch-specific Doc restriction and its paired end metadata."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = restriction, attrs) do
    restriction
    |> cast(attrs, [
      :lifecycle_id,
      :scope_key,
      :cause_key,
      :kind,
      :content_token,
      :source,
      :case_id,
      :check_id,
      :created_by_operation_ref,
      :applied_at,
      :ended_at,
      :ended_by_operation_ref,
      :end_reason,
      :version
    ])
    |> validate_required([
      :lifecycle_id,
      :scope_key,
      :cause_key,
      :kind,
      :content_token,
      :source,
      :created_by_operation_ref,
      :applied_at,
      :version
    ])
    |> validate_number(:version, greater_than: 0)
    |> validate_end_fields()
    |> unique_constraint([:lifecycle_id, :scope_key, :cause_key],
      name: :doc_review_restrictions_active_cause_index
    )
    |> foreign_key_constraint(:lifecycle_id)
    |> foreign_key_constraint(:case_id)
  end

  defp validate_end_fields(changeset) do
    values =
      Enum.map([:ended_at, :ended_by_operation_ref, :end_reason], &get_field(changeset, &1))

    if Enum.all?(values, &is_nil/1) or Enum.all?(values, &(not is_nil(&1))) do
      changeset
    else
      add_error(changeset, :ended_at, "end metadata must be supplied together")
    end
  end
end
