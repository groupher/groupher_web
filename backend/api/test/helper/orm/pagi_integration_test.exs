defmodule Helper.ORM.PagiIntegrationTest do
  use GroupherServer.DataCase, async: false

  import Ecto.Query

  alias Helper.ORM
  alias Helper.ORM.Pagi.{Config, Count, Order, Page, Params}

  defmodule Item do
    use Ecto.Schema
    use Flop.Schema

    @flop_options [filterable: [], sortable: [:id], max_limit: 100]

    @primary_key {:id, :integer, autogenerate: false}
    schema "pagi_test_items" do
      field(:name, :string)
    end
  end

  defmodule GenericItem do
    use Ecto.Schema

    @primary_key {:id, :integer, autogenerate: false}
    schema "pagi_test_items" do
      field(:name, :string)
    end
  end

  setup do
    Repo.query!(
      "CREATE TEMP TABLE pagi_test_items (id integer PRIMARY KEY, name text) ON COMMIT DROP"
    )

    Repo.insert_all("pagi_test_items", [
      %{id: 1, name: "one"},
      %{id: 2, name: "two"},
      %{id: 3, name: "three"},
      %{id: 4, name: "four"}
    ])

    :ok
  end

  test "offset runs entries and count through the same Pagi contract" do
    assert {:ok,
            %Page.Offset{
              entries: entries,
              page: 1,
              size: 2,
              total_count: 4,
              total_pages: 2,
              has_previous_page: false,
              has_next_page: true
            }} =
             ORM.pagi(
               from(item in Item, select: item),
               %Params.Offset{page: 1, size: 2},
               for: Item,
               order: order()
             )

    assert Enum.map(entries, & &1.id) == [4, 3]
  end

  test "nil params synthesize the first page from the effective config" do
    config = %Config{
      api: :offset,
      default_size: 2,
      max_size: 10,
      revision: 7,
      platform_hard_max: 100
    }

    assert {:ok, %Page.Offset{entries: entries, page: 1, size: 2, total_count: 4}} =
             ORM.pagi(
               from(item in Item, select: item),
               nil,
               for: Item,
               order: order(),
               config: config
             )

    assert Enum.map(entries, & &1.id) == [4, 3]
  end

  test "the offset count adapter removes list-only clauses" do
    query = from(item in Item, order_by: [desc: item.id], limit: 1, select: item)

    assert {:ok, 4} = Count.run(query)
  end

  test "forward cursor pages use signed opaque cursors and do not count" do
    config = %Config{
      api: :cursor,
      default_size: 2,
      max_size: 10,
      revision: 0,
      platform_hard_max: 100
    }

    assert {:ok, %Page.Cursor{entries: first_entries, end_cursor: end_cursor}} =
             ORM.pagi(
               from(item in Item, select: item),
               %Params.Cursor{first: 2, after: nil, config_revision: 0},
               for: Item,
               order: order(),
               config: config,
               surface: "pagi-test",
               query_fingerprint: "fixture",
               current_key: "test-key"
             )

    assert Enum.map(first_entries, & &1.id) == [4, 3]
    assert is_binary(end_cursor)
    refute end_cursor =~ "id"

    assert {:ok, %Page.Cursor{entries: second_entries, has_next_page: false}} =
             ORM.pagi(
               from(item in Item, select: item),
               %Params.Cursor{first: 2, after: end_cursor, config_revision: 0},
               for: Item,
               order: order(),
               config: config,
               surface: "pagi-test",
               query_fingerprint: "fixture",
               current_key: "test-key"
             )

    assert Enum.map(second_entries, & &1.id) == [2, 1]
  end

  test "emits bounded page telemetry without cursor payloads" do
    handler_id = "pagi-telemetry-#{System.unique_integer([:positive])}"

    :telemetry.attach(
      handler_id,
      [:groupher, :pagi, :run],
      fn _event, measurements, metadata, pid ->
        send(pid, {:pagi_telemetry, measurements, metadata})
      end,
      self()
    )

    on_exit(fn -> :telemetry.detach(handler_id) end)

    assert {:ok, %Page.Offset{entries: entries}} =
             ORM.pagi(
               from(item in Item, select: item),
               %Params.Offset{page: 1, size: 2},
               for: Item,
               order: order(),
               surface: "pagi-test"
             )

    assert length(entries) == 2

    assert_receive {:pagi_telemetry,
                    %{
                      duration: duration,
                      db_duration: db_duration,
                      count_duration: count_duration,
                      query_count: 2,
                      entry_count: 2,
                      result_count: 2
                    },
                    %{
                      api: :offset,
                      surface: "pagi-test",
                      resource: Item,
                      config_revision: 0,
                      result: :success
                    }}

    assert is_integer(duration)
    assert is_integer(db_duration)
    assert is_integer(count_duration)
  end

  test "count and entry database failures have separate stable errors" do
    assert {:error, %{reason: :count_failed}} =
             ORM.pagi(
               from(item in "missing_pagi_table", select: item),
               %Params.Offset{page: 1, size: 2},
               for: Item,
               order: order()
             )

    broken_projection =
      from(item in Item,
        select: %{id: item.id, broken: fragment("missing_pagi_function(?)", item.id)}
      )

    assert {:error, %{reason: :query_failed}} =
             ORM.pagi(
               broken_projection,
               %Params.Offset{page: 1, size: 2},
               for: Item,
               order: order()
             )
  end

  test "generic offset preserves an out-of-range page and returns an empty page" do
    assert {:ok,
            %Page.Offset{
              entries: [],
              page: 3,
              total_count: 4,
              total_pages: 2,
              has_previous_page: true,
              has_next_page: false
            }} =
             ORM.pagi(
               from(item in GenericItem, select: item),
               %Params.Offset{page: 3, size: 2},
               for: GenericItem,
               order: order()
             )
  end

  test "generic offset reports zero pages for an empty collection" do
    Repo.delete_all(GenericItem)

    assert {:ok,
            %Page.Offset{
              entries: [],
              page: 1,
              total_count: 0,
              total_pages: 0,
              has_previous_page: false,
              has_next_page: false
            }} =
             ORM.pagi(
               from(item in GenericItem, select: item),
               %Params.Offset{page: 1, size: 2},
               for: GenericItem,
               order: order()
             )
  end

  test "cursor execution requires an explicit query fingerprint" do
    config = %Config{
      api: :cursor,
      default_size: 2,
      max_size: 10,
      revision: 0,
      platform_hard_max: 100
    }

    assert {:error, %{reason: :invalid_config_context}} =
             ORM.pagi(
               from(item in Item, select: item),
               %Params.Cursor{first: 2, after: nil, config_revision: 0},
               for: Item,
               order: order(),
               config: config,
               surface: "pagi-test"
             )
  end

  defp order do
    %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]}
  end
end
