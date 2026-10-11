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
          {:ok,
           Invalidation.t()
           | {:busy, pos_integer()}
           | :dead
           | :delivered
           | :missing}
          | {:error, term()}
  defdelegate claim(id, lock_ref), to: Workflow

  @doc false
  defdelegate mark_delivered(id, lock_ref, type), to: Workflow

  @doc false
  defdelegate mark_failed(id, lock_ref, type, reason, dead?), to: Workflow

  @doc """
  Delivers one committed invalidation and returns the runtime-neutral outcome.

  ## Examples

      iex> GroupherServer.PublicCache.deliver(...)
  """
  @spec deliver(Ecto.UUID.t(), String.t(), pos_integer(), pos_integer()) ::
          {:ok, :pass | {:snooze, pos_integer()}} | {:error, term()}
  defdelegate deliver(id, lock_ref, attempt, max_attempts), to: Workflow

  @doc """
  Returns the retry delay for a PublicCache delivery attempt.

  ## Examples

      iex> GroupherServer.PublicCache.delivery_retry_delay(...)
  """
  @spec delivery_retry_delay(pos_integer()) :: pos_integer()
  defdelegate delivery_retry_delay(attempt), to: Workflow

  @doc """
  Returns the configured maximum number of PublicCache delivery attempts.

  ## Examples

      iex> GroupherServer.PublicCache.max_delivery_attempts(...)
  """
  @spec max_delivery_attempts() :: pos_integer()
  defdelegate max_delivery_attempts(), to: PublicCache.Policy, as: :max_attempts

  @doc """
  Returns durable purge backlog health for readiness and operations checks.

  ## Examples

      PublicCache.health()
  """
  @spec health() :: map()
  defdelegate health(), to: Persist

  @doc """
  Delegates GroupherServer.PublicCache.Cloudflare.configured?/0 through the PublicCache Context boundary.

  ## Examples

      iex> GroupherServer.PublicCache.cloudflare_configured?(...)
  """
  defdelegate cloudflare_configured?(),
    to: GroupherServer.PublicCache.Cloudflare,
    as: :configured?

  @doc """
  Delegates PublicCache.Scope.tags/2 through the PublicCache Context boundary.

  ## Examples

      iex> GroupherServer.PublicCache.scope_tags(...)
  """
  defdelegate scope_tags(arg1, arg2), to: GroupherServer.PublicCache.Scope, as: :tags

  @doc """
  Delegates PublicCache.Cloudflare.purge/1 through the PublicCache Context boundary.

  ## Examples

      iex> GroupherServer.PublicCache.cloudflare_purge(...)
  """
  defdelegate cloudflare_purge(arg1), to: GroupherServer.PublicCache.Cloudflare, as: :purge
end
