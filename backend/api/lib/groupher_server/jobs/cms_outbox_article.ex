defmodule GroupherServer.Jobs.CMSOutboxArticle do
  @moduledoc """
  Oban entrypoint for Article outbox delivery.

      caller -> GroupherServer.Jobs.CMSOutboxArticle -> result
  """
  use Oban.Worker,
    queue: :cms_outbox,
    max_attempts: 8,
    unique: [period: 86_400, keys: [:event_id], states: :incomplete]

  @impl Oban.Worker
  @doc """
  Delivers one Article outbox job through the CMS outbox owner.

  ## Examples

      perform(%Oban.Job{args: %{"event_id" => 1}})
  """
  def perform(job), do: GroupherServer.CMS.deliver_outbox(:article, job)
end
