defmodule GroupherServer.Test.CMS.DocTree.CommandBoundary do
  @moduledoc false

  use ExUnit.Case, async: true

  alias GroupherServer.{CMS, ErrorCat}
  alias CMS.DocTree.Commands.{RestoreTrashItem, Support}
  alias CMS.DocTree.Commands.PublishChanges

  test "an explicitly requested tree command cannot fall back to a direct write" do
    assert {:error, %ErrorCat.Error{reason: :command_id_required}} =
             Support.run_tree_command(
               nil,
               "node-1",
               %{command_id: nil},
               nil,
               :doc_tree_update_node,
               fn _args -> flunk("direct tree execution must not be selected") end
             )
  end

  test "an explicitly requested document command requires a command id" do
    assert {:error, %ErrorCat.Error{reason: :command_id_required}} =
             Support.run_doc_command(
               nil,
               "doc-1",
               nil,
               :doc_update_draft,
               [command_id: nil],
               CMS.DocTree.Commands.NodeDraftConfirmation,
               fn -> flunk("direct document execution must not be selected") end,
               fn value -> value end
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
