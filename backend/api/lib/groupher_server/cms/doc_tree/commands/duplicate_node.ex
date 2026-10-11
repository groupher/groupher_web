defmodule GroupherServer.CMS.DocTree.Commands.DuplicateNode do
  @moduledoc """
  Duplicates one mutable tree subtree.

      CMS.DocTree.duplicate_node
        -> DuplicateNode.execute
        -> command support -> Persist.duplicate_node
  """
  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}

  def execute(community, id, args) do
    if Support.has_option?(args, :command_id) do
      Support.run_tree_command(
        community,
        id,
        args,
        Support.actor(args),
        :doc_tree_duplicate_node,
        &Persist.duplicate_node(community, id, &1)
      )
    else
      Support.run_tree_operation(community, args, &Persist.duplicate_node(community, id, &1))
    end
  end
end
