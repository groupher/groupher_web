defmodule GroupherServer.Messaging.Mentions.Persist do
  @moduledoc """
  Owns mention-row persistence primitives.

  The module normalizes and replaces rows but never opens a transaction. The
  surrounding SendMention command owns atomicity and mailbox projection sync.

      article/comment + mentions
          -> delete previous rows
          -> insert current rows
          -> return affected recipients
  """

  import Ecto.Query, warn: false
  import GroupherServer.FrontDesk, only: [thread_of: 1]

  alias GroupherServer.{Messaging, Accounts}

  alias GroupherServer.{CMS, Repo}

  alias CMS.Model.Comment
  alias Accounts.Model.User
  alias Messaging.Model.Mention
  alias Helper.ORM

  @doc """
  Replaces persisted mention rows for one content author.

  ## Examples

      Messaging.Mentions.Persist.replace(comment, mentions, user)
  """
  @spec replace(struct(), list(), User.t()) :: {:ok, list()} | {:error, term()}
  def replace(content, mentions, %User{} = from_user) do
    with {:ok, _deleted} <- delete_existing(content, from_user),
         {:ok, mentions} <- normalize_mentions(mentions),
         mentions <- reject_self_mentions(content, mentions, from_user),
         {:ok, _inserted} <- insert_mentions(mentions) do
      {:ok, mentions}
    end
  end

  defp insert_mentions([]), do: {:ok, :pass}

  defp insert_mentions(mentions) do
    case Repo.insert_all(Mention, mentions) do
      {_count, _rows} -> {:ok, :pass}
    end
  end

  defp reject_self_mentions(%Comment{}, mentions, _from_user), do: mentions

  defp reject_self_mentions(_content, mentions, %User{id: from_user_id}) do
    Enum.reject(mentions, &(&1.to_user_id == from_user_id))
  end

  defp normalize_mentions(mentions) do
    mentions
    |> Enum.reduce_while({:ok, []}, fn mention, {:ok, acc} ->
      case normalize_mention(mention) do
        {:ok, mention} -> {:cont, {:ok, [mention | acc]}}
        {:error, _reason} = error -> {:halt, error}
      end
    end)
    |> case do
      {:ok, mentions} -> {:ok, Enum.reverse(mentions)}
      error -> error
    end
  end

  defp normalize_mention(%{thread: thread} = mention) when is_atom(thread) do
    case GroupherServer.CMS.artiment_threads_to_atom(thread) do
      {:ok, thread} -> {:ok, %{mention | thread: thread}}
      {:error, _reason} -> {:error, "insert mentions error"}
    end
  end

  defp normalize_mention(%{thread: _thread}), do: {:error, "insert mentions error"}
  defp normalize_mention(mention), do: {:ok, mention}

  defp delete_existing(%Comment{} = comment, %User{} = from_user) do
    from(m in Mention,
      where: m.comment_id == ^comment.id,
      where: m.from_user_id == ^from_user.id
    )
    |> ORM.delete_all(:if_exist)
  end

  defp delete_existing(article, %User{} = from_user) do
    with {:ok, thread} <- thread_of(article) do
      from(m in Mention,
        where: m.article_id == ^article.id,
        where: m.thread == ^thread,
        where: m.from_user_id == ^from_user.id
      )
      |> ORM.delete_all(:if_exist)
    end
  end
end
