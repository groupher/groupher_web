defmodule GroupherServer.CMS.Communities.Jobs.ReleaseExpiredSlugClaims do
  @moduledoc """
  Compatibility worker for persisted Community Slug Claim cleanup jobs.

      persisted legacy Oban row -> legacy module -> current cleanup Worker
  """
  use Oban.Worker, queue: :community_application, max_attempts: 3
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.ReleaseExpiredCommunitySlugClaims.perform(job)
end
