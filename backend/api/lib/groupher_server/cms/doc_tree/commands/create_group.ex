defmodule GroupherServer.CMS.DocTree.Commands.CreateGroup do
  @moduledoc """
  Creates one draft group node.

      CMS.DocTree.create_group -> CreateGroup.execute -> command support -> Persist.create_group
  """
  use GroupherServer.CMS.DocTree.Commands.TreePipeline, operation: :doc_tree_create_group

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

  defp tree_change(community, _target_id, args, _actor), do: Persist.create_group(community, args)
end
