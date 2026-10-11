defmodule GroupherServer.Messaging.ErrorCat do
  @moduledoc """
  Messaging command error catalog.

  Messaging command -> catalog reason -> stable protocol error.
  """

  use GroupherServer.ErrorCat, namespace: {:messaging, :notification}

  error(:invalid_notification_args, code: 6201)
end
