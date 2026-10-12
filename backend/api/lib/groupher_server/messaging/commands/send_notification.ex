defmodule GroupherServer.Messaging.Commands.SendNotification do
  @moduledoc """
  Owns the atomic create-or-merge notification command.

      SendNotification
          -> Notifications.Persist
          -> Accounts.mailbox_update_status_many_in_transaction/1
          -> commit -> Accounts.mailbox_invalidate_users/1
  """

  alias GroupherServer.{Accounts, Messaging, Repo}
  alias Accounts.Model.User
  alias Messaging.ErrorCat
  alias Messaging.Notifications.{Delivery, Persist}

  @doc """
  Creates or merges a notification for a recipient.

  ## Examples

      Messaging.Commands.SendNotification.run(attrs, user)
  """
  @spec run(map(), User.t()) :: {:ok, struct()} | {:error, term()}
  def run(%{action: _action, user_id: user_id} = attrs, %User{} = from_user) do
    with true <- Persist.valid?(attrs),
         true <- user_id !== from_user.id do
      case Repo.transaction(fn -> deliver(attrs, from_user) end) do
        {:ok, %{result: notification, users: users}} ->
          Accounts.mailbox_invalidate_users(users)
          {:ok, notification}

        {:error, reason} ->
          {:error, reason}
      end
    else
      false -> {:error, ErrorCat.invalid_notification_args()}
      _ -> {:error, ErrorCat.invalid_notification_args()}
    end
  end

  def run(_attrs, _from_user), do: {:error, ErrorCat.invalid_notification_args()}

  defp deliver(%{delivery_key: delivery_key} = attrs, from_user)
       when is_binary(delivery_key) and delivery_key != "" do
    case Delivery.claim(delivery_key) do
      {:ok, :claimed} ->
        attrs
        |> Map.delete(:delivery_key)
        |> persist_notification(from_user, delivery_key)

      {:ok, :already_delivered} ->
        %{result: :already_delivered, users: []}
    end
  end

  defp deliver(attrs, from_user), do: persist_notification(attrs, from_user, nil)

  defp persist_notification(attrs, from_user, delivery_key) do
    with {:ok, notification} <- Persist.upsert(attrs, from_user),
         {:ok, :pass} <- maybe_attach_delivery(delivery_key, notification),
         {:ok, users} <-
           Accounts.mailbox_update_status_many_in_transaction([notification.user_id]) do
      %{result: notification, users: users}
    else
      {:error, reason} -> Repo.rollback(reason)
    end
  end

  defp maybe_attach_delivery(nil, _notification), do: {:ok, :pass}

  defp maybe_attach_delivery(delivery_key, notification),
    do: Delivery.attach(delivery_key, notification)
end
