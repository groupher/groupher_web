defmodule GroupherServer.Jobs.ContributionCache do
  @moduledoc """
  Rebuilds one Community contribution cache from a typed resource id.

      contribution intent -> ContributionCache Worker -> Analysis Facade
  """
  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:later),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:later)

  @doc """
  Rebuilds the cache for the persisted Community id.

  ## Examples

      ContributionCache.perform(%Oban.Job{args: %{"type" => "community_contribution_cache", "community_id" => 1}})
  """
  @impl Oban.Worker
  def perform(%Oban.Job{
        args: %{"type" => "community_contribution_cache", "version" => 1, "community_id" => id}
      }) do
    GroupherServer.Analysis.contribution_refresh_community(id)
  end
end
