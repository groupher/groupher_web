defmodule GroupherServer.CMS.DocTree.Workflows.TreeMutation do
  @moduledoc """
  Owns the transaction-scoped envelope for one draft Docs Tree mutation.

  User Commands select the action and Receipt identity; this workflow owns the
  branch resolution, advisory lock, Gate admission, state initialization, and
  `base_revision` check before delegating node-specific work to Persist primitives.

  `Persist.Operation` owns revision and payload helpers for the tree workflow
  callers. Keeping this boundary explicit prevents node persistence helpers from being
  mistaken for transaction owners and gives the later Persist split one stable
  entry point.

      DocTree Command
          -> TreeMutation workflow
          -> Gate + branch lock + revision check
          -> Persist callback
          -> Receipt confirmation
  """

  alias GroupherServer.CMS
  alias CMS.ErrorCat

  alias CMS.Docs.Branch
  alias CMS.DocTree.{Query, State}
  alias CMS.Model.{Community, DocsSiteState}
  alias Helper.Transaction

  @doc "Runs one tree mutation under the canonical Docs Tree write envelope."
  def run(%Community{} = community, args, callback) when is_function(callback, 2) do
    actor = Map.get(args, :actor, :operations)

    with {:ok, branch} <- Branch.resolve(community, args) do
      Transaction.lock_global("doc_tree:#{community.id}:#{branch.id}", fn ->
        with {:ok, _canonical} <- CMS.Gate.access_check(actor, :manage_docs, community),
             {:ok, _site_state} <-
               State.ensure_site_state(community, branch_id: branch.id),
             {:ok, state} <-
               State.ensure_draft_state(community, branch_id: branch.id),
             {:ok, _} <- revision_check(state, Map.get(args, :base_revision)) do
          callback.(branch, state)
        else
          {:conflict, state} ->
            {:ok,
             %{
               revision: state.tree_lock_version,
               tree_state: Query.tree_state(community, state),
               conflict: true,
               affected_nodes: []
             }}

          error ->
            error
        end
      end)
    end
  end

  defp revision_check(%DocsSiteState{}, nil) do
    {:error, ErrorCat.custom("base_revision is required")}
  end

  defp revision_check(%DocsSiteState{} = state, revision)
       when revision == state.tree_lock_version do
    {:ok, :pass}
  end

  defp revision_check(%DocsSiteState{} = state, _revision), do: {:conflict, state}
end
