defmodule GroupherServer.Messaging.Commands.SendMention do
  @moduledoc """
  Atomically replaces mention rows and rebuilds affected mailbox projections.

      SendMention
          -> Mentions.Persist
          -> Accounts.Mailbox.update_status_many_in_transaction/1
          -> commit -> Accounts.Mailbox.invalidate_users/1
  """

  alias GroupherServer.{Accounts, Messaging, Repo}
  alias Accounts.Model.User
  alias Messaging.Mentions.Persist

  @doc """
  Sends mentions for an article or comment.

  ## Examples

      Messaging.Commands.SendMention.run(comment, mentions, user)
  """
  @spec run(struct(), list(), User.t()) :: {:ok, :pass} | {:error, term()}
  def run(_content, [], _from_user), do: {:ok, :pass}

  def run(content, mentions, %User{} = from_user) do
    transaction = fn ->
      with {:ok, mentions} <- Persist.replace(content, mentions, from_user),
           {:ok, users} <-
             mentions
             |> Enum.map(& &1.to_user_id)
             |> Accounts.Mailbox.update_status_many_in_transaction() do
        %{mentions: mentions, users: users}
      else
        {:error, reason} -> Repo.rollback(reason)
      end
    end

    case Repo.transaction(transaction) do
      {:ok, %{users: users}} ->
        Accounts.Mailbox.invalidate_users(users)
        {:ok, :pass}

      {:error, reason} ->
        {:error, reason}
    end
  end
end
