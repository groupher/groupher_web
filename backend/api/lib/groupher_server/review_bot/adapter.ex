defmodule GroupherServer.ReviewBot.Adapter do
  @moduledoc """
  Provider boundary for one immutable ReviewBot check snapshot.

      ReviewBot worker -> Adapter -> configured judgment service -> strict CheckOutput
  """
  alias GroupherServer.{ReviewBot}

  alias ReviewBot.{CheckInput, CheckOutput}

  @callback check(CheckInput.t(), map()) :: {:ok, CheckOutput.t()} | {:error, term()}
end
