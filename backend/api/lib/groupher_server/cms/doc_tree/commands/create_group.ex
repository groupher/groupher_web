defmodule GroupherServer.CMS.DocTree.Commands.CreateGroup do
  @moduledoc """
  Creates one draft group node.

      CMS.DocTree.create_group -> CreateGroup.execute -> command support -> Writer.create_group
  """
  alias GroupherServer.CMS.DocTree.{Commands.Support, Writer}

  def execute(community, args, user \\ nil) do
    if Support.has_option?(args, :command_id) do
      Support.run_tree_command(
        community,
        Map.get(args, :parent_node_id, "root"),
        args,
        Support.actor(args, user),
        :doc_tree_create_group,
        &Writer.create_group(community, &1)
      )
    else
      Support.run_tree_operation(community, args, &Writer.create_group(community, &1))
    end
  end
end
