defmodule GroupherServer.PublicCache.PurgeWorker do
  @moduledoc """
  Compatibility worker for PublicCache jobs persisted before the Jobs migration.

      persisted legacy Oban row -> legacy module -> Jobs.PublicCachePurge
  """
  use Oban.Worker, queue: :public_cache, max_attempts: 8
  @doc false
  @impl Oban.Worker
  def perform(job), do: GroupherServer.Jobs.PublicCachePurge.perform(job)
  @doc false
  @impl Oban.Worker
  def backoff(job), do: GroupherServer.Jobs.PublicCachePurge.backoff(job)
end
