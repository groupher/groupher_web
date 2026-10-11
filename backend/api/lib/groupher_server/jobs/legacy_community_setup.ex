defmodule GroupherServer.CMS.Communities.Jobs.Setup do
  @moduledoc """
  Compatibility worker for setup jobs persisted before the Jobs boundary migration.

      persisted legacy Oban row -> legacy module -> Jobs.CommunitySetup
  """
  use Oban.Worker, queue: :community_setup, max_attempts: 5
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.CommunitySetup.perform(job)
end
