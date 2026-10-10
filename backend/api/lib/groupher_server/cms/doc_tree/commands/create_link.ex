defmodule GroupherServer.CMS.DocTree.Commands.CreateLink do
  @moduledoc """
  Creates one draft external-link node.

      CMS.DocTree.create_link -> CreateLink.execute -> command support -> Persist.create_link
  """
  alias GroupherServer.CMS.DocTree.{Commands.Support, Persist}

  def execute(community, args, user \\ nil) do
    if Support.has_option?(args, :command_id) do
      Support.run_tree_command(
        community,
        Map.get(args, :parent_node_id, "root"),
        args,
        Support.actor(args, user),
        :doc_tree_create_link,
        &Persist.create_link(community, &1)
      )
    else
      Support.run_tree_operation(community, args, &Persist.create_link(community, &1))
    end
  end
end
