defmodule GroupherServer.ReviewBot.Model.Check do
  @moduledoc """
  Version-pinned content check result; it never owns resource visibility.

      committed snapshot -> Check -> Attempts -> signal for AlertBoard Policy
  """

  use Ecto.Schema

  @primary_key {:id, Ecto.UUID, autogenerate: true}

  import Ecto.Changeset
  alias GroupherServer.{AlertBoard}

  alias AlertBoard.Model.RuleSet
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.review_bot()
  @states [:queued, :running, :completed, :failed, :superseded]
  @triggers [:submit, :edit, :report, :manual]
  @results [:pass, :restrict, :review]

  @type t :: %__MODULE__{}

  schema "checks" do
    field(:target_key, :string)
    field(:scope_key, :string)
    field(:content_token, :string)
    belongs_to(:ruleset, RuleSet)
    field(:config_version, :integer)
    field(:mode, Ecto.Enum, values: [:immediate, :ai_first, :human_first])
    field(:generation, :integer, default: 1)
    field(:trigger, Ecto.Enum, values: @triggers)
    field(:state, Ecto.Enum, values: @states, default: :queued)
    field(:result, Ecto.Enum, values: @results)
    field(:coverage, :map, default: %{})
    field(:signals, :map, default: %{"items" => []})
    field(:payload, :map)
    field(:payload_expires_at, :utc_datetime)
    field(:active_attempt, :integer, default: 0)
    field(:human_epoch, :integer, default: 0)
    field(:operation_ref, Ecto.UUID)
    has_many(:attempts, GroupherServer.ReviewBot.Model.Attempt)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates a check pinned to an immutable ruleset and content token."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = check, attrs) do
    check
    |> cast(attrs, [
      :target_key,
      :scope_key,
      :content_token,
      :ruleset_id,
      :config_version,
      :mode,
      :generation,
      :trigger,
      :state,
      :result,
      :coverage,
      :signals,
      :payload,
      :payload_expires_at,
      :active_attempt,
      :human_epoch,
      :operation_ref
    ])
    |> validate_required([
      :target_key,
      :scope_key,
      :content_token,
      :ruleset_id,
      :config_version,
      :mode,
      :generation,
      :trigger,
      :state,
      :operation_ref
    ])
    |> validate_number(:generation, greater_than: 0)
    |> validate_number(:config_version, greater_than: 0)
    |> unique_constraint(
      [:target_key, :scope_key, :content_token, :ruleset_id, :config_version, :generation],
      name: :checks_identity_index
    )
    |> unique_constraint(:operation_ref)
    |> foreign_key_constraint(:ruleset_id)
  end
end
