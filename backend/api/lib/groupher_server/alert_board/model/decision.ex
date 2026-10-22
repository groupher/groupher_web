defmodule GroupherServer.AlertBoard.Model.Decision do
  @moduledoc """
  Append-only human or policy decision attached to one review target and scope.

      Decision fact -> Lifecycle restriction transition -> Outbox visibility effect
  """

  use Ecto.Schema

  import Ecto.Changeset
  alias GroupherServer.{Accounts, AlertBoard, ReviewBot}

  alias Accounts.Model.User
  alias AlertBoard.Model.Case
  alias ReviewBot.Model.Check
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.alert_board()
  @actions [:approve, :restrict, :release, :dismiss, :recheck, :record_handled]
  @sources [:human, :policy]

  @type t :: %__MODULE__{}

  schema "decisions" do
    belongs_to(:case, Case)
    field(:target_key, :string)
    field(:scope_key, :string)
    field(:content_token, :string)
    field(:action, Ecto.Enum, values: @actions)
    field(:source, Ecto.Enum, values: @sources)
    belongs_to(:actor, User)
    belongs_to(:check, Check, type: Ecto.UUID)
    field(:restriction_ids, {:array, :integer}, default: [])
    field(:reason_code, :string)
    field(:note, :string)
    field(:operation_ref, Ecto.UUID)
    field(:expected_case_version, :integer)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates the immutable decision actor and evidence contract."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = decision, attrs) do
    decision
    |> cast(attrs, [
      :case_id,
      :target_key,
      :scope_key,
      :content_token,
      :action,
      :source,
      :actor_id,
      :check_id,
      :restriction_ids,
      :reason_code,
      :note,
      :operation_ref,
      :expected_case_version
    ])
    |> validate_required([
      :target_key,
      :scope_key,
      :content_token,
      :action,
      :source,
      :operation_ref
    ])
    |> validate_length(:note, max: 4_000)
    |> validate_source()
    |> unique_constraint(:operation_ref)
    |> foreign_key_constraint(:case_id)
    |> foreign_key_constraint(:actor_id)
  end

  defp validate_source(changeset) do
    case get_field(changeset, :source) do
      :human -> validate_required(changeset, [:actor_id])
      :policy -> validate_required(changeset, [:check_id])
      _ -> changeset
    end
  end
end
