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

  alias GroupherServer.{CMS, Jobs}
  alias Jobs.Codec

  @doc false
  @impl Oban.Worker
  def perform(%Oban.Job{args: %{"kind" => kind, "refs" => refs, "opts" => opts}}) do
    CMS.snapshot_perform_refresh(
      String.to_existing_atom(kind),
      Codec.decode(refs),
      Codec.decode(opts)
    )
  end
end
