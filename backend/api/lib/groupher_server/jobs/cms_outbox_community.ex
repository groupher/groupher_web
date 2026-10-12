defmodule GroupherServer.Jobs.CMSOutboxCommunity do
  @moduledoc """
  Oban entrypoint for Community and DocTree outbox delivery.

      caller -> GroupherServer.Jobs.CMSOutboxCommunity -> result
  """
  use Oban.Worker,
    queue: :cms_outbox,
    max_attempts: 8,
    unique: [period: 86_400, keys: [:event_id], states: :incomplete]

  @impl Oban.Worker
  @doc """
  Runs `perform` through this boundary.

  ## Examples

      iex> GroupherServer.Jobs.CMSOutboxCommunity.perform(...)
  """
  def perform(job), do: GroupherServer.CMS.deliver_outbox(:community, job)
end
