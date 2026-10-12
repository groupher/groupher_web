defmodule GroupherServer.Accounts.Mailbox.Workflow do
  @moduledoc """
  Owns the complete mailbox projection rebuild workflow.

  The workflow opens the transaction, delegates database primitives to
  `Projection`, then invalidates FrontDesk caches only after commit.

      Mailbox.Workflow.sync_many/1
          |
          +--> transaction -> Projection
          |
          +--> commit -> Effects
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Mailbox.{Effects, Projection}

  @doc """
  Rebuilds one user's mailbox projection and returns the updated user.

  ## Examples

      Accounts.Mailbox.Workflow.sync_one(user.id)
  """
  @spec sync_one(term()) :: {:ok, struct()} | {:error, term()}
  def sync_one(user_id) do
    with {:ok, [user]} <- sync_users([user_id]) do
      Effects.invalidate_users([user])
      {:ok, user}
    end
  end

  @doc """
  Rebuilds mailbox projections in one transaction and invalidates caches after commit.

  ## Examples

      Accounts.Mailbox.Workflow.sync_many([user.id, another_user.id])
  """
  @spec sync_many([term()]) :: {:ok, :pass} | {:error, term()}
  def sync_many(user_ids) when is_list(user_ids) do
    case normalize_user_ids(user_ids) do
      [] ->
        {:ok, :pass}

      user_ids ->
        case sync_users(user_ids) do
          {:ok, users} ->
            Effects.invalidate_users(users)
            {:ok, :pass}

          {:error, reason} ->
            {:error, reason}
        end
    end
  end

  defp sync_users(user_ids) do
    case Repo.transaction(fn ->
           case Projection.sync_many_in_transaction(user_ids) do
             {:ok, users} -> users
             {:error, reason} -> Repo.rollback(reason)
           end
         end) do
      {:ok, users} -> {:ok, users}
      {:error, reason} -> {:error, reason}
    end
  end

  defp normalize_user_ids(user_ids) do
    user_ids
    |> Enum.reject(&is_nil/1)
    |> Enum.uniq()
  end
end
