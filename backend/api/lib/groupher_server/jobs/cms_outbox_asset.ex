defmodule GroupherServer.Jobs.CMSOutboxAsset do
  @moduledoc """
  Oban entrypoint for Asset outbox delivery.

      caller -> GroupherServer.Jobs.CMSOutboxAsset -> result
  """
  use Oban.Worker,
    queue: :cms_outbox,
    max_attempts: 8,
    unique: [period: 86_400, keys: [:event_id], states: :incomplete]

  @impl Oban.Worker
  @doc """
  Delivers one Asset outbox job through the CMS outbox owner.

  ## Examples

      perform(%Oban.Job{args: %{"event_id" => 1}})
  """
  def perform(job), do: GroupherServer.CMS.deliver_outbox(:asset, job)
end
