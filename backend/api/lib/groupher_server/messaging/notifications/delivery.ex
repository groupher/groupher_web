defmodule GroupherServer.Messaging.Notifications.Delivery do
  @moduledoc """
  Claims stable delivery keys before a retryable effect creates a notification.

      durable effect -> delivery key claim -> grouped notification -> attach row

  The claim and notification write share the caller transaction, so a failed
  delivery rolls both back and a retry cannot create a second notification.
  """

  use Ecto.Schema

  import Ecto.Query

  alias GroupherServer.{Messaging, Repo}
  alias Messaging.Model.Notification

  @schema_prefix "messaging"

  schema "notification_deliveries" do
    field(:delivery_key, :string)
    belongs_to(:notification, Notification)
    timestamps(type: :utc_datetime, updated_at: false)
  end

  @doc "Claims a delivery key, returning whether this transaction owns delivery."
  @spec claim(String.t()) :: {:ok, :claimed | :already_delivered}
  def claim(delivery_key) when is_binary(delivery_key) and delivery_key != "" do
    now = DateTime.utc_now(:second)

    case Repo.insert_all(
           __MODULE__,
           [%{delivery_key: delivery_key, inserted_at: now}],
           on_conflict: :nothing,
           conflict_target: [:delivery_key]
         ) do
      {1, _} -> {:ok, :claimed}
      {0, _} -> {:ok, :already_delivered}
    end
  end

  @doc "Associates the claimed key with the grouped notification row."
  @spec attach(String.t(), Notification.t()) :: {:ok, :pass} | {:error, term()}
  def attach(delivery_key, %Notification{id: notification_id}) do
    case Repo.update_all(
           from(delivery in __MODULE__, where: delivery.delivery_key == ^delivery_key),
           set: [notification_id: notification_id]
         ) do
      {1, _} -> {:ok, :pass}
      _ -> {:error, :notification_delivery_not_claimed}
    end
  end
end
