defmodule GroupherServer.CMS.DocTree.Commands.DeleteNode do
  @moduledoc """
  Deletes one draft tree node and records recoverable snapshots.

      CMS.DocTree.delete_node -> DeleteNode.execute -> command support -> Persist.delete_node
  """
  alias GroupherServer.CMS.DocTree.{Commands.Support, Persist}

  def execute(community, id, args) do
    if Support.has_option?(args, :command_id) do
      Support.run_tree_command(
        community,
        id,
        args,
        Support.actor(args),
        :doc_tree_delete_node,
        &Persist.delete_node(community, id, &1)
      )
    else
      Support.run_tree_operation(community, args, &Persist.delete_node(community, id, &1))
    end
  end
end
