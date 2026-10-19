defmodule GroupherServer.Activity.LogRejectionTest do
  use ExUnit.Case, async: true

  test "requires the rejection audit identity fields" do
    resource = %{id: "article-1", thread: :post, community_id: 1}

    assert {:error, %{reason: :invalid_actor}} =
             GroupherServer.Activity.log_rejection(resource, :trashed, [])

    assert {:error, %{reason: :invalid_payload}} =
             GroupherServer.Activity.log_rejection(resource, :trashed, actor: :system)

    assert {:error, %{reason: :invalid_operation_ref}} =
             GroupherServer.Activity.log_rejection(resource, :trashed,
               actor: :system,
               rejection_code: :forbidden
             )
  end
end
