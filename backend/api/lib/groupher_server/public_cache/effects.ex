defmodule GroupherServer.PublicCache.Effects do
  @moduledoc """
  Delivers committed PublicCache invalidations to the configured CDN provider.

      PublicCache.Workflow
        -> PublicCache.Effects
        -> Scope tags
        -> Cloudflare provider
  """

  alias GroupherServer.PublicCache
  alias PublicCache.{Cloudflare, Model.Invalidation, Scope}

  @doc """
  Resolves canonical tags and delivers one committed invalidation.

  ## Examples

      iex> GroupherServer.PublicCache.Effects.deliver(...)
  """
  @spec deliver(Invalidation.t()) :: {:ok, :pass} | {:error, term()}
  def deliver(%Invalidation{} = invalidation) do
    with {:ok, tags} <- Scope.tags(invalidation.type, invalidation.payload) do
      Cloudflare.purge(tags)
    end
  end
end
