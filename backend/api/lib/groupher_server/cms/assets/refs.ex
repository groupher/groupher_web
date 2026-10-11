defmodule GroupherServer.CMS.Assets.Refs do
  @moduledoc """
  Persistence and projection helpers for Article asset references.

  The write flow mirrors the storage model:

      upload service  ->  community_assets
                         /        |
      article cover --'         billing/counting
      editor block ---->  article_asset_refs

  The upload service owns bytes in object storage. This module records the
  uploaded object's URL/size and projects article usage into queryable rows.
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{CMS, Repo}

  alias CMS.Assets.{Completeness, Persist}
  alias CMS.Articles.Bindings
  alias CMS.Assets.ErrorCat, as: AssetErrorCat
  alias CMS.FrontDesk
  alias CMS.Gate.ErrorCat, as: GateErrorCat

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleAssetRef,
    ArticleDraft,
    Community,
    CommunityAsset,
    DocDraft
  }

  alias Helper.{ORM, T}

  @body_usages ~w(inline attachment embed)a
  @cover_specs [
    %{usage: :cover, asset_key: :cover_asset, asset_id_key: :cover_asset_id},
    %{usage: :cover_dark, asset_key: :cover_asset_dark, asset_id_key: :cover_asset_dark_id}
  ]
  @all_usages ArticleAssetRef.usage_values()

  @doc false
  def draft_refs(body_draft_id) when is_binary(body_draft_id) do
    ArticleAssetRef
    |> where([ref], ref.body_draft_id == ^body_draft_id)
    |> order_by([ref], asc: ref.position, asc: ref.inserted_at, asc: ref.id)
    |> Repo.all()
  end

  @doc false
  def lock_draft_refs(body_draft_id, usage) when is_binary(body_draft_id) do
    ArticleAssetRef
    |> where([ref], ref.body_draft_id == ^body_draft_id and ref.usage == ^usage)
    |> lock("FOR UPDATE")
    |> Repo.all()
  end

  @doc """
  Synchronizes refs for an article using an explicit community boundary.

  The body Draft row is locked while body and cover refs are replaced, so
  concurrent syncs for the same article cannot interleave delete/insert steps.

  ## Examples

      Refs.sync_refs(community, post, %{
        asset_refs: [%{asset_id: asset.id, block_id: "image-1"}],
        cover_asset_id: cover_asset.id,
        cur_user: user
      })
      #=> {:ok, %{body: body_refs, cover: cover_refs}}

  """
  @spec sync_refs(Community.t(), T.article(), map()) :: T.domain_res(term())
  def sync_refs(%Community{id: community_id}, article, attrs) do
    do_sync_refs(community_id, article, attrs)
  end

  @doc """
  Synchronizes refs for an Article using explicit ArticleBinding context.

  This variant keeps article create/update flows concise. If the article is not
  associated with a community, the sync is a no-op.

  ## Examples

      Refs.sync_refs(post, %{asset_refs: [%{asset_id: asset.id}]})
      #=> {:ok, %{body: body_refs, cover: cover_refs}}

      Refs.sync_refs(post, %{asset_refs: []})
      #=> {:ok, :pass}

  """
  @spec sync_refs(T.article(), map()) :: T.domain_res(term())
  def sync_refs(article, attrs) do
    case Bindings.get(article, Map.get(article, :community)) do
      {:ok, %{community: %{id: community_id}}} -> do_sync_refs(community_id, article, attrs)
      {:error, reason} -> {:error, reason}
    end
  end

  @doc "Copies the complete asset-ref projection from one Article version to another."
  @spec copy_refs(T.article(), T.article()) :: T.domain_res(term())
  def copy_refs(source, target) do
    with {:ok, %{community: %{id: target_community_id}}} <-
           Bindings.get(target, Map.get(target, :community)),
         {:ok, source_thread} <- FrontDesk.thread_of(source),
         {:ok, target_thread} <- FrontDesk.thread_of(target),
         true <- source_thread == target_thread,
         {:ok, source_body_id} <- draft_body_id(source),
         {:ok, target_body_id} <- draft_body_id(target) do
      Repo.transaction(fn ->
        {:ok, _} = Completeness.lock_scope(target_community_id)

        ArticleAssetRef
        |> where([ref], ref.body_draft_id == ^target_body_id)
        |> Repo.delete_all()

        source_refs =
          ArticleAssetRef
          |> where([ref], ref.body_draft_id == ^source_body_id)
          |> Repo.all()

        Enum.reduce_while(
          source_refs,
          {:ok, []},
          &copy_ref(&1, &2, target, target_body_id)
        )
        |> case do
          {:ok, copied} -> Enum.reverse(copied)
          {:error, reason} -> Repo.rollback(reason)
        end
      end)
    else
      false ->
        {:error, AssetErrorCat.custom("Article asset refs can only copy within one thread")}

      error ->
        error
    end
  end

  defp copy_ref(source_ref, {:ok, copied}, target, target_body_id) do
    attrs =
      source_ref
      |> Map.from_struct()
      |> Map.take([
        :asset_id,
        :usage,
        :block_id,
        :block_type,
        :position,
        :title,
        :alt,
        :source,
        :meta
      ])
      |> Map.merge(%{
        community_id: target.community_id,
        body_draft_id: target_body_id
      })

    case ORM.create(ArticleAssetRef, attrs) do
      {:ok, ref} -> {:cont, {:ok, [ref | copied]}}
      {:error, reason} -> {:halt, {:error, reason}}
    end
  end

  @doc """
  Removes every Draft- and Revision-owned asset ref for an Article.

  The community asset rows remain intact; only usage projections are deleted.
  This is used by article deletion cleanup.

  ## Examples

      Refs.purge_refs(:post, post.id)
      #=> {:ok, {deleted_count, nil}}

  """
  @spec purge_refs(atom(), T.id()) :: T.domain_res(term())
  def purge_refs(thread, article_id) do
    revision_ids =
      from(revision in CMS.Model.ArticleRevision,
        where: revision.article_id == ^article_id,
        select: revision.id
      )

    body_draft_ids = draft_body_ids(thread, article_id)

    community_ids =
      Repo.all(
        from(binding in ArticleBinding,
          where: binding.article_id == ^article_id,
          select: binding.community_id
        )
      )

    case Repo.get(Article, article_id) do
      %Article{} ->
        Repo.transaction(fn ->
          Enum.each(community_ids, &Completeness.lock_scope/1)

          ArticleAssetRef
          |> where(
            [ref],
            ref.revision_id in subquery(revision_ids) or
              ref.body_draft_id in subquery(body_draft_ids)
          )
          |> Repo.delete_all()
        end)

      nil ->
        {:error, AssetErrorCat.custom("article not found")}
    end
  end

  defp do_sync_refs(community_id, article, attrs) do
    case sync_requested?(attrs) do
      false ->
        {:ok, :pass}

      true ->
        Repo.transaction(fn ->
          with {:ok, _thread} <- FrontDesk.thread_of(article),
               {:ok, _} <- Completeness.lock_scope(community_id),
               {:ok, body_draft_id} <- draft_body_id(article),
               {:ok, _} <- lock_body_draft(body_draft_id),
               base <- base_ref_attrs(community_id, body_draft_id),
               user <- get_attr(attrs, :cur_user),
               {:ok, body_refs} <- sync_body_refs(body_draft_id, base, attrs, user),
               {:ok, cover_refs} <- sync_cover_refs(body_draft_id, base, attrs, user) do
            %{body: body_refs, cover: cover_refs}
          else
            {:error, reason} -> Repo.rollback(reason)
          end
        end)
    end
  end

  defp sync_requested?(attrs) when is_map(attrs) do
    has_attr?(attrs, :asset_refs) or has_attr?(attrs, :cover_asset) or
      has_attr?(attrs, :cover_asset_id) or has_attr?(attrs, :cover_asset_dark) or
      has_attr?(attrs, :cover_asset_dark_id) or removed_cover?(attrs)
  end

  defp sync_requested?(_), do: false

  defp removed_cover?(attrs) do
    has_attr?(attrs, :cover_edit_info) and is_nil(get_attr(attrs, :cover_edit_info))
  end

  defp sync_body_refs(document, base, attrs, user) do
    case has_attr?(attrs, :asset_refs) do
      false ->
        {:ok, []}

      true ->
        inputs = get_attr(attrs, :asset_refs) || []

        with {:ok, usages} <- replace_usages_for_inputs(inputs) do
          replace_refs(document, usages, inputs, base, user, &normalize_body_usage/1)
        end
    end
  end

  defp sync_cover_refs(document, base, attrs, user) do
    attrs
    |> cover_ref_specs()
    |> Enum.reduce_while({:ok, []}, fn {usage, inputs}, {:ok, acc} ->
      case replace_refs(document, [usage], inputs, base, user, &normalize_usage/1) do
        {:ok, refs} -> {:cont, {:ok, [refs | acc]}}
        {:error, _} = error -> {:halt, error}
      end
    end)
    |> case do
      {:ok, refs} -> {:ok, refs |> Enum.reverse() |> List.flatten()}
      error -> error
    end
  end

  defp cover_ref_specs(attrs) do
    cond do
      removed_cover?(attrs) ->
        Enum.map(@cover_specs, &{&1.usage, []})

      true ->
        @cover_specs
        |> Enum.flat_map(fn spec ->
          cover_ref_spec(attrs, spec)
        end)
    end
  end

  defp cover_ref_spec(attrs, spec) do
    if has_attr?(attrs, spec.asset_key) or has_attr?(attrs, spec.asset_id_key) do
      case cover_ref_input(attrs, spec) do
        nil -> [{spec.usage, []}]
        input -> [{spec.usage, [input]}]
      end
    else
      []
    end
  end

  defp cover_ref_input(attrs, spec) do
    asset = get_attr(attrs, spec.asset_key)
    asset_id = get_attr(attrs, spec.asset_id_key)

    if is_nil(asset) and is_nil(asset_id) do
      nil
    else
      %{
        asset: asset,
        asset_id: asset_id,
        usage: spec.usage,
        source: "cover"
      }
    end
  end

  defp replace_refs(
         body_draft_id,
         usages,
         inputs,
         base,
         user,
         normalize_usage_fun
       ) do
    ArticleAssetRef
    |> where([ref], ref.body_draft_id == ^body_draft_id and ref.usage in ^usages)
    |> Repo.delete_all()

    inputs
    |> Enum.with_index()
    |> Enum.reduce_while({:ok, []}, fn {input, index}, {:ok, acc} ->
      case create_ref(input, index, base, user, normalize_usage_fun) do
        {:ok, ref} -> {:cont, {:ok, acc ++ [ref]}}
        {:error, _} = error -> {:halt, error}
      end
    end)
  end

  defp replace_usages_for_inputs([]), do: {:ok, @body_usages}

  defp replace_usages_for_inputs(inputs) do
    inputs
    |> Enum.reduce_while({:ok, MapSet.new(@body_usages)}, fn input, {:ok, usage_set} ->
      case normalize_body_usage(get_attr(input, :usage)) do
        {:ok, usage} -> {:cont, {:ok, MapSet.put(usage_set, usage)}}
        {:error, _} = error -> {:halt, error}
      end
    end)
    |> case do
      {:ok, usage_set} -> {:ok, MapSet.to_list(usage_set)}
      {:error, _} = error -> error
    end
  end

  defp create_ref(input, index, %{community_id: community_id} = base, user, normalize_usage_fun)
       when is_map(input) do
    with {:ok, usage} <- normalize_usage_fun.(get_attr(input, :usage)),
         {:ok, asset} <- resolve_asset(community_id, input, user) do
      attrs =
        base
        |> Map.merge(%{
          asset_id: asset.id,
          usage: usage,
          block_id: get_attr(input, :block_id),
          block_type: get_attr(input, :block_type),
          position: get_attr(input, :position) || index,
          title: get_attr(input, :title),
          alt: get_attr(input, :alt),
          source: get_attr(input, :source),
          meta: get_attr(input, :meta) || %{}
        })

      ORM.create(ArticleAssetRef, attrs)
    end
  end

  defp create_ref(_, _, _, _, _) do
    {:error, AssetErrorCat.custom("asset ref is invalid")}
  end

  defp resolve_asset(community_id, input, user) do
    asset_id = get_attr(input, :asset_id)
    asset_attrs = get_attr(input, :asset)

    cond do
      not is_nil(asset_id) and is_map(asset_attrs) ->
        {:error, AssetErrorCat.custom("asset_id and asset are mutually exclusive")}

      not is_nil(asset_id) ->
        load_active_asset_for_update(community_id, asset_id)

      is_map(asset_attrs) ->
        with {:ok, asset} <-
               Persist.register(%Community{id: community_id}, asset_attrs, user),
             {:ok, asset} <-
               load_active_asset_for_update(community_id, asset.id) do
          {:ok, asset}
        end

      true ->
        {:error, AssetErrorCat.custom("asset is required")}
    end
  end

  defp load_active_asset_for_update(community_id, asset_id) do
    community_id
    |> CommunityAsset.active_query(asset_id)
    |> lock("FOR UPDATE")
    |> Repo.one()
    |> case do
      nil -> {:error, AssetErrorCat.not_exist("asset not found")}
      asset -> {:ok, asset}
    end
  end

  defp lock_body_draft(body_draft_id) do
    CMS.Model.ArticleBodyDraft
    |> where([body], body.id == ^body_draft_id)
    |> lock("FOR UPDATE")
    |> Repo.one()
    |> case do
      nil -> {:error, AssetErrorCat.not_exist("article body draft not found")}
      _body -> {:ok, :pass}
    end
  end

  defp base_ref_attrs(community_id, body_draft_id) do
    %{community_id: community_id, body_draft_id: body_draft_id}
  end

  defp draft_body_id(%{thread: :doc, id: article_id, branch_id: branch_id})
       when is_integer(branch_id) do
    case Repo.get_by(DocDraft, article_id: article_id, branch_id: branch_id) do
      %DocDraft{body_draft_id: body_draft_id} -> {:ok, body_draft_id}
      nil -> {:error, AssetErrorCat.not_exist("article body draft not found")}
    end
  end

  defp draft_body_id(%Article{thread: :doc}) do
    {:error, GateErrorCat.doc_branch_required()}
  end

  defp draft_body_id(%{id: article_id}) when is_binary(article_id) do
    case Repo.get(ArticleDraft, article_id) do
      %ArticleDraft{body_draft_id: body_draft_id} -> {:ok, body_draft_id}
      nil -> {:error, AssetErrorCat.not_exist("article body draft not found")}
    end
  end

  defp draft_body_ids(:doc, article_id) do
    from(draft in DocDraft, where: draft.article_id == ^article_id, select: draft.body_draft_id)
  end

  defp draft_body_ids(_thread, article_id) do
    from(draft in ArticleDraft,
      where: draft.article_id == ^article_id,
      select: draft.body_draft_id
    )
  end

  defp normalize_usage(nil), do: {:ok, :inline}
  defp normalize_usage(usage) when usage in @all_usages, do: {:ok, usage}

  defp normalize_usage(usage) when is_binary(usage) do
    @all_usages
    |> Enum.find(&(to_string(&1) == usage))
    |> case do
      nil -> {:error, AssetErrorCat.custom("asset usage is invalid")}
      usage -> {:ok, usage}
    end
  end

  defp normalize_usage(_), do: {:error, AssetErrorCat.custom("asset usage is invalid")}

  defp normalize_body_usage(usage) do
    with {:ok, usage} <- normalize_usage(usage),
         true <- usage in @body_usages do
      {:ok, usage}
    else
      false -> {:error, AssetErrorCat.custom("asset usage is invalid")}
      {:error, _} = error -> error
    end
  end

  defp has_attr?(map, key) when is_map(map) do
    Map.has_key?(map, key) or Map.has_key?(map, Atom.to_string(key))
  end

  defp get_attr(map, key) when is_map(map) do
    case Map.fetch(map, key) do
      {:ok, value} -> value
      :error -> Map.get(map, Atom.to_string(key))
    end
  end

  defp get_attr(_, _), do: nil
end
