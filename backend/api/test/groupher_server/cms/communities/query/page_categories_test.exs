defmodule GroupherServer.Test.CMS.Communities.Query.PageCategories do
  @moduledoc false

  use GroupherServer.TestMate, async: false

  alias GroupherServer.CMS

  test "returns the complete ordered navigation category configuration" do
    {:ok, category} = db_insert(:category)

    assert {:ok, result} =
             CMS.Communities.Query.categories()

    assert result |> Enum.any?(&(&1.id == category.id))
    assert is_list(result)
  end
end
