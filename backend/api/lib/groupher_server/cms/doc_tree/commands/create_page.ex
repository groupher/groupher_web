defmodule GroupherServer.CMS.DocTree.Commands.CreatePage do
  @moduledoc """
  Creates one draft page node and its Draft.

      CMS.DocTree.create_page -> CreatePage.execute -> command support -> Persist.create_page
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
        :doc_tree_create_page,
        &Persist.create_page(community, &1, user)
      )
    else
      Support.run_tree_operation(community, args, &Persist.create_page(community, &1, user))
    end
  end
end
