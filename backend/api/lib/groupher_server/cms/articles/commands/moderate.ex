defmodule GroupherServer.CMS.Articles.Commands.Moderate do
  @moduledoc """
  Owns Gate admission for Article moderation state changes.

      moderation command -> canonical Article -> Gate -> moderation write
  """

  alias GroupherServer.CMS
  alias CMS.Articles.{Bindings, Moderation, Query}
  alias CMS.Docs.Store, as: DocStore
  alias CMS.FrontDesk
  alias CMS.Gate.ErrorCat, as: GateErrorCat
  alias CMS.Model.{Article, Community}

  use GroupherServer.CommandPipeline,

    adapter: GroupherServer.CMS.CommandPipelineAdapter
  @spec execute(Ecto.UUID.t(), atom(), map(), struct() | :operations, keyword()) ::
          {:ok, term()} | {:error, term()}
  @pipeline operation: :article_moderate, target: :article_id
  direct_pipeline execute(article_id, state, attrs, actor, opts) do
    gate(fn _candidate -> authorize(article_id, actor, opts) end)

    change(fn {canonical, community, branch_id} ->
      if is_integer(branch_id) do
        Moderation.set_state(canonical, state, attrs,
          branch_id: branch_id,
          community: community
        )
      else
        Moderation.set_state(
          canonical,
          state,
          attrs,
          Keyword.put(opts, :community, community)
        )
      end
    end)
  end

  defp authorize(article_id, actor, opts) do
    case FrontDesk.article(article_id, mode: :internal) do
      {:ok, %Article{thread: :doc} = article} ->
        with {:ok, community} <- resolve_community(opts, article) do
          branch_id = Keyword.get(opts, :branch_id) || main_branch_id(community.id)

          with {:ok, canonical} <-
                 CMS.Gate.check_in_transaction(
                   actor,
                   :moderate,
                   article,
                   community,
                   branch_id
                 ) do
            {:ok, {canonical, community, branch_id}}
          end
        end

      {:ok, %Article{} = article} ->
        with {:ok, community} <- resolve_community(opts, article) do
          with {:ok, canonical} <-
                 CMS.Gate.check_in_transaction(actor, :moderate, article, community) do
            {:ok, {canonical, community, nil}}
          end
        end

      {:error, _} ->
        {:error, GateErrorCat.resource_not_found()}
    end
  end

  defp resolve_community(opts, article) do
    case Keyword.get(opts, :community) do
      %Community{} = community ->
        {:ok, community}

      _ ->
        case Keyword.get(opts, :community_id) do
          community_id when is_integer(community_id) ->
            case Query.community(community_id) do
              %Community{} = community -> {:ok, community}
              _ -> {:error, :article_binding_not_found}
            end

          _ ->
            resolve_branch_community(opts, article)
        end
    end
  end

  defp resolve_branch_community(opts, article) do
    case Keyword.get(opts, :branch_id) do
      branch_id when is_integer(branch_id) ->
        Query.branch_community(branch_id)

      _ ->
        case Bindings.get(article, Map.get(article, :community)) do
          {:ok, %{community: community}} -> {:ok, community}
          {:error, reason} -> {:error, reason}
        end
    end
  end

  defp main_branch_id(community_id) do
    case DocStore.branch(community_id, :main) do
      {:ok, %{id: branch_id}} -> branch_id
      {:error, _} -> nil
    end
  end
end
