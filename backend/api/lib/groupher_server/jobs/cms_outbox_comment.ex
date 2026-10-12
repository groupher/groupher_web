defmodule GroupherServer.Jobs.CMSOutboxComment do
  @moduledoc """
  Oban entrypoint for Comment outbox delivery.

      caller -> GroupherServer.Jobs.CMSOutboxComment -> result
  """
  use Oban.Worker,
    queue: :cms_outbox,
    max_attempts: 8,
    unique: [period: 86_400, keys: [:event_id], states: :incomplete]

  @impl Oban.Worker
  @doc """
  Runs `perform` through this boundary.

  ## Examples

      iex> GroupherServer.Jobs.CMSOutboxComment.perform(...)
  """
  def perform(job), do: GroupherServer.CMS.deliver_outbox(:comment, job)
end
