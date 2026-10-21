defmodule GroupherServer.CMS.DocTree.Commands.TrashPermanentDeleteConfirmation do
  @moduledoc """
  Confirms a Docs Tree Trash action permanent-delete transition.

      doc_tree_permanently_delete_trash_item -> encode -> Receipt -> decode on retry
  """

  use GroupherServer.CMS.Command.ConfirmationDefinition,
    operation: :doc_tree_permanently_delete_trash_item,
    data_keys: ["command_id", "done"],
    field_types: %{"command_id" => :string, "done" => :boolean}
end
