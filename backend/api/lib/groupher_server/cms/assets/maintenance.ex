defmodule GroupherServer.CMS.Assets.Maintenance do
  @moduledoc """
  Internal facade for explicit Asset repair and maintenance operations.

      caller -> GroupherServer.CMS.Assets.Maintenance -> result
  """

  alias GroupherServer.CMS

  alias CMS.Assets.{Backfill, Completeness, GC}

  defdelegate backfill(community), to: Backfill, as: :run
  defdelegate backfill(community, opts), to: Backfill, as: :run
  defdelegate complete?(community_id), to: Completeness, as: :completed?
  defdelegate garbage_collection_candidates(community), to: GC, as: :candidates
  defdelegate garbage_collection_candidates(community, opts), to: GC, as: :candidates
end
