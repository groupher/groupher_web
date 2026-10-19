defmodule GroupherServer.CMS.DocTree.Commands.UpdateNode do
  @moduledoc """
  Updates mutable metadata for one draft tree node.

      CMS.DocTree.update_node -> UpdateNode.execute -> command support -> Persist.update_node
  """
  use GroupherServer.CMS.DocTree.Commands.TreePipeline, operation: :doc_tree_update_node

  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}

  def execute(community, id, args) do
    execute_tree_receipt(community, id, args, Support.actor(args))
  end

  def execute_internal(community, id, args, internal_actor \\ :operations) do
    execute_tree_internal(community, id, args, internal_actor)
  end

  defp tree_change(community, target_id, args, _actor) do
    Persist.update_node(community, target_id, args)
  end
end
