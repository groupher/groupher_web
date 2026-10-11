defmodule GroupherServer.CMS.Outbox.Workers.Community.Cleanup do
  @moduledoc """
  Compatibility worker for Community outbox jobs persisted before the Jobs migration.

      persisted legacy Oban row -> legacy module -> Jobs.CMSOutboxCommunity
  """
  use Oban.Worker, queue: :cms_outbox, max_attempts: 8
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.CMSOutboxCommunity.perform(job)
end
