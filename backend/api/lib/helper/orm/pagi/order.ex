defmodule Helper.ORM.Pagi.Order do
  @moduledoc """
  Domain-owned order descriptor consumed by the Pagi adapter.

  Domain sort resolver -> `%Order{}` -> one Flop/Ecto order application.
  The descriptor carries the complete tie-breaker and never writes an Ecto
  `order_by` itself.
  """

  @directions [
    :asc,
    :desc,
    :asc_nulls_first,
    :asc_nulls_last,
    :desc_nulls_first,
    :desc_nulls_last
  ]

  @enforce_keys [:fields, :directions, :cursor_fields]
  defstruct fields: [], directions: [], cursor_fields: [], bindings: [], projection: []

  @type direction ::
          :asc
          | :desc
          | :asc_nulls_first
          | :asc_nulls_last
          | :desc_nulls_first
          | :desc_nulls_last

  @type t :: %__MODULE__{
          fields: [atom()],
          directions: [direction()],
          cursor_fields: [atom()],
          bindings: [atom()],
          projection: [atom()]
        }

  @doc """
  Builds and validates an order descriptor.

  ## Examples

      Order.new(%{fields: [:inserted_at], directions: [:desc], cursor_fields: [:inserted_at]})
      #=> {:ok, %Order{}}
  """
  @spec new(map()) :: {:ok, t()} | {:error, :invalid_order}
  def new(%{} = attrs) do
    fields = Map.get(attrs, :fields, [])
    directions = Map.get(attrs, :directions, [])
    cursor_fields = Map.get(attrs, :cursor_fields, [])
    bindings = Map.get(attrs, :bindings, [])
    projection = Map.get(attrs, :projection, [])

    if valid_fields?(fields) and valid_directions?(directions) and
         length(fields) == length(directions) and valid_cursor_fields?(cursor_fields, fields) and
         valid_atoms?(bindings) and valid_atoms?(projection) do
      {:ok,
       %__MODULE__{
         fields: fields,
         directions: directions,
         cursor_fields: cursor_fields,
         bindings: bindings,
         projection: projection
       }}
    else
      {:error, :invalid_order}
    end
  end

  def new(_attrs), do: {:error, :invalid_order}

  @doc "Returns the exact ordering inputs expected by Flop."
  @spec to_flop(t()) :: %{order_by: [atom()], order_directions: [direction()], tiebreaker: false}
  def to_flop(%__MODULE__{} = order) do
    %{order_by: order.fields, order_directions: order.directions, tiebreaker: false}
  end

  @doc "Returns a stable, non-sensitive order identity for cursor binding."
  @spec identity(t()) :: map()
  def identity(%__MODULE__{} = order) do
    %{
      "fields" => Enum.map(order.fields, &Atom.to_string/1),
      "directions" => Enum.map(order.directions, &Atom.to_string/1),
      "cursorFields" => Enum.map(order.cursor_fields, &Atom.to_string/1)
    }
  end

  @doc "Returns the supported order directions."
  def directions, do: @directions

  defp valid_fields?(fields), do: valid_atoms?(fields) and fields != []
  defp valid_directions?(directions), do: Enum.all?(directions, &(&1 in @directions))

  defp valid_cursor_fields?(cursor_fields, fields) do
    valid_atoms?(cursor_fields) and cursor_fields != [] and
      Enum.all?(cursor_fields, &(&1 in fields))
  end

  defp valid_atoms?(values), do: is_list(values) and Enum.all?(values, &is_atom/1)
end
