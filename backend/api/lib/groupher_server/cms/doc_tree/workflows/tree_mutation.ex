defmodule GroupherServer.CMS.DocTree.Workflows.TreeMutation do
  @moduledoc """
  Owns the transaction-scoped envelope for one draft Docs Tree mutation.

  User Commands select the action and Receipt identity; this workflow owns the
  branch resolution, advisory lock, state initialization, and `base_revision`
  check after the Command gate stage has admitted the write.

  `Persist.Operation` owns revision and payload helpers for the tree workflow
  callers. Keeping this boundary explicit prevents node persistence helpers from being
  mistaken for transaction owners and gives the later Persist split one stable
  entry point.

      DocTree Command
          -> TreeMutation workflow
          -> branch lock + revision check after Gate
          -> Persist callback
          -> Receipt confirmation
  """

  alias GroupherServer.{CMS, Repo}
  alias CMS.ErrorCat

  alias CMS.Docs.Branch
  alias CMS.DocTree.{Query, State}
  alias CMS.Model.{Community, DocsSiteState}
  alias Helper.ORM.AdvisoryLock

  @doc "Runs the tree envelope after the Command gate stage admitted the Community."
  def run_after_gate(%Community{} = community, args, callback)
      when is_function(callback, 2) do
    with true <- Repo.in_transaction?() || {:error, :pipeline_transaction_required},
         {:ok, branch} <- Branch.resolve(community, args) do
      with {:ok, :acquired} <-
             AdvisoryLock.acquire!("doc_tree:#{community.id}:#{branch.id}"),
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
