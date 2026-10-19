defmodule GroupherServer.CommandPipeline.StageContext do
  @moduledoc """
  Publishes the pipeline stage currently owned by the runner process.

  Gate reads this context to reject join-only authorization outside the
  declared `gate` stage. Nested workflow callbacks temporarily replace the
  stage and the `after` block always restores the previous value, including
  when a callback raises or throws.

      Pipeline.Runner callback
        -> StageContext.run(stage, callback)
        -> Gate observes the exact current stage
        -> previous stage is restored
  """

  @stage_key {__MODULE__, :current}

  @doc false
  def current, do: Process.get(@stage_key)

  @doc false
  def run(stage, callback) when is_function(callback, 0) do
    previous = current()
    Process.put(@stage_key, stage)

    try do
      callback.()
    after
      restore(previous)
    end
  end

  defp restore(nil), do: Process.delete(@stage_key)
  defp restore(stage), do: Process.put(@stage_key, stage)
end
