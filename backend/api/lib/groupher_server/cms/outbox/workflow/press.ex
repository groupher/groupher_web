defmodule GroupherServer.CMS.Outbox.Workflow.Press do
  @moduledoc """
  Delivers durable Press cache-invalidation intents after config commits.

      committed Press outbox event
        -> Press Worker
        -> canonical Community reload
        -> authenticated Press invalidation endpoint
  """

  alias GroupherServer.{CMS, Repo}
  alias CMS.Model.Community
  alias CMS.Outbox

  @doc "Delivers one versioned Press outbox event under the shared lease protocol."
  @spec perform(Oban.Job.t()) :: Oban.Worker.result()
  def perform(%Oban.Job{args: %{"event_id" => event_id}} = job) do
    case Outbox.execute(event_id, &invalidate/1) do
      {:ok, _value} ->
        {:ok, :pass}

      {:busy, seconds} ->
        {:snooze, seconds}

      {:error, _reason} when job.attempt >= job.max_attempts ->
        _ = Outbox.mark_failed(event_id)
        {:ok, :pass}

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp invalidate(%{event: "press.cache_invalidation", contract_version: 1} = event) do
    case Integer.parse(event.resource_id) do
      {community_id, ""} ->
        case Repo.get(Community, community_id) do
          %Community{} = community -> CMS.Press.invalidate(community)
          nil -> {:ok, :pass}
        end

      _ ->
        {:error, :invalid_press_community_id}
    end
  end

  defp invalidate(_event), do: {:error, :unknown_press_outbox_event}
end
