defmodule GroupherServer.Messaging.Commands.MarkReadAll do
  @moduledoc """
  Owns the user action that marks an entire inbox store as read.

      Messaging facade
          -> MarkReadAll command
          -> Inbox.Persist
          -> typed update result
  """

  alias GroupherServer.Messaging

  alias Messaging.Inbox.Persist

  use GroupherServer.CommandPipeline

  @pipeline operation: :messaging_mark_read_all, access: :open, target: :user, params: [:type]

  direct_pipeline run(type, user) do
    change(fn _user -> Persist.mark_read_all(type, user) end)
  end

  @doc """
  Marks every mention or notification row as read for the user.

  ## Examples

      Messaging.Commands.MarkReadAll.run(:notification, user)
  """
end
