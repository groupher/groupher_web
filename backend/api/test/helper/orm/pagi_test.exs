defmodule Helper.ORM.PagiTest do
  use ExUnit.Case, async: true

  import Ecto.Query

  alias GroupherServer.ErrorCat
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Config, Order, Page}
  alias GroupherServer.{Pagi}
  alias Pagi.Params

  defmodule Item do
    use Ecto.Schema
    use Flop.Schema

    @flop_options [filterable: [], sortable: [:id], max_limit: 100]

    schema "items" do
      field(:name, :string)
    end
  end

  setup do
    {:ok,
     order: %Order{
       fields: [:id],
       directions: [:desc],
       cursor_fields: [:id]
     },
     query: from(item in "items", select: item)}
  end

  test "invalid page and size are rejected before the database adapter", %{
    query: query,
    order: order
  } do
    assert {:error, %ErrorCat.Error{reason: :page_out_of_range}} =
             ORM.pagi(query, %Params.Offset{page: 0, size: 20}, for: Item, order: order)

    assert {:error, %ErrorCat.Error{reason: :size_out_of_range}} =
             ORM.pagi(query, %Params.Offset{page: 1, size: 0}, for: Item, order: order)

    assert {:error, %ErrorCat.Error{reason: :page_out_of_range}} =
             ORM.pagi(query, %Params.Offset{page: "1", size: 20}, for: Item, order: order)

    assert {:error, %ErrorCat.Error{reason: :size_out_of_range}} =
             ORM.pagi(query, %Params.Offset{page: 1, size: 101}, for: Item, order: order)
  end

  test "deep offset has its own stable reason", %{query: query, order: order} do
    assert {:error, %ErrorCat.Error{reason: :deep_offset_rejected}} =
             ORM.pagi(query, %Params.Offset{page: 10_001, size: 20}, for: Item, order: order)
  end

  test "config context is checked before request page/size", %{query: query, order: order} do
    config = Config.default()

    assert {:error, %ErrorCat.Error{reason: :invalid_config_context}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 0, size: 0, config_revision: nil},
               for: Item,
               order: order,
               config: config
             )

    assert {:error, %ErrorCat.Error{reason: :config_mismatch, details: %{mismatch: :revision}}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 20, config_revision: 9},
               for: Item,
               order: order,
               config: config
             )

    assert {:error, %ErrorCat.Error{reason: :invalid_config_context}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 20},
               for: Item,
               order: order,
               config: config
             )

    assert {:error, %ErrorCat.Error{reason: :invalid_config_context}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 20, config_revision: 0},
               for: Item,
               order: order
             )
  end

  test "the platform default accepts cursor and applies cursor size validation", %{
    query: query,
    order: order
  } do
    assert {:error, %ErrorCat.Error{reason: :size_out_of_range}} =
             ORM.pagi(
               query,
               %Params.Cursor{first: 0, after: nil},
               for: Item,
               order: order
             )
  end

  test "raw config maps never cross the ORM boundary", %{query: query, order: order} do
    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 20},
               for: Item,
               order: order,
               config: %{api: :offset}
             )
  end

  test "a forged execution config cannot raise the platform hard maximum", %{
    query: query,
    order: order
  } do
    config = %Config{
      api: :offset,
      default_size: 20,
      max_size: 10_000,
      revision: 0,
      platform_hard_max: 10_000
    }

    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 101, config_revision: 0},
               for: Item,
               order: order,
               config: config
             )
  end

  test "a parsed but unsupported API has its own stable reason", %{query: query, order: order} do
    config = %Config{Config.default() | api: :stream}

    assert {:error, %ErrorCat.Error{reason: :unsupported_api}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 20},
               for: Item,
               order: order,
               config: config
             )
  end

  test "a missing execution API is an invalid config", %{query: query, order: order} do
    config = %Config{Config.default() | api: nil}

    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 20},
               for: Item,
               order: order,
               config: config
             )
  end

  test "full null ordering directions are accepted" do
    assert {:ok, order} =
             Order.new(%{
               fields: [:id, :name],
               directions: [:desc_nulls_last, :asc_nulls_first],
               cursor_fields: [:id],
               bindings: [:stats],
               projection: [:entry_id]
             })

    assert Order.to_flop(order).order_directions == [:desc_nulls_last, :asc_nulls_first]
  end

  test "a base query with an order is rejected before execution", %{order: order} do
    query = from(item in "items", order_by: [desc: item.id], select: item)

    assert_raise ArgumentError, ~r/Pagi\.Order descriptor must be the only order owner/, fn ->
      ORM.pagi(query, %Params.Offset{page: 1, size: 20}, for: Item, order: order)
    end
  end

  test "an invalid order descriptor is rejected", %{query: query} do
    assert {:error, %ErrorCat.Error{reason: :unsupported_sort}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 1, size: 20},
               for: Item,
               order: %Order{fields: [], directions: [], cursor_fields: []}
             )
  end

  test "unsupported schema metadata and sort fields fail before any SQL", %{
    query: query,
    order: order
  } do
    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             ORM.pagi(query, nil, for: nil, order: order)

    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             ORM.pagi(query, nil, for: String, order: order)

    unsupported = %Order{fields: [:name], directions: [:asc], cursor_fields: [:name]}

    assert {:error, %ErrorCat.Error{reason: :unsupported_sort}} =
             ORM.pagi(query, nil, for: Item, order: unsupported)
  end

  test "Page output has an explicit shape" do
    page = %Page.Offset{
      entries: [],
      page: 1,
      size: 20,
      total_count: 0,
      total_pages: 0,
      has_previous_page: false,
      has_next_page: false
    }

    assert page.total_count == 0
    refute Map.has_key?(page, :total_entries)
  end

  test "validation failures emit zero-query telemetry", %{query: query, order: order} do
    handler_id = "pagi-validation-telemetry-#{System.unique_integer([:positive])}"

    :telemetry.attach(
      handler_id,
      [:groupher, :pagi, :run],
      fn _event, measurements, metadata, pid ->
        send(pid, {:pagi_validation_telemetry, measurements, metadata})
      end,
      self()
    )

    on_exit(fn -> :telemetry.detach(handler_id) end)

    assert {:error, %ErrorCat.Error{reason: :page_out_of_range}} =
             ORM.pagi(
               query,
               %Params.Offset{page: 0, size: 20},
               for: Item,
               order: order,
               resource: :items,
               surface: "items.public"
             )

    assert_receive {:pagi_validation_telemetry,
                    %{
                      query_count: 0,
                      entry_count: 0,
                      db_duration: 0,
                      count_duration: 0
                    },
                    %{
                      resource: :items,
                      surface: "items.public",
                      api: :offset,
                      result: :page_out_of_range
                    }}
  end
end
