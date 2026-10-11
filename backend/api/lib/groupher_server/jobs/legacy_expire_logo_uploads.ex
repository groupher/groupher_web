defmodule GroupherServer.CMS.CommunityApplications.Jobs.ExpireLogoUploads do
  @moduledoc """
  Compatibility worker for persisted Application Logo expiry jobs.

      persisted legacy Oban row -> legacy module -> current expiry Worker
  """
  use Oban.Worker, queue: :community_application, max_attempts: 3
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.ExpireCommunityApplicationLogoUploads.perform(job)
end
