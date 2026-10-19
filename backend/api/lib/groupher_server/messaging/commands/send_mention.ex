defmodule GroupherServer.Messaging.Commands.SendMention do
  @moduledoc """
  Atomically replaces mention rows and rebuilds affected mailbox projections.

      SendMention
          -> Mentions.Persist
          -> Accounts.mailbox_update_status_many_in_transaction/1
          -> commit -> Accounts.mailbox_invalidate_users/1
  """

  use GroupherServer.CommandPipeline

  alias GroupherServer.{Accounts, Messaging}
  alias Accounts.Model.User
  alias Messaging.Mentions.Persist

  @pipeline operation: :messaging_send_mention,
            access: :open,
            target: :content,
            params: [:mentions, :from_user]

  direct_pipeline execute_pipeline(content, mentions, from_user) do
    change(fn _content ->
      case mentions do
        [] ->
          {:ok, %{users: []}}

        _ ->
          with {:ok, mentions} <- Persist.replace(content, mentions, from_user),
               {:ok, users} <-
                 mentions
                 |> Enum.map(& &1.to_user_id)
                 |> Accounts.mailbox_update_status_many_in_transaction() do
            {:ok, %{users: users}}
          end
      end
    end)

    present(fn %{users: users} ->
      _ = Accounts.mailbox_invalidate_users(users)
      {:ok, :pass}
    end)
  end

  @doc """
  Sends mentions for an article or comment.

  ## Examples

      Messaging.Commands.SendMention.run(comment, mentions, user)
  """
  @spec run(struct(), list(), User.t()) :: {:ok, :pass} | {:error, term()}
  def run(content, mentions, %User{} = from_user) do
    execute_pipeline(content, mentions, from_user)
  end
end
