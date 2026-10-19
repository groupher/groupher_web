defmodule GroupherServer.Test.CMS.Passport.GateActionContract do
  @moduledoc false

  use GroupherServer.TestMate

  alias GroupherServer.CMS.GateAction
  alias Helper.PermissionConfig

  test "the cross-runtime Gate contract matches the complete Passport action registry" do
    requirements = PermissionConfig.action_requirements()

    assert GateAction.all() |> Enum.sort() == requirements |> Map.keys() |> Enum.sort()

    for action <- GateAction.all() do
      assert GateAction.requirement(action) == Map.fetch!(requirements, action)
    end
  end
end
