defmodule GroupherServer.Accounts.Mailbox.Projection do
  @moduledoc """
  Rebuilds the embedded User mailbox projection from Messaging facts.

  Projection owns row locking, unread-count composition and the batch embed
  update. It never opens a transaction; the caller owns transaction scope.

      locked Users + Messaging unread facts
        -> Projection.sync_many_in_transaction/1
        -> User.mailbox projection
  """

  require Logger

  import Ecto.Query, warn: false

  alias GroupherServer.{Accounts, ErrorCat, Messaging, Repo}
  alias Accounts.Model.{Embeds, User}
  alias Accounts.Profiles.ErrorCat, as: ProfileErrorCat

  @doc """
  Rebuilds mailbox projections inside an existing caller-owned transaction.

  ## Examples

      Accounts.Mailbox.Projection.sync_many_in_transaction([user.id])
  """
  @spec sync_many_in_transaction([term()]) :: {:ok, [User.t()]} | {:error, term()}
  def sync_many_in_transaction(user_ids) when is_list(user_ids) do
    case normalize_user_ids(user_ids) do
      [] -> {:ok, []}
      user_ids -> do_sync_many(user_ids)
    end
  end

  defp do_sync_many(user_ids) do
    with {:ok, users} <- lock_users(user_ids),
         {:ok, unread_mentions} <- Messaging.unread_counts(:mention, user_ids),
         {:ok, unread_notifications} <- Messaging.unread_counts(:notification, user_ids) do
      batch_update_mailboxes(users, unread_mentions, unread_notifications)
    end
  end

  defp lock_users(user_ids) do
    users =
      User
      |> where([u], u.id in ^user_ids)
      |> order_by([u], asc: u.id)
      |> lock("FOR UPDATE")
      |> Repo.all()

    found_user_ids = MapSet.new(users, & &1.id)

    case Enum.find(user_ids, &(not MapSet.member?(found_user_ids, &1))) do
      nil ->
        {:ok, users}

      missing_user_id ->
        {:error,
         ProfileErrorCat.not_exist(Helper.ErrorHandler.not_found_formatter(User, missing_user_id))}
    end
  end

  # Ecto API: https://hexdocs.pm/ecto/Ecto.Query.API.html#values/2 and
  # https://hexdocs.pm/ecto/Ecto.Repo.html#update_all/3.
  defp batch_update_mailboxes(users, unread_mentions, unread_notifications) do
    prepared_updates =
      Enum.map(users, fn user ->
        mailbox =
          build_mailbox(
            user.mailbox,
            Map.get(unread_mentions, user.id, 0),
            Map.get(unread_notifications, user.id, 0)
          )

        updated_user = %{user | mailbox: mailbox}
        payload = %{id: user.id, mailbox: Map.from_struct(mailbox)}

        {updated_user, payload}
      end)

    updates = Enum.map(prepared_updates, &elem(&1, 1))

    query =
      from(user in User,
        join: update in values(updates, %{id: :id, mailbox: :map}),
        on: update.id == user.id,
        update: [
          set: [
            mailbox: update.mailbox,
            updated_at: fragment("date_trunc('second', now())")
          ]
        ],
        select: {user.id, user.updated_at}
      )

    try do
      case Repo.update_all(query, []) do
        {count, rows} when count == length(users) ->
          updated_at_by_id = Map.new(rows, fn {id, updated_at} -> {id, updated_at} end)

          users =
            Enum.map(prepared_updates, fn {user, _payload} ->
              %{user | updated_at: Map.fetch!(updated_at_by_id, user.id)}
            end)

          {:ok, users}

        {count, _rows} ->
          {:error,
           ErrorCat.custom(
             "mailbox batch update affected #{count} of #{length(users)} expected users"
           )}
      end
    rescue
      exception ->
        Logger.error("mailbox batch update failed: #{Exception.message(exception)}")
        {:error, ErrorCat.custom()}
    end
  end

  defp build_mailbox(mailbox, unread_mentions_count, unread_notifications_count) do
    unread_total_count = unread_mentions_count + unread_notifications_count
    mailbox = mailbox || %Embeds.UserMailbox{}

    %{
      mailbox
      | id: mailbox.id || Ecto.UUID.generate(),
        unread_mentions_count: unread_mentions_count,
        unread_notifications_count: unread_notifications_count,
        unread_total_count: unread_total_count,
        is_empty: unread_total_count < 1
    }
  end

  defp normalize_user_ids(user_ids) do
    user_ids
    |> Enum.reject(&is_nil/1)
    |> Enum.uniq()
  end
end
