defmodule GroupherServer.CMS.DocTree.Commands.CreatePage do
  @moduledoc """
  Creates one draft page node and its Draft.

      CMS.DocTree.create_page -> CreatePage.execute -> command support -> Persist.create_page
  """
  use GroupherServer.CMS.DocTree.Commands.TreePipeline, operation: :doc_tree_create_page

  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}

  def execute(community, args, user) do
    execute_tree_receipt(
      community,
      Map.get(args, :parent_node_id, "root"),
      args,
      Support.actor(args, user)
    )
  end

  def execute_internal(community, args, internal_actor \\ :operations) do
    execute_tree_internal(
      community,
      Map.get(args, :parent_node_id, "root"),
      args,
      internal_actor
    )
  end

  defp tree_change(community, _target_id, args, actor) do
    Persist.create_page(community, args, actor)
  end
end
