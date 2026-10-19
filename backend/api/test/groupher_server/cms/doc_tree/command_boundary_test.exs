defmodule GroupherServer.Test.CMS.DocTree.CommandBoundary do
  @moduledoc false

  use ExUnit.Case, async: true

  alias GroupherServer.{CMS, ErrorCat}
  alias CMS.DocTree.Commands.{CreateTab, RestoreTrashItem, UpdateDraft}
  alias CMS.DocTree.Commands.PublishChanges

  test "an explicitly requested tree command cannot fall back to a direct write" do
    assert {:error, %ErrorCat.Error{reason: :command_id_required}} =
             CreateTab.execute(%CMS.Model.Community{id: 1}, %{command_id: nil}, nil)
  end

  test "an explicitly requested document command requires a command id" do
    assert {:error, %ErrorCat.Error{reason: :command_id_required}} =
             UpdateDraft.execute(
               %CMS.Model.Community{id: 1},
               "doc-1",
               %{command_id: nil},
               nil
             )
  end

  test "publish rejects a resolver-shaped request without an actor or command id" do
    assert {:error, %ErrorCat.Error{reason: :command_id_required}} =
             PublishChanges.execute(%CMS.Model.Community{}, %{}, nil, command_id: nil)
  end

  test "trash restore rejects a resolver-shaped request without an actor or command id" do
    assert {:error, %ErrorCat.Error{reason: :command_id_required}} =
             RestoreTrashItem.execute(%CMS.Model.Community{}, "trash-1", %{command_id: nil})
  end

  test "trash restore rejects an explicit nil command id for a non-user actor" do
    assert {:error, %ErrorCat.Error{reason: :command_id_required}} =
             RestoreTrashItem.execute(%CMS.Model.Community{}, "trash-1", %{
               actor: :operations,
               actor_id: Ecto.UUID.generate(),
               command_id: nil
             })
  end
end
