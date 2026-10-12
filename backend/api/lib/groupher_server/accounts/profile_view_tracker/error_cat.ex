defmodule GroupherServer.Accounts.ProfileViewTracker.ErrorCat do
  @moduledoc """
  Stable errors owned by the Profile ViewTracker boundary.

      tracker validation or transaction -> ErrorCat -> stable GraphQL error
  """

  use GroupherServer.ErrorCat, namespace: {:account, :profile_view_tracker}

  error(:target_not_found, code: 6250)
  error(:missing_read_purpose, code: 6251)
  error(:invalid_read_purpose, code: 6252)
  error(:invalid_actor_type, code: 6253)
  error(:counter_not_found, code: 6254, retryable: true)
end
