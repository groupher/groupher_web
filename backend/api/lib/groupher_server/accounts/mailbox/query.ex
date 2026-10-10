defmodule GroupherServer.Accounts.Mailbox.Query do
  @moduledoc """
  Reads the Accounts-owned embedded mailbox projection.

  This module does not count Messaging rows or mutate authoritative facts; it
  only returns the current embedded status.

      User.mailbox
        -> Mailbox.Query.status/1
        -> Accounts.Mailbox facade
  """

  alias GroupherServer.Accounts.Model.{Embeds, User}

  @default_status Embeds.UserMailbox.default_status()

  @doc """
  Returns the embedded unread status, falling back to the default shape.

  ## Examples

      Accounts.Mailbox.Query.status(user)
  """
  @spec status(User.t()) :: {:ok, map()}
  def status(%User{mailbox: nil}), do: {:ok, @default_status}
  def status(%User{mailbox: mailbox}), do: {:ok, mailbox}
end
