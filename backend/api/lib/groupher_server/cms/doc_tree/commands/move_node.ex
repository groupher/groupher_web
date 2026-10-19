defmodule GroupherServer.CMS.DocTree.Commands.MoveNode do
  @moduledoc """
  Moves one mutable tree node to a new parent or index.

      CMS.DocTree.move_node -> MoveNode.execute -> command support -> Persist.move_node
  """
  use GroupherServer.CMS.DocTree.Commands.TreePipeline, operation: :doc_tree_move_node

  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}

  def execute(community, id, args) do
    execute_tree_receipt(community, id, args, Support.actor(args))
  end

  def execute_internal(community, id, args, internal_actor \\ :operations) do
    execute_tree_internal(community, id, args, internal_actor)
  end

  defp tree_change(community, target_id, args, _actor) do
    Persist.move_node(community, target_id, args)
  end
end
