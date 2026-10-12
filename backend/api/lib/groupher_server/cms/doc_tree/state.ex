defmodule GroupherServer.CMS.DocTree.State do
  @moduledoc """
  Owns creation of branch-scoped Docs site state.

  Query modules may read a state, but only this owner may initialize the
  durable row under the global Docs site lock.

      DocTree facade / Commands
        -> DocTree.State
        -> Branch.resolve + global lock
        -> DocsSiteState row
  """

  alias GroupherServer.CMS
  alias CMS.Docs.Branch
  alias CMS.Model.{Community, DocsSiteState}
  alias Helper.{ORM, T, Transaction}

  @doc "Ensures the per-community docs site state exists for a branch."
  @spec ensure_draft_state(Community.t(), keyword() | map()) :: T.domain_res(DocsSiteState.t())
  def ensure_draft_state(%Community{} = community, opts \\ []) do
    ensure_site_state(community, opts)
  end

  @doc "Ensures the branch-scoped Docs site state exists."
  @spec ensure_site_state(Community.t(), keyword() | map()) :: T.domain_res(DocsSiteState.t())
  def ensure_site_state(%Community{} = community, opts \\ []) do
    with {:ok, branch} <- Branch.resolve(community, opts) do
      ensure = fn ->
        case ORM.find_by(DocsSiteState, community_id: community.id, branch_id: branch.id) do
          {:ok, state} ->
            {:ok, state}

          {:error, _} ->
            ORM.create(DocsSiteState, %{community_id: community.id, branch_id: branch.id})
        end
      end

      if option(opts, :lock, true) do
        Transaction.lock_global("docs_site:init:#{community.id}:#{branch.id}", ensure)
      else
        ensure.()
      end
    end
  end

  defp option(opts, key, default) when is_map(opts), do: Map.get(opts, key, default)
  defp option(opts, key, default) when is_list(opts), do: Keyword.get(opts, key, default)
  defp option(_opts, _key, default), do: default
end
