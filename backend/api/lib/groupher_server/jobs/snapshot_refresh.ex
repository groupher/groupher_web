defmodule GroupherServer.Jobs.SnapshotRefresh do
  @moduledoc """
  Snapshot cache refresh job.

  Business position:

      Domain event / scheduler
        -> Oban
        -> SnapshotRefresh
        -> context / service
  """

  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:snapshot_refresh),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:snapshot_refresh),
    unique: GroupherServer.Jobs.Config.unique(:snapshot_refresh)

  alias GroupherServer.CMS

  @doc false
  @impl Oban.Worker
  def perform(%Oban.Job{
        args: %{"type" => type, "version" => 1, "refs" => refs, "opts" => opts}
      }) do
    resource_type = String.to_existing_atom(type)

    CMS.snapshot_perform_refresh(
      resource_type,
      normalize_refs(resource_type, refs),
      normalize_opts(opts)
    )
  end

  defp normalize_refs(:user, refs), do: refs

  defp normalize_refs(type, %{"thread" => thread, "ids" => ids})
       when type in [:article, :comment] do
    %{thread: String.to_existing_atom(thread), ids: ids}
  end

  defp normalize_opts(opts) when is_map(opts) do
    Enum.map(opts, fn {key, value} -> {String.to_existing_atom(key), value} end)
  end
end
