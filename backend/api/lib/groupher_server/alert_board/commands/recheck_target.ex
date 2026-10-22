defmodule GroupherServer.AlertBoard.Commands.RecheckTarget do
  @moduledoc """
  Registers a fresh ReviewBot generation for one canonical current snapshot.

      Board action
        -> CMS Command Receipt
        -> resource + Lifecycle lock
        -> latest scoped ReviewConfig
        -> supersede prior epoch / register Check + Outbox
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.ReviewConfig
  alias CMS.Command.ConfirmationDefinition

  alias CMS.Model.{
    Article,
    ArticleAssetRef,
    ArticleBodySnapshot,
    ArticleBinding,
    ArticlePublic,
    ArticleRevision,
    Comment,
    CommentBody,
    CommunityAsset
  }

  alias ReviewBot.Model.Check

  defmodule Confirmation do
    @moduledoc """
    Recovers check identities created by a target recheck.

        recheckReviewTarget Receipt -> persisted Check rows
    """

    use ConfirmationDefinition,
      operation: :alert_board_recheck_target,
      data_keys: ["check_ids"],
      field_types: %{"check_ids" => {:list, :string}}
  end

  @pipeline operation: :alert_board_recheck_target,
            access: :user,
            target: :target,
            params: [:target, :scope],
            confirmation: Confirmation

  @doc "Registers a recheck using the latest config and a stable target locator."
  @spec execute(map(), map(), struct(), Ecto.UUID.t()) ::
          {:ok, [Check.t()]} | {:error, term()}
  def execute(target, scope, actor, command_id) do
    execute_pipeline(target, scope, actor, command_id)
  end

  receipt_pipeline execute_pipeline(target, scope, actor, command_id) do
    prepare(fn -> prepare(target, scope) end)
    gate(fn prepared -> authorize(prepared, actor) end)
    change(fn prepared -> register(prepared, command_id) end)
    confirm(fn checks -> confirmation(checks) end)
    present(&present_result/1)
  end

  defp prepare(%{kind: :article, id: article_id}, scope) when is_binary(article_id) do
    with {:ok, scope_key} <- scope_key(scope),
         true <- Ecto.UUID.cast(article_id) != :error do
      target_key = "article:#{article_id}"

      {:ok, %{target_key: target_key, scope_key: scope_key, scope: scope, kind: :article},
       target: {:article, article_id},
       params: %{"target_key" => target_key, "scope_key" => scope_key}}
    else
      _ -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp prepare(%{kind: :comment, id: comment_id}, scope)
       when is_integer(comment_id) and comment_id > 0 do
    with {:ok, scope_key} <- scope_key(scope) do
      target_key = "comment:#{comment_id}"

      {:ok, %{target_key: target_key, scope_key: scope_key, scope: scope, kind: :comment},
       target: {:comment, comment_id},
       params: %{"target_key" => target_key, "scope_key" => scope_key}}
    end
  end

  defp prepare(_target, _scope), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  defp register(prepared, command_id) do
    %{target_key: target_key, scope: scope, scope_key: scope_key, kind: kind} = prepared

    with {:ok, target} <- CMS.load_review_target_for_update(target_key, scope_key),
         {:ok, config} <- latest_config(scope, scope_key, kind, target),
         {:ok, content, community_id} <- content_snapshot(target),
         target <-
           Map.merge(target, %{
             trigger: :manual,
             community_id: community_id
           }),
         {:ok, %{checks: checks}} <-
           CMS.register_review_submission(
             target.lifecycle,
             target,
             content,
             [config],
             command_id
           ) do
      {:ok, checks}
    else
      {:error, _reason} = error -> error
      _ -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp latest_config(scope, scope_key, kind, target) do
    community_id =
      case scope do
        %{kind: :community, community: %{id: id}} -> id
        _ -> community_id(target)
      end

    with {:ok, configs} <- AlertBoard.Query.configs_for_target(community_id, kind),
         %ReviewConfig{ruleset_id: ruleset_id} = config when not is_nil(ruleset_id) <-
           Enum.find(configs, &(&1.scope_key == scope_key)) do
      {:ok, config}
    else
      nil -> {:error, AlertBoard.ErrorCat.review_config_not_found()}
      {:error, _reason} = error -> error
      _ -> {:error, AlertBoard.ErrorCat.review_config_invalid()}
    end
  end

  defp content_snapshot(%{kind: :article, target: %Article{thread: thread} = article} = target)
       when thread in [:post, :blog, :changelog] do
    with %ArticlePublic{} = public <- Repo.get(ArticlePublic, article.id),
         %ArticleRevision{} = revision <- Repo.get(ArticleRevision, public.revision_id),
         %ArticleBodySnapshot{} = body <- Repo.get(ArticleBodySnapshot, revision.body_snapshot_id),
         {:ok, community_id} <- binding_community_id(target) do
      {:ok,
       %{
         identity: "article-revision:#{revision.id}",
         body_hash: body.body_hash,
         title: revision.title || "",
         body: body.plain_text || "",
         images: article_images(revision.id)
       }, community_id}
    else
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
      {:error, _reason} = error -> error
    end
  end

  defp content_snapshot(%{kind: :comment, target: %Comment{} = comment} = target) do
    with %CommentBody{} = body <- Repo.get_by(CommentBody, comment_id: comment.id),
         {:ok, community_id} <- binding_community_id(target) do
      {:ok,
       %{
         identity: "comment-body:#{body.version}",
         body_hash: body.body_hash,
         title: "",
         body: body.plain_text || "",
         images: ReviewBot.comment_images(body.json, comment.community_id)
       }, community_id}
    else
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
      {:error, _reason} = error -> error
    end
  end

  defp content_snapshot(_target), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  defp article_images(revision_id) do
    ArticleAssetRef
    |> join(:inner, [ref], asset in CommunityAsset, on: asset.id == ref.asset_id)
    |> where(
      [ref, asset],
      ref.revision_id == ^revision_id and ref.usage == :inline and asset.asset_type == :image and
        asset.status == :active
    )
    |> order_by([ref, _asset], asc: ref.position, asc: ref.id)
    |> select([ref, asset], %{
      asset_id: ref.asset_id,
      immutable_version: fragment("COALESCE(?, ?)", asset.content_hash, asset.url_hash)
    })
    |> Repo.all()
  end

  defp binding_community_id(%{scope_key: "community:" <> community_id}) do
    case Integer.parse(community_id) do
      {id, ""} when id > 0 -> {:ok, id}
      _ -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp binding_community_id(%{kind: :comment, target: %Comment{community_id: id}})
       when is_integer(id) do
    {:ok, id}
  end

  defp binding_community_id(%{kind: :article, target: %Article{id: article_id}}) do
    case Repo.one(
           from(binding in ArticleBinding,
             where: binding.article_id == ^article_id,
             order_by: [asc: binding.community_id],
             select: binding.community_id,
             limit: 1
           )
         ) do
      id when is_integer(id) -> {:ok, id}
      _ -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp binding_community_id(_target), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  defp community_id(%{target: %Comment{community_id: id}}), do: id

  defp community_id(%{target: %Article{id: article_id}}) do
    Repo.one(
      from(binding in ArticleBinding,
        where: binding.article_id == ^article_id,
        order_by: [asc: binding.community_id],
        select: binding.community_id,
        limit: 1
      )
    )
  end

  defp community_id(_target), do: nil

  defp scope_key(%{kind: :platform}), do: {:ok, "platform"}

  defp scope_key(%{kind: :community, community: %{id: id}}) when is_integer(id) do
    {:ok, "community:#{id}"}
  end

  defp scope_key(_scope), do: {:error, AlertBoard.ErrorCat.review_config_invalid()}

  defp authorize(%{scope: scope} = prepared, actor) do
    with {:ok, :pass} <- AlertBoard.Authorization.authorize(scope, decide_action(scope), actor) do
      {:ok, prepared}
    end
  end

  defp decide_action(%{kind: :platform}), do: "review.platform.decide"
  defp decide_action(_scope), do: "review.decide"

  defp present_result(%Confirmation{data: %{"check_ids" => ids}}) do
    checks = Enum.map(ids, &Repo.get(Check, &1))

    if Enum.all?(checks, &match?(%Check{}, &1)) do
      {:ok, checks}
    else
      {:error, CMS.command_result_unavailable()}
    end
  end

  defp present_result(_confirmation) do
    {:error, CMS.command_result_unavailable()}
  end

  defp confirmation(checks) when is_list(checks) do
    {:ok, %Confirmation{data: %{"check_ids" => Enum.map(checks, & &1.id)}}}
  end
end
