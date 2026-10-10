defmodule GroupherServer.CMS.DocTree.Projection do
  @moduledoc """
  Public projection owner for DocTree release facts.

      authoritative DocTree events
        -> DocTree.Projection
        -> public doc_tree_nodes
  """

  alias GroupherServer.CMS.DocTree.Publish.PublicProjection

  defdelegate preapply_tree_delete_events(community, branch, events), to: PublicProjection
  defdelegate apply_tree_events(community, branch, events), to: PublicProjection
  defdelegate public_descendants(community, branch, parent_node_id), to: PublicProjection
end
