defmodule Helper.ORM.Pagi.WindowTest do
  use ExUnit.Case, async: true
  alias GroupherServer.ErrorCat
  alias Helper.ORM.Pagi.{Window, Page}

  @binding %{surface: "search.artiments", order: %{"sort" => "relevance"}, fingerprint: "query-a"}
  defp fetch(offset, size) do
    {:ok, %{entries: Enum.slice(Enum.to_list(1..7), offset, size), total: 7}}
  end

  test "both APIs traverse the same ranked window and bind continuation to the query" do
    assert {:ok, %Page.Offset{entries: [1, 2, 3], total_count: 7, total_pages: 3}} =
             Window.run(%{offset: %{page: 1, size: 3}}, @binding, &fetch/2, max_entries: 1000)

    assert {:ok, %Page.Cursor{entries: [1, 2, 3], end_cursor: cursor, has_next_page: true}} =
             Window.run(%{cursor: %{first: 3}}, @binding, &fetch/2, max_entries: 1000)

    assert {:ok, %Page.Cursor{entries: [4, 5], end_cursor: next}} =
             Window.run(%{cursor: %{first: 2, after: cursor}}, @binding, &fetch/2,
               max_entries: 1000
             )

    assert {:ok, %Page.Cursor{entries: [6, 7], has_next_page: false}} =
             Window.run(%{cursor: %{first: 3, after: next}}, @binding, &fetch/2,
               max_entries: 1000
             )

    assert {:error, %ErrorCat.Error{reason: :cursor_query_mismatch}} =
             Window.run(
               %{cursor: %{first: 3, after: cursor}},
               %{@binding | fingerprint: "query-b"},
               &fetch/2,
               max_entries: 1000
             )

    assert {:error, _} =
             Window.run(%{cursor: %{first: 3, after: "malformed"}}, @binding, &fetch/2,
               max_entries: 1000
             )
  end

  test "the final provider page is clipped to its finite window" do
    assert {:ok,
            %Page.Offset{
              entries: [960, 40],
              total_count: 1000,
              total_pages: 17,
              has_next_page: false
            }} =
             Window.run(
               %{offset: %{page: 17, size: 60}},
               @binding,
               fn offset, size ->
                 {:ok, %{entries: [offset, size], total: 2000}}
               end,
               max_entries: 1000
             )
  end

  test "provider window policy must be explicit and valid" do
    fetch = fn _, _ -> flunk("provider must not be called") end

    for opts <- [[], [max_entries: 0], [max_entries: -1], [max_entries: "1000"]] do
      assert {:error, _} = Window.run(nil, @binding, fetch, opts)
    end
  end

  test "invalid positions are rejected before contacting the provider" do
    fetch = fn _, _ -> flunk("provider must not be called") end

    for input <- [
          %{offset: %{page: 0}},
          %{offset: %{size: 101}},
          %{cursor: %{first: -1}},
          %{offset: %{page: 1001, size: 20}},
          %{page: 1}
        ] do
      assert {:error, _} = Window.run(input, @binding, fetch, max_entries: 1000)
    end
  end
end
