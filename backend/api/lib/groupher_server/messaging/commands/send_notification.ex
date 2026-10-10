defmodule GroupherServer.Messaging.Commands.SendNotification do
  @moduledoc """
  Owns the atomic create-or-merge notification command.

      SendNotification
          -> Notifications.Persist
          -> Accounts.Mailbox.update_status_many_in_transaction/1
          -> commit -> Accounts.Mailbox.invalidate_users/1
  """

  alias GroupherServer.{Accounts, Messaging, Repo}
  alias Accounts.Model.User
  alias Messaging.Notifications.Persist

  @doc """
  Creates or merges a notification for a recipient.

  ## Examples

      Messaging.Commands.SendNotification.run(attrs, user)
  """
  @spec run(map(), User.t()) :: {:ok, struct()} | {:error, term()}
  def run(%{action: _action, user_id: user_id} = attrs, %User{} = from_user) do
    with true <- Persist.valid?(attrs),
         true <- user_id !== from_user.id do
      case Repo.transaction(fn ->
             with {:ok, notification} <- Persist.upsert(attrs, from_user),
                  {:ok, users} <-
                    Accounts.Mailbox.update_status_many_in_transaction([notification.user_id]) do
               %{result: notification, users: users}
             else
               {:error, reason} -> Repo.rollback(reason)
             end
           end) do
        {:ok, %{result: notification, users: users}} ->
          Accounts.Mailbox.invalidate_users(users)
          {:ok, notification}

        {:error, reason} ->
          {:error, reason}
      end
    else
      false -> {:error, "invalid args for notification"}
      _ -> {:error, "invalid args for notification"}
    end
  end

  def run(_attrs, _from_user), do: {:error, "invalid args for notification"}
end
