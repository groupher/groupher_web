defmodule GroupherServer.CMS.Communities.Tags do
  @moduledoc """
  Internal facade for Community taxonomy queries and statistics.

      caller -> GroupherServer.CMS.Communities.Tags -> result
  """

  alias __MODULE__.{Query, Stats}

  defdelegate inc(article, tag), to: Stats
  defdelegate dec(article, tag), to: Stats
  defdelegate update_many(article, deltas), to: Stats
  defdelegate rebuild(tag), to: Stats
  defdelegate get_stats(tag), to: Stats, as: :get
  defdelegate get_stats(community, thread, slug), to: Stats, as: :get
  defdelegate group_titles(ids), to: Query
  defdelegate groups(filter), to: Query
end
