defmodule GroupherServer.CMS.DocTree.Commands.DeleteNode do
  @moduledoc """
  Deletes one draft tree node and records recoverable snapshots.

      CMS.DocTree.delete_node -> DeleteNode.execute -> command support -> Persist.delete_node
  """
  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}

  use CMS.DocTree.Commands.TreePipeline, operation: :doc_tree_delete_node

  def execute(community, id, args) do
    execute_tree_receipt(community, id, args, Support.actor(args))
  end

  def execute_internal(community, id, args, internal_actor \\ :operations),
    do: execute_tree_internal(community, id, args, internal_actor)

  defp tree_change(community, target_id, args, _actor),
    do: Persist.delete_node(community, target_id, args)
end
