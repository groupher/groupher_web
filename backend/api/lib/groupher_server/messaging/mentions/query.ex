defmodule GroupherServer.Messaging.Mentions.Query do
  @moduledoc """
  Reads direct-mention inbox rows.

  Query owns pagination and unread-count composition only. Row replacement is
  owned by `Messaging.Mentions.Persist` and orchestrated by
  `Messaging.Commands.SendMention`.

      Mention rows -> Mentions.Query -> Inbox / Accounts.Mailbox
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]
  import ShortMaps

  alias GroupherServer.Accounts

  alias GroupherServer.{Messaging, Repo}
  alias Messaging.Model.Mention
  alias Accounts.Model.User
  alias Helper.{ORM, T}

  @doc """
  Returns one page of direct mentions for a user.

  ## Examples

      Messaging.Mentions.Query.paged(user, %{page: 1, size: 20, read: false})
  """
  @spec paged(User.t(), map()) :: T.domain_res(T.paged_data())
  def paged(%User{} = user, %{page: page, size: size} = filter) do
    read = Map.get(filter, :read, false)

    Mention
    |> where([m], m.to_user_id == ^user.id and m.read == ^read)
    |> ORM.paginator(~m(page size)a)
    |> extract_mentions()
    |> done()
  end

  @doc """
  Counts unread direct mentions for one user.

  ## Examples

      Messaging.Mentions.Query.unread_count(user.id)
  """
  @spec unread_count(term()) :: {:ok, non_neg_integer()} | {:error, term()}
  def unread_count(user_id) do
    Mention
    |> where([m], m.to_user_id == ^user_id and m.read == false)
    |> ORM.count()
  end

  @doc """
  Counts unread mentions grouped by recipient.

  ## Examples

      Messaging.Mentions.Query.unread_counts([user.id])
  """
  @spec unread_counts([term()]) :: {:ok, map()} | {:error, term()}
  def unread_counts(user_ids) when is_list(user_ids) do
    Mention
    |> where([m], m.to_user_id in ^user_ids and m.read == false)
    |> group_by([m], m.to_user_id)
    |> select([m], {m.to_user_id, count(m.id)})
    |> Repo.all()
    |> Map.new()
    |> done()
  end

  defp extract_mentions(%{entries: entries} = paged_mentions) do
    entries = entries |> Repo.preload(:from_user) |> Enum.map(&shape/1)
    Map.put(paged_mentions, :entries, entries)
  end

  defp shape(%Mention{} = mention) do
    user = Map.take(mention.from_user, [:login, :nickname, :avatar])

    mention
    |> Map.take([
      :id,
      :thread,
      :article_id,
      :comment_id,
      :title,
      :block_linker,
      :inserted_at,
      :updated_at,
      :read
    ])
    |> Map.put(:user, user)
  end
end
