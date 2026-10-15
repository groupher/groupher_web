defmodule GroupherServer.Messaging.Commands.RevokeNotification do
  @moduledoc """
  Owns the atomic removal of an actor from grouped notifications.

      RevokeNotification
          -> Notifications.Persist
          -> Accounts.mailbox_update_status_many_in_transaction/1
          -> commit -> Accounts.mailbox_invalidate_users/1
  """

  alias GroupherServer.{Accounts, Messaging, Repo}
  alias Accounts.Model.User
  alias Messaging.Notifications.Persist

  @doc """
  Revokes one actor's contribution from matching grouped notifications.

  ## Examples

      Messaging.Commands.RevokeNotification.run(attrs, user)
  """
  @spec run(map(), User.t()) :: {:ok, :pass} | {:error, term()}
  def run(attrs, %User{} = from_user) do
    case Persist.find_for_revoke(attrs, from_user) do
      {:error, _reason} ->
        {:ok, :pass}

      {:ok, notifications} ->
        case Repo.transaction(fn -> revoke_in_transaction(notifications, from_user) end) do
          {:ok, %{users: users}} ->
            Accounts.mailbox_invalidate_users(users)
            {:ok, :pass}

          {:error, reason} ->
            {:error, reason}
        end
    end
  end

  defp revoke_in_transaction(notifications, from_user) do
    with {:ok, :pass} <- Persist.revoke_rows(notifications, from_user),
         {:ok, users} <-
           notifications
           |> Enum.map(& &1.user_id)
           |> Accounts.mailbox_update_status_many_in_transaction() do
      %{users: users}
    else
      {:error, reason} -> Repo.rollback(reason)
    end
  end
end
