defmodule GroupherServerWeb.Query.PaginationContractTest do
  use ExUnit.Case, async: true

  alias GroupherServerWeb.Schema

  test "PagiInput is a standard GraphQL oneOf input" do
    assert {:ok, %{data: %{"__type" => type}}} =
             Absinthe.run(
               """
               {
                 __type(name: "PagiInput") {
                   name
                   kind
                   isOneOf
                   inputFields { name }
                 }
               }
               """,
               Schema
             )

    assert type["name"] == "PagiInput"
    assert type["kind"] == "INPUT_OBJECT"
    assert type["isOneOf"] == true
    assert Enum.sort(Enum.map(type["inputFields"], & &1["name"])) == ["cursor", "offset"]
  end

  test "page info and resource page types expose the frozen shape" do
    assert {:ok, %{data: %{"__type" => page_info}}} =
             Absinthe.run(
               """
               {
                 __type(name: "PageInfo") {
                   kind
                   fields { name }
                   possibleTypes { name }
                 }
               }
               """,
               Schema
             )

    assert page_info["kind"] == "INTERFACE"

    assert Enum.sort(Enum.map(page_info["fields"], & &1["name"])) == [
             "hasNextPage",
             "hasPreviousPage"
           ]

    assert Enum.sort(Enum.map(page_info["possibleTypes"], & &1["name"])) == [
             "CursorPageInfo",
             "OffsetPageInfo"
           ]

    assert {:ok, %{data: %{"__type" => post_page}}} =
             Absinthe.run(
               """
               {
                 __type(name: "PostPage") {
                   fields { name }
                 }
               }
               """,
               Schema
             )

    assert Enum.sort(Enum.map(post_page["fields"], & &1["name"])) == [
             "entries",
             "pageInfo",
             "pinnedEntries"
           ]
  end

  test "new Article page fields use the PagiInput pipeline" do
    assert {:ok, %{data: %{"__schema" => schema}}} =
             Absinthe.run(
               """
               {
                 __schema {
                   queryType {
                     fields {
                       name
                       args { name type { kind name ofType { kind name } } }
                     }
                   }
                 }
               }
               """,
               Schema
             )

    query_fields = Map.new(schema["queryType"]["fields"], &{&1["name"], &1["args"]})

    for field <- ["postPage", "changelogPage", "commentPage"] do
      args = Map.new(query_fields[field], &{&1["name"], &1["type"]})
      assert Map.has_key?(args, "pagi")
      assert args["pagi"]["name"] == "PagiInput"
      refute Map.has_key?(args, "filter") and args["filter"]["name"] =~ "Paged"
    end
  end

  test "legacy post and changelog fields expose deprecation metadata" do
    assert {:ok, %{data: %{"__schema" => schema}}} =
             Absinthe.run(
               """
               {
                 __schema {
                   queryType {
                     fields(includeDeprecated: true) {
                       name
                       isDeprecated
                       deprecationReason
                     }
                   }
                 }
               }
               """,
               Schema
             )

    fields = Map.new(schema["queryType"]["fields"], &{&1["name"], &1})

    assert fields["pagedPosts"]["isDeprecated"] == true
    assert fields["pagedPosts"]["deprecationReason"] == "Use postPage instead."
    assert fields["pagedChangelogs"]["isDeprecated"] == true
    assert fields["pagedChangelogs"]["deprecationReason"] == "Use changelogPage instead."
    assert fields["pagedBlogs"]["isDeprecated"] == false
    assert fields["pagedDocs"]["isDeprecated"] == false
  end
end
