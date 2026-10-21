defmodule GroupherServer.Messaging.Mentions do
  @moduledoc """
  Internal facade for Mention reads and persistence.

      caller -> GroupherServer.Messaging.Mentions -> result
  """

  alias __MODULE__.{Persist, Query}

  @doc "Runs `paged` through this capability boundary."
  defdelegate paged(user, filter, pagi), to: Query
  @doc "Runs `unread_count` through this capability boundary."
  defdelegate unread_count(user_id), to: Query
  @doc "Runs `unread_counts` through this capability boundary."
  defdelegate unread_counts(user_ids), to: Query
  @doc "Runs `replace` through this capability boundary."
  defdelegate replace(content, mentions, from_user), to: Persist
end
