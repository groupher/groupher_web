defmodule GroupherServer.CMS.DocTree.Commands.MoveNode do
  @moduledoc """
  Moves one mutable tree node to a new parent or index.

      CMS.DocTree.move_node -> MoveNode.execute -> command support -> Persist.move_node
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
        :doc_tree_move_node,
        &Persist.move_node(community, id, &1)
      )
    else
      Support.run_tree_operation(community, args, &Persist.move_node(community, id, &1))
    end
  end
end
