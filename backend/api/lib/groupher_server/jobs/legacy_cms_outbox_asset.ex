defmodule GroupherServer.CMS.Outbox.Workers.Asset.Cleanup do
  @moduledoc """
  Compatibility worker for Asset outbox jobs persisted before the Jobs migration.

      persisted legacy Oban row -> legacy module -> Jobs.CMSOutboxAsset
  """
  use Oban.Worker, queue: :cms_outbox, max_attempts: 8
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.CMSOutboxAsset.perform(job)
end
