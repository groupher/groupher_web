defmodule GroupherServer.CMS.DocTree.Commands.CreateTab do
  @moduledoc """
  Creates one draft tab node.

      CMS.DocTree.create_tab -> CreateTab.execute -> command support -> Persist.create_tab
  """
  alias GroupherServer.CMS.DocTree.{Commands.Support, Persist}

  def execute(community, args, user \\ nil) do
    if Support.has_option?(args, :command_id) do
      Support.run_tree_command(
        community,
        Map.get(args, :parent_node_id, "root"),
        args,
        Support.actor(args, user),
        :doc_tree_create_tab,
        &Persist.create_tab(community, &1)
      )
    else
      Support.run_tree_operation(community, args, &Persist.create_tab(community, &1))
    end
  end
end
