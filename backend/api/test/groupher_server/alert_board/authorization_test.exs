defmodule GroupherServer.Test.AlertBoard.AuthorizationTest do
  @moduledoc false

  use GroupherServer.TestMate
  alias GroupherServer.{AlertBoard, CMS}

  alias AlertBoard.Authorization
  alias CMS.Model.Community

  test "community scope requires its own review grant" do
    actor = %{
      cur_passport: %{"global" => %{}, "home" => %{"cms" => %{"review.read" => true}}}
    }

    scope = %{kind: :community, community: %Community{slug: "home"}}

    assert {:ok, :pass} = Authorization.authorize(scope, "review.read", actor)
    assert {:error, _} = Authorization.authorize(scope, "review.decide", actor)
  end

  test "platform review grant is checked globally and cannot use a community grant" do
    community_reviewer = %{
      cur_passport: %{"home" => %{"cms" => %{"review.platform.read" => true}}}
    }

    assert {:error, _} =
             Authorization.authorize(
               %{kind: :platform},
               "review.platform.read",
               community_reviewer
             )

    platform_reviewer = %{
      cur_passport: %{"global" => %{"review.platform.read" => true}}
    }

    assert {:ok, :pass} =
             Authorization.authorize(
               %{kind: :platform},
               "review.platform.read",
               platform_reviewer
             )
  end
end
