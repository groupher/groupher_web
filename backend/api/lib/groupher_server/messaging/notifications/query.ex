defmodule GroupherServer.Messaging.Notifications.Query do
  @moduledoc """
  Reads grouped activity notifications and unread counts.

  Persistence and grouping mutation are owned by `Notifications.Persist`; this
  module is read-only.

      Notification rows -> Notifications.Query -> Inbox
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.Accounts

  alias GroupherServer.{Messaging, Repo}
  alias Accounts.Model.User
  alias Messaging.Model.Notification
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @cut_from_users_count 3

  @doc """
  Returns one page of activity notifications for a user.

  ## Examples

      Messaging.Notifications.Query.paged(user, %{page: 1, size: 20, read: false})
  """
  @spec paged(User.t(), map()) :: term()
  def paged(%User{} = user, %{page: page, size: size} = filter) do
    read = Map.get(filter, :read, false)

    query =
      Notification
      |> where([n], n.user_id == ^user.id and n.read == ^read)

    with {:ok, page} <-
           ORM.pagi(
             query,
             %Params.Offset{page: page, size: size},
             for: Notification,
             order: %Order{
               fields: [:inserted_at, :id],
               directions: [:desc, :desc],
               cursor_fields: [:inserted_at, :id]
             }
           ) do
      page
      |> Page.to_legacy()
      |> cut_from_users_ifneed()
      |> done()
    end
  end

  @doc """
  Counts unread activity notifications for one user.

  ## Examples

      Messaging.Notifications.Query.unread_count(user.id)
  """
  @spec unread_count(term()) :: {:ok, non_neg_integer()} | {:error, term()}
  def unread_count(user_id) do
    Notification
    |> where([n], n.user_id == ^user_id and n.read == false)
    |> ORM.count()
  end

  @doc """
  Counts unread notifications grouped by recipient.

  ## Examples

      Messaging.Notifications.Query.unread_counts([user.id])
  """
  @spec unread_counts([term()]) :: {:ok, map()} | {:error, term()}
  def unread_counts(user_ids) when is_list(user_ids) do
    Notification
    |> where([n], n.user_id in ^user_ids and n.read == false)
    |> group_by([n], n.user_id)
    |> select([n], {n.user_id, count(n.id)})
    |> Repo.all()
    |> Map.new()
    |> done()
  end

  defp cut_from_users_ifneed(%{entries: entries} = paged_contents) do
    entries =
      Enum.map(entries, fn notify ->
        Map.put(notify, :from_users, Enum.slice(notify.from_users, 0, @cut_from_users_count))
      end)

    Map.put(paged_contents, :entries, entries)
  end
end
