defmodule GroupherServer.ReviewBot.Model.Attempt do
  @moduledoc """
  Bounded provider-call lifecycle metadata with no prompt or raw response storage.

      Check worker -> Attempt running -> provider result or retryable failure
  """

  use Ecto.Schema

  import Ecto.Changeset
  alias GroupherServer.{ReviewBot}

  alias ReviewBot.Model.Check
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.review_bot()
  @states [:running, :succeeded, :retryable_error, :terminal_error, :abandoned]

  @type t :: %__MODULE__{}

  schema "attempts" do
    belongs_to(:check, Check, type: Ecto.UUID)
    field(:number, :integer)
    field(:state, Ecto.Enum, values: @states)
    field(:started_at, :utc_datetime)
    field(:finished_at, :utc_datetime)
    field(:provider_profile, :string)
    field(:request_id, Ecto.UUID)
    field(:error_code, :string)
    field(:latency_ms, :integer)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates one provider attempt without storing request or response content."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = attempt, attrs) do
    attempt
    |> cast(attrs, [
      :check_id,
      :number,
      :state,
      :started_at,
      :finished_at,
      :provider_profile,
      :request_id,
      :error_code,
      :latency_ms
    ])
    |> validate_required([
      :check_id,
      :number,
      :state,
      :started_at,
      :provider_profile,
      :request_id
    ])
    |> validate_number(:number, greater_than: 0)
    |> validate_number(:latency_ms, greater_than_or_equal_to: 0)
    |> unique_constraint([:check_id, :number])
    |> unique_constraint(:request_id)
    |> foreign_key_constraint(:check_id)
  end
end
