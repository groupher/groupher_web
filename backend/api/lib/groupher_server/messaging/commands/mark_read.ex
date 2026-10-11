defmodule GroupherServer.Messaging.Commands.MarkRead do
  @moduledoc """
  Owns the user action that marks selected inbox rows as read.

      Messaging facade
          -> MarkRead command
          -> Inbox.Persist
          -> typed update result
  """

  alias GroupherServer.{Messaging, Accounts}

  alias Accounts.Model.User
  alias Messaging.Inbox.Persist

  @doc """
  Marks selected mention or notification rows as read.

  ## Examples

      Messaging.Commands.MarkRead.run(:mention, ids, user)
  """
  @spec run(:mention | :notification, [term()], User.t()) :: term()
  def run(type, ids, %User{} = user), do: Persist.mark_read(type, ids, user)
end
