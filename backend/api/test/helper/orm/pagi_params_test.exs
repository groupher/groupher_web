defmodule Helper.ORM.Pagi.ParamsTest do
  use ExUnit.Case, async: true

  alias Helper.ORM.Pagi.Params

  test "omission delegates default selection to the engine" do
    assert {:ok, nil} = Params.from_input(nil)
  end

  test "parses canonical offset and cursor without accepting old page filters" do
    assert {:ok, %Params.Offset{page: 2, size: 3, config_revision: nil}} =
             Params.from_input(%{offset: %{page: 2, size: 3}})

    assert {:ok, %Params.Cursor{first: 3, after: "opaque", config_revision: 2}} =
             Params.from_input(%{cursor: %{first: 3, after: "opaque", config_revision: 2}})

    for input <- [%{}, %{page: 1, size: 3}, %{offset: nil}, %{offset: %{}, cursor: %{}}] do
      assert {:error, _} = Params.from_input(input)
    end
  end
end
