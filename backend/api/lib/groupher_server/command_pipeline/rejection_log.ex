defmodule GroupherServer.CommandPipeline.RejectionLog do
  @moduledoc """
  Internal runner-owned rejection record used for the independent audit write.

      pipeline rollback -> runner builds RejectionLog -> adapter.record_rejection/1
  """

  @enforce_keys [:actor, :resource, :action, :rejection_code, :operation_ref, :source]
  defstruct [:actor, :resource, :action, :rejection_code, :operation_ref, :source]

  @type t :: %__MODULE__{
          actor: term(),
          resource: struct() | map(),
          action: atom(),
          rejection_code: atom(),
          operation_ref: term(),
          source: atom()
        }
end
