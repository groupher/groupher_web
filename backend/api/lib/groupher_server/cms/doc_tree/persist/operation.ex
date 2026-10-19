defmodule GroupherServer.CMS.DocTree.Persist.Operation do
  @moduledoc """
  Keeps revision and response-payload helpers for the DocTree mutation workflow.

      TreeMutation workflow after Gate
          |
          +--> branch/lock/base_revision envelope
          |
          +--> Persist callback
          |
          +--> Operation.bump_revision / Operation.payload

  This module keeps the payload and revision helpers used by the tree workflow.
  Gate admission belongs to the Command pipeline. The workflow owns only the
  transaction-scoped tree envelope that follows it.
  """

  alias GroupherServer.CMS

  alias CMS.DocTree.{Query, Revision}
  alias CMS.Model.{Community, DocsSiteState, DocTreeNode}

  def bump_revision(%Community{} = community, %DocsSiteState{} = state, event_count) do
    Revision.bump_tree_draft(community, state,
      staged_event_delta: event_count,
      transaction: false
    )
  end

  def payload(%Community{} = community, %DocsSiteState{} = state, node, affected \\ []) do
    %{
      revision: state.tree_lock_version,
      tree_state: Query.tree_state(community, state),
      node: map_node(node),
      affected_nodes: Enum.map(affected, &Query.to_map/1),
      conflict: false
    }
  end

  defp map_node(nil), do: nil
  defp map_node(%DocTreeNode{} = node), do: Query.to_map(node)
end
