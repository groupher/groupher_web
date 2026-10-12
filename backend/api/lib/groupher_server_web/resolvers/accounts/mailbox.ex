defmodule GroupherServerWeb.Resolvers.Accounts.Mailbox do
  @moduledoc """
  Adapts mailbox GraphQL fields to the Accounts mailbox facade.

      GraphQL mailbox field -> this resolver -> Accounts mailbox use case
  """
  import ShortMaps
  alias GroupherServer.Accounts

  def mailbox_status(_root, _args, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_status(cur_user)
  end

  def mark_read(_root, ~m(type ids)a, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_mark_read(type, ids, cur_user)
  end

  def mark_read_all(_root, ~m(type)a, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_mark_read_all(type, cur_user)
  end

  def paged_mailbox_mentions(_root, ~m(filter)a, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_paged_messages(:mention, cur_user, filter)
  end

  def paged_mailbox_notifications(_root, ~m(filter)a, %{context: %{cur_user: cur_user}}) do
    Accounts.mailbox_paged_messages(:notification, cur_user, filter)
  end
end
