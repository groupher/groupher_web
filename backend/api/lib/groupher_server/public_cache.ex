defmodule GroupherServer.PublicCache do
  @moduledoc """
  Public contract for durable public-CDN invalidation.

  Domain code records a typed invalidation while its database transaction is
  open. `PublicCache.Persist` owns the row and lease mechanics; the durable
  Oban worker later resolves canonical tags and calls the Phoenix-owned
  Cloudflare adapter.

  Business position:

      domain transaction
        -> PublicCache facade
        -> Persist invalidation row
        -> Oban worker -> Cloudflare purge
  """

  alias GroupherServer.PublicCache
  alias PublicCache.{Model.Invalidation, Persist, Workflow}

  @doc """
  Adds an invalidation row and durable worker trigger to an Ecto.Multi.

  ## Examples

      PublicCache.invalidate(multi, :article_published, article, causation_id: command_id)
  """
  @spec invalidate(Ecto.Multi.t(), atom(), map() | struct(), keyword()) :: Ecto.Multi.t()
  defdelegate invalidate(multi, type, aggregate, opts), to: Persist

  @doc """
  Records an invalidation from a caller that is not already in a transaction.

  ## Examples

      PublicCache.invalidate_now(:article_published, article, causation_id: command_id)
  """
  @spec invalidate_now(atom(), map() | struct(), keyword()) ::
          {:ok, Invalidation.t()} | {:error, term()}
  defdelegate invalidate_now(type, aggregate, opts), to: Workflow

  @doc """
  Claims a pending or expired delivery lease with a fencing token.

  ## Examples

      PublicCache.claim(invalidation_id, lock_ref)
  """
  @spec claim(Ecto.UUID.t(), String.t()) ::
          {:ok, Invalidation.t()}
          | {:busy, pos_integer()}
          | :dead
          | :delivered
          | :missing
          | {:error, term()}
  defdelegate claim(id, lock_ref), to: Workflow

  @doc false
  defdelegate mark_delivered(id, lock_ref, type), to: Workflow

  @doc false
  defdelegate mark_failed(id, lock_ref, type, reason, dead?), to: Workflow

  @doc """
  Returns durable purge backlog health for readiness and operations checks.

  ## Examples

      PublicCache.health()
  """
  @spec health() :: map()
  defdelegate health(), to: Persist
end
