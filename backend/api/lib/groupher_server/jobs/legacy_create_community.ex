defmodule GroupherServer.CMS.CommunityApplications.Jobs.CreateCommunity do
  @moduledoc """
  Compatibility worker for Community creation jobs persisted before the migration.

      persisted legacy Oban row -> legacy module -> Jobs.CreateCommunity
  """
  use Oban.Worker, queue: :community_application, max_attempts: 5
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.CreateCommunity.perform(job)
end
