defmodule GroupherServer.PublicCache.Workflow do
  @moduledoc """
  Owns transaction scope for PublicCache delivery and recovery steps.

  Persist supplies row primitives; this module supplies the transaction around
  insertion, lease fencing, and terminal delivery state changes.

      PublicCache request / PurgeWorker
        -> Workflow transaction
        -> Persist row primitive
        -> commit or retry
  """

  alias GroupherServer.{PublicCache, Repo}
  alias PublicCache.{Model.Invalidation, Persist}

  @doc """
  Records an invalidation and enqueues delivery in one transaction.

  ## Examples

      PublicCache.Workflow.invalidate_now(:article_published, article, causation_id: command_id)
  """
  @spec invalidate_now(atom(), map() | struct(), keyword()) ::
          {:ok, Invalidation.t()} | {:error, term()}
  def invalidate_now(type, aggregate, opts) do
    Repo.transaction(fn ->
      with {:ok, invalidation} <- Persist.insert(type, aggregate, opts),
           {:ok, _job} <- Persist.enqueue(invalidation.id) do
        invalidation
      else
        {:error, reason} -> Repo.rollback(reason)
      end
    end)
  end

  @doc """
  Claims a pending or expired delivery lease with a fencing token.

  ## Examples

      PublicCache.Workflow.claim(invalidation_id, lock_ref)
  """
  @spec claim(Ecto.UUID.t(), String.t()) ::
          {:ok, Invalidation.t()}
          | {:busy, pos_integer()}
          | :dead
          | :delivered
          | :missing
          | {:error, term()}
  def claim(id, lock_ref) do
    Repo.transaction(fn -> Persist.claim(id, lock_ref) end)
    |> unwrap_transaction()
  end

  @doc false
  def mark_delivered(id, lock_ref, type) do
    Repo.transaction(fn -> Persist.mark_delivered(id, lock_ref, type) end)
    |> unwrap_transaction()
  end

  @doc false
  def mark_failed(id, lock_ref, type, reason, dead?) do
    Repo.transaction(fn -> Persist.mark_failed(id, lock_ref, type, reason, dead?) end)
    |> unwrap_transaction()
  end

  defp unwrap_transaction({:ok, result}), do: result
  defp unwrap_transaction({:error, reason}), do: {:error, reason}
end
