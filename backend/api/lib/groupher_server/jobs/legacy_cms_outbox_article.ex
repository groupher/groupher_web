defmodule GroupherServer.CMS.Outbox.Workers.Article.Cleanup do
  @moduledoc """
  Compatibility worker for Article outbox jobs persisted before the Jobs migration.

      persisted legacy Oban row -> legacy module -> Jobs.CMSOutboxArticle
  """
  use Oban.Worker, queue: :cms_outbox, max_attempts: 8
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.CMSOutboxArticle.perform(job)
end
