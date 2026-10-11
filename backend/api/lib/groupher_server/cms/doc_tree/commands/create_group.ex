defmodule GroupherServer.CMS.DocTree.Commands.CreateGroup do
  @moduledoc """
  Creates one draft group node.

      CMS.DocTree.create_group -> CreateGroup.execute -> command support -> Persist.create_group
  """
  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}

  def execute(community, args, user \\ nil) do
    if Support.has_option?(args, :command_id) do
      Support.run_tree_command(
        community,
        Map.get(args, :parent_node_id, "root"),
        args,
        Support.actor(args, user),
        :doc_tree_create_group,
        &Persist.create_group(community, &1)
      )
    else
      Support.run_tree_operation(community, args, &Persist.create_group(community, &1))
    end
  end
end
