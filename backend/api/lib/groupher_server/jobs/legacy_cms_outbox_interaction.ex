defmodule GroupherServer.CMS.Outbox.Workers.Interaction.Cleanup do
  @moduledoc """
  Compatibility worker for Interaction outbox jobs persisted before the Jobs migration.

      persisted legacy Oban row -> legacy module -> Jobs.CMSOutboxInteraction
  """
  use Oban.Worker, queue: :cms_outbox, max_attempts: 8
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.CMSOutboxInteraction.perform(job)
end
