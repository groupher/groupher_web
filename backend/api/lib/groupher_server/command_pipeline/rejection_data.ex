defmodule GroupherServer.CommandPipeline.RejectionData do
  @moduledoc """
  Command-owned data needed to write a rejection Activity.

      rejection builder -> RejectionData -> pipeline runner -> adapter.record_rejection/1

  `resource` must be a loaded struct or a map carrying the stable resource
  identity expected by Activity. A bare id is deliberately not accepted.
  """

  @enforce_keys [:resource, :action, :rejection_code]
  defstruct [:resource, :action, :rejection_code, :source]

  @type t :: %__MODULE__{
          resource: struct() | map(),
          action: atom(),
          rejection_code: atom(),
          source: atom() | nil
        }
end
