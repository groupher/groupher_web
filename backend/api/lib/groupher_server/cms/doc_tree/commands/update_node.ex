defmodule GroupherServer.CMS.DocTree.Commands.UpdateNode do
  @moduledoc """
  Updates mutable metadata for one draft tree node.

      CMS.DocTree.update_node -> UpdateNode.execute -> command support -> Persist.update_node
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
        :doc_tree_update_node,
        &Persist.update_node(community, id, &1)
      )
    else
      Support.run_tree_operation(community, args, &Persist.update_node(community, id, &1))
    end
  end
end
