defmodule GroupherServer.CMS.Outbox.Workers.Comment.Cleanup do
  @moduledoc """
  Compatibility worker for Comment outbox jobs persisted before the Jobs migration.

      persisted legacy Oban row -> legacy module -> Jobs.CMSOutboxComment
  """
  use Oban.Worker, queue: :cms_outbox, max_attempts: 8
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.CMSOutboxComment.perform(job)
end
