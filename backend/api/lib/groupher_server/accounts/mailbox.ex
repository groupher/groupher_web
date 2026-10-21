defmodule GroupherServer.Accounts.Mailbox do
  @moduledoc """
  Public account boundary for mailbox reads and unread-counter workflows.

  Query and read-state access belongs to Messaging. This facade owns only the
  stable Accounts entrypoint and delegates counter rebuilding to the mailbox
  projection workflow.

      Messaging rows
          |
          v
      Accounts.Mailbox.Workflow
          |
          +--> Mailbox.Projection
          +--> Mailbox.Effects
  """

  alias __MODULE__.{Effects, Projection, Query, Workflow}
  alias GroupherServer.{Accounts, Messaging}

  alias Accounts.Model.User

  @doc """
  Returns the embedded unread status for a user.

  ## Examples

      Accounts.Mailbox.status(user)
  """
  @spec status(User.t()) :: {:ok, map()} | {:error, term()}
  def status(%User{} = user), do: Query.status(user)

  @doc """
  Marks selected mention or notification rows as read.

  ## Examples

      Accounts.Mailbox.mark_read(:mention, message_ids, user)
  """
  def mark_read(type, ids, %User{} = user), do: Messaging.mark_read(type, ids, user)

  @doc """
  Marks all rows of one inbox message type as read.

  ## Examples

      Accounts.Mailbox.mark_read_all(:notification, user)
  """
  def mark_read_all(type, %User{} = user), do: Messaging.mark_read_all(type, user)

  @doc """
  Returns one page of mailbox messages.

  ## Examples

      Accounts.Mailbox.paged_messages(:mention, user, %{}, %Helper.ORM.Pagi.Params.Offset{page: 1, size: 20})
  """
  def paged_messages(type, user, filter, pagi) do
    Messaging.paged_messages(type, user, filter, pagi)
  end

  @doc """
  Rebuilds and persists one user's mailbox counters.

  ## Examples

      Accounts.Mailbox.update_status(user.id)
  """
  @spec update_status(term()) :: {:ok, User.t()} | {:error, term()}
  def update_status(user_id), do: Workflow.sync_one(user_id)

  @doc """
  Rebuilds mailbox counters for all distinct user IDs and invalidates caches after commit.

  ## Examples

      Accounts.Mailbox.update_status_many([user.id, another_user.id])
  """
  @spec update_status_many([term()]) :: {:ok, :pass} | {:error, term()}
  def update_status_many(user_ids) when is_list(user_ids), do: Workflow.sync_many(user_ids)

  @doc """
  Rebuilds mailbox counters inside a caller-owned transaction.

  This is the explicit cross-context projection primitive used by Messaging
  Commands. It performs database work only; the caller owns commit and must
  invoke `invalidate_users/1` after commit.

  ## Examples

      Accounts.Mailbox.update_status_many_in_transaction([user.id])
  """
  @spec update_status_many_in_transaction([term()]) :: {:ok, [User.t()]} | {:error, term()}
  def update_status_many_in_transaction(user_ids) when is_list(user_ids) do
    Projection.sync_many_in_transaction(user_ids)
  end

  @doc """
  Invalidates cached FrontDesk users after a mailbox transaction commits.

  ## Examples

      Accounts.Mailbox.invalidate_users([user])
  """
  @spec invalidate_users([User.t()]) :: {:ok, :pass}
  def invalidate_users(users) when is_list(users), do: Effects.invalidate_users(users)
end
