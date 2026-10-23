defmodule GroupherServer.ReviewBot.Maintenance do
  @moduledoc """
  Removes expired provider-call records and redacts old Check payload metadata.
  """

  alias GroupherServer.ReviewBot
  alias ReviewBot.Maintenance.Workflow

  @doc "Runs bounded 30-day Attempt and 90-day Check retention batches."
  def cleanup_expired_records, do: Workflow.cleanup_expired_records()
end
