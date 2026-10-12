defmodule GroupherServer.Jobs.CMSOutboxInteraction do
  @moduledoc """
  Oban entrypoint for Interaction outbox delivery.

      caller -> GroupherServer.Jobs.CMSOutboxInteraction -> result
  """
  use Oban.Worker,
    queue: :cms_outbox,
    max_attempts: 8,
    unique: [period: 86_400, keys: [:event_id], states: :incomplete]

  @impl Oban.Worker
  @doc """
  Runs `perform` through this boundary.

  ## Examples

      iex> GroupherServer.Jobs.CMSOutboxInteraction.perform(...)
  """
  def perform(job), do: GroupherServer.CMS.deliver_outbox(:interaction, job)
end
