defmodule Helper.ORM.Pagi.Page do
  @moduledoc """
  Output page structs for the two pagination contracts.

  Input Params and output Page are intentionally separate types so a response
  cannot be mistaken for a request.

      ORM execution -> Page.Offset or Page.Cursor -> GraphQL response
  """

  defmodule Offset do
    @moduledoc """
    Offset page with an explicit count.

        ORM offset execution -> Page.Offset -> public PageInfo
    """

    @enforce_keys [
      :entries,
      :page,
      :size,
      :total_count,
      :total_pages,
      :has_previous_page,
      :has_next_page
    ]
    defstruct [
      :entries,
      :page,
      :size,
      :total_count,
      :total_pages,
      :has_previous_page,
      :has_next_page
    ]

    @type t :: %__MODULE__{
            entries: list(),
            page: pos_integer(),
            size: pos_integer(),
            total_count: non_neg_integer(),
            total_pages: non_neg_integer(),
            has_previous_page: boolean(),
            has_next_page: boolean()
          }
  end

  defmodule Cursor do
    @moduledoc """
    Forward cursor page without a count.

        ORM cursor execution -> Page.Cursor -> public PageInfo
    """

    @enforce_keys [:entries, :start_cursor, :end_cursor, :has_previous_page, :has_next_page]
    defstruct [:entries, :start_cursor, :end_cursor, :has_previous_page, :has_next_page]

    @type t :: %__MODULE__{
            entries: list(),
            start_cursor: String.t() | nil,
            end_cursor: String.t() | nil,
            has_previous_page: boolean(),
            has_next_page: boolean()
          }
  end

  @type t :: Offset.t() | Cursor.t()

  @doc "Returns the public pagination metadata without exposing Flop internals."
  @spec info(t()) :: map()
  def info(%Offset{} = page) do
    page
    |> Map.take([:page, :size, :total_count, :total_pages, :has_previous_page, :has_next_page])
    |> Map.put(:api, :offset)
  end

  def info(%Cursor{} = page) do
    page
    |> Map.take([:start_cursor, :end_cursor, :has_previous_page, :has_next_page])
    |> Map.put(:api, :cursor)
  end
end
