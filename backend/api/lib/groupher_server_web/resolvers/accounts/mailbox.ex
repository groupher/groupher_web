defmodule GroupherServerWeb.Resolvers.Accounts.Mailbox do
  @moduledoc """
  Adapts mailbox GraphQL fields to the Accounts mailbox facade.

      GraphQL mailbox field -> this resolver -> Accounts mailbox use case
  """
  import ShortMaps
  alias GroupherServer.Accounts
  alias Helper.ORM.Pagi.Params

  def mailbox_status(_root, _args, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_status(cur_user)
  end

  def mark_read(_root, ~m(type ids)a, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_mark_read(type, ids, cur_user)
  end

  def mark_read_all(_root, ~m(type)a, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_mark_read_all(type, cur_user)
  end

  def paged_mailbox_mentions(_root, args, %{context: %{cur_user: cur_user}}) do
    with {:ok, pagi} <- Params.from_input(Map.get(args, :pagi)) do
      Accounts.mailbox_paged_messages(:mention, cur_user, Map.get(args, :filter) || %{}, pagi)
    end
  end

  def paged_mailbox_notifications(_root, args, %{context: %{cur_user: cur_user}}) do
    with {:ok, pagi} <- Params.from_input(Map.get(args, :pagi)) do
      Accounts.mailbox_paged_messages(
        :notification,
        cur_user,
        Map.get(args, :filter) || %{},
        pagi
      )
    end
  end
end
