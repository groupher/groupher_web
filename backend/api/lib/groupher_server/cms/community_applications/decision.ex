defmodule GroupherServer.CMS.CommunityApplications.Decision do
  @moduledoc """
  Explainable, immutable admission decision for an Application action.

      Policy -> Decision -> workflow/persisted policy_snapshot
  """

  @enforce_keys [:allowed, :reason_code, :retry_at, :metadata]
  defstruct [:allowed, :reason_code, :retry_at, :metadata]

  @type t :: %__MODULE__{
          allowed: boolean(),
          reason_code: atom() | nil,
          retry_at: DateTime.t() | nil,
          metadata: map()
        }

  @doc """
  Projects one Decision into the persisted `policy_snapshot` shape.

  ## Examples

      Decision.snapshot(%Decision{allowed: true, reason_code: nil, retry_at: nil, metadata: %{}})
      #=> %{allowed: true, reason_code: nil, retry_at: nil, metadata: %{}}
  """
  @spec snapshot(t()) :: map()
  def snapshot(%__MODULE__{} = decision) do
    Map.from_struct(decision)
  end
end
