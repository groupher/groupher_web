defmodule GroupherServer.Jobs.ViewDedupeCleanup do
  @moduledoc """
  Periodically drains expired Article-view dedupe state.

      Oban cron -> ViewDedupeCleanup -> CMS.ViewTracker.ViewDedupeCleanup
  """

  use Oban.Worker, queue: :default, max_attempts: 3

  @doc false
  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    _ = GroupherServer.CMS.view_tracker_cleanup_expired()
    {:ok, :pass}
  end
end
