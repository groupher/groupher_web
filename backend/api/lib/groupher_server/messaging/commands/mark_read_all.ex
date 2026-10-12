defmodule GroupherServer.Messaging.Commands.MarkReadAll do
  @moduledoc """
  Owns the user action that marks an entire inbox store as read.

      Messaging facade
          -> MarkReadAll command
          -> Inbox.Persist
          -> typed update result
  """

  alias GroupherServer.{Messaging, Accounts}

  alias Accounts.Model.User
  alias Messaging.Inbox.Persist

  @doc """
  Marks every mention or notification row as read for the user.

  ## Examples

      Messaging.Commands.MarkReadAll.run(:notification, user)
  """
  @spec run(:mention | :notification, User.t()) :: term()
  def run(type, %User{} = user), do: Persist.mark_read_all(type, user)
end
