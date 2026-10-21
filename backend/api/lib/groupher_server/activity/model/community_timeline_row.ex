defmodule GroupherServer.Activity.Model.CommunityTimelineRow do
  @moduledoc """
  Flop metadata for the heterogeneous Community Activity read projection.
  Rows come from a scoped Ecto UNION; the global record sequence breaks time ties.

      Activity handler queries -> UNION projection -> ORM.Pagi
  """
  use Ecto.Schema
  use Flop.Schema

  @primary_key false
  @flop_options [
    filterable: [],
    sortable: [:occurred_at, :record_sequence],
    pagination_types: [:page, :first]
  ]

  embedded_schema do
    field(:occurred_at, :utc_datetime)
    field(:record_sequence, :integer)
  end
end
