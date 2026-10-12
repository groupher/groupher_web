defmodule GroupherServer.CMS.ViewTracker.ErrorCat do
  @moduledoc """
  Stable errors owned by the Article ViewTracker boundary.

      ViewTracker transaction / query
        -> ViewTracker.ErrorCat
        -> GraphQL or job error serialization
  """

  use GroupherServer.ErrorCat, namespace: {:cms, :view_tracker}

  error(:unsupported_artiment, code: 6200)
  error(:target_not_found, code: 6201)
  error(:missing_read_purpose, code: 6202)
  error(:invalid_read_purpose, code: 6203)
  error(:invalid_actor_type, code: 6204)
  error(:stats_not_found, code: 6205, retryable: true)
end
