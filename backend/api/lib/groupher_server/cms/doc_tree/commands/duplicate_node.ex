defmodule GroupherServer.CMS.DocTree.Commands.DuplicateNode do
  @moduledoc """
  Duplicates one mutable tree subtree.

      CMS.DocTree.duplicate_node
        -> DuplicateNode.execute
        -> command support -> Persist.duplicate_node
  """
  use GroupherServer.CMS.DocTree.Commands.TreePipeline, operation: :doc_tree_duplicate_node

  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}

  def execute(community, id, args) do
    execute_tree_receipt(community, id, args, Support.actor(args))
  end

  def execute_internal(community, id, args, internal_actor \\ :operations) do
    execute_tree_internal(community, id, args, internal_actor)
  end

  defp tree_change(community, target_id, args, _actor) do
    Persist.duplicate_node(community, target_id, args)
  end
end
