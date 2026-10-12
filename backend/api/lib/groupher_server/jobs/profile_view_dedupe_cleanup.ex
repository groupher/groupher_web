defmodule GroupherServer.Jobs.ProfileViewDedupeCleanup do
  @moduledoc """
  Periodically drains expired Profile-view dedupe state.

      Oban cron -> Accounts root facade -> ProfileViewTracker cleanup
  """

  use Oban.Worker, queue: :default, max_attempts: 3

  @doc false
  @impl Oban.Worker
  def perform(%Oban.Job{}) do
    _ = GroupherServer.Accounts.profile_view_tracker_cleanup_expired()
    {:ok, :pass}
  end
end
