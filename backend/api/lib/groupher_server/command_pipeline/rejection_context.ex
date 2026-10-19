defmodule GroupherServer.CommandPipeline.RejectionContext do
  @moduledoc """
  Read-only context passed to a pipeline rejection builder.

  `arguments` is the original public pipeline argument map. It is deliberately
  separate from the runner's internal input map so a builder cannot accidentally
  depend on prepared resources or transaction state that has already rolled
  back.

      rejected stage -> runner -> RejectionContext -> pure builder
                                          -> RejectionData
  """

  @enforce_keys [:stage, :error, :operation, :operation_ref, :arguments]
  defstruct [:stage, :error, :operation, :operation_ref, :arguments]

  @type t :: %__MODULE__{
          stage: atom(),
          error: term(),
          operation: atom(),
          operation_ref: term(),
          arguments: map()
        }
end
