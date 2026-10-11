defmodule GroupherServer.Messaging.Notifications do
  @moduledoc """
  Internal facade for Notification reads and persistence.

      caller -> GroupherServer.Messaging.Notifications -> result
  """

  alias __MODULE__.{Persist, Query}

  @doc "Runs `paged` through this capability boundary."
  defdelegate paged(user, filter), to: Query
  @doc "Runs `unread_count` through this capability boundary."
  defdelegate unread_count(user_id), to: Query
  @doc "Runs `unread_counts` through this capability boundary."
  defdelegate unread_counts(user_ids), to: Query
  @doc "Runs `upsert` through this capability boundary."
  defdelegate upsert(attrs, from_user), to: Persist
  @doc "Runs `find_for_revoke` through this capability boundary."
  defdelegate find_for_revoke(attrs, from_user), to: Persist
  @doc "Runs `revoke_rows` through this capability boundary."
  defdelegate revoke_rows(notifications, from_user), to: Persist
  @doc "Runs `valid?` through this capability boundary."
  defdelegate valid?(attrs), to: Persist
end
