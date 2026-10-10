defmodule GroupherServer.CMS.DocTree.Writer.Operation do
  @moduledoc """
  Keeps revision and response-payload helpers for the DocTree mutation workflow.

      TreeMutation workflow
          |
          +--> branch/Gate/lock/base_revision envelope
          |
          +--> Writer callback
          |
          +--> Operation.bump_revision / Operation.payload

  This module keeps the payload and revision helpers used by the tree workflow.
  Transaction and Gate admission belong to `CMS.DocTree.Workflows.TreeMutation`.
  """

  alias GroupherServer.CMS

  alias CMS.DocTree.{Query, Revision}
  alias CMS.DocTree.Workflows.TreeMutation
  alias CMS.Model.{Community, DocsSiteState, DocTreeNode}

  @doc """
  Compatibility delegate to `TreeMutation.run/3`.

  ## Examples

      Operation.run(community, %{base_revision: 3, actor: user}, fn branch, state ->
        {:ok, Operation.payload(community, state, node)}
      end)
      #=> {:ok, %{revision: 4, conflict: false, node: ..., affected_nodes: [...]}}

      Operation.run(community, %{base_revision: 1, actor: user}, fn branch, state ->
        {:ok, node}
      end)
      #=> {:ok, %{revision: 4, conflict: true, affected_nodes: []}}

  """
  def run(%Community{} = community, args, fun) do
    TreeMutation.run(community, args, fun)
  end

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
