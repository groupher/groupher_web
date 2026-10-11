defmodule GroupherServer.CMS.Communities.Subscribers do
  @moduledoc """
  Internal facade for Community subscriber queries.

      caller -> GroupherServer.CMS.Communities.Subscribers -> result
  """

  alias __MODULE__.Query

  defdelegate page(community, filter), to: Query
  defdelegate page(community, filter, user), to: Query
end
