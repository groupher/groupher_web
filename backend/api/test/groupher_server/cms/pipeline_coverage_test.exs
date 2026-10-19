defmodule GroupherServer.CMS.PipelineCoverageTest do
  use ExUnit.Case, async: false

  alias Mix.Tasks.Cms.Pipeline.Coverage

  test "reports every concrete Command pipeline as covered" do
    manifest =
      Coverage.build_manifest([
        GroupherServer.CMS.Articles.Commands.Trash,
        GroupherServer.CMS.Articles.Commands.DiscardDraft,
        GroupherServer.CMS.Articles.Commands.Publish
      ])

    by_module = Map.new(manifest["commands"], &{&1["module"], &1})

    assert by_module["GroupherServer.CMS.Articles.Commands.Trash"]["status"] == "covered"
    assert by_module["GroupherServer.CMS.Articles.Commands.DiscardDraft"]["status"] == "covered"
    assert by_module["GroupherServer.CMS.Articles.Commands.Publish"]["status"] == "covered"

    assert Enum.all?(manifest["commands"], fn command ->
             Enum.all?(command["pipelines"], &is_integer(&1["arity"]))
           end)

    assert manifest["schema_version"] == 3
    assert manifest["totals"] == %{"commands" => 3, "covered" => 3, "uncovered" => 0}
  end

  test "ignores support and confirmation modules without execute exports" do
    manifest =
      Coverage.build_manifest([
        GroupherServer.CMS.Articles.Commands.TrashConfirmation,
        GroupherServer.CMS.Articles.Commands.BindingSupport
      ])

    assert manifest["commands"] == []
    assert manifest["totals"] == %{"commands" => 0, "covered" => 0, "uncovered" => 0}
  end
end
