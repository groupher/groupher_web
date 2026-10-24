defmodule GroupherServer.CMS.Review.Results do
  @moduledoc """
  Applies only current CMS review opinions with resource and Wall facts atomically.

  Business position:

      ReviewBot opinion
        -> CMS locks and validates current target
          -> restriction + AlertWall changes
            -> request marked applied
  """

  import Ecto.Query

  alias GroupherServer.{AlertWall, CMS, Repo}

  alias CMS.Model.{
    ArticleLifecycle,
    ArticlePublic,
    CommentBody,
    CommentLifecycle,
    DocLifecycle,
    DocPublic,
    ReviewRequest
  }

  @doc "Locks the CMS resource, validates its pinned content, and applies the opinion once."
  @spec apply_in_transaction(Ecto.UUID.t(), map()) ::
          {:ok, ReviewRequest.t() | :stale} | {:error, term()}
  def apply_in_transaction(request_id, result) when is_binary(request_id) and is_map(result) do
    with true <- Repo.in_transaction?(),
         %ReviewRequest{} = request <- Repo.get(ReviewRequest, request_id),
         {:ok, context} <- lock_target(request),
         true <- current_content?(request),
         %ReviewRequest{state: :running, superseded_at: nil} <- lock_request(request_id),
         {:ok, completed} <- CMS.Review.Requests.complete_in_transaction(request_id, result),
         {:ok, :pass} <- apply_restrictions(request, context, result),
         {:ok, :pass} <- apply_wall(request, result),
         {:ok, applied} <- CMS.Review.Requests.mark_applied_in_transaction(completed.id) do
      {:ok, applied}
    else
      false -> {:ok, :stale}
      nil -> {:ok, :stale}
      %ReviewRequest{} -> {:ok, :stale}
      {:error, _reason} = error -> error
      _ -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  def apply_in_transaction(_request_id, _result) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp lock_target(%ReviewRequest{target_type: :article} = request) do
    CMS.Review.load_for_update("article:#{request.article_id}", scope_key(request))
  end

  defp lock_target(%ReviewRequest{target_type: :comment} = request) do
    CMS.Review.load_for_update("comment:#{request.comment_id}", scope_key(request))
  end

  defp lock_target(%ReviewRequest{target_type: :doc} = request) do
    CMS.Review.load_for_update(
      "doc:#{request.article_id}:#{request.branch_id}",
      "platform"
    )
  end

  defp lock_target(_request), do: {:error, CMS.ErrorCat.invalid_review_restriction()}

  defp current_content?(%ReviewRequest{target_type: :article} = request) do
    Repo.exists?(
      from(public in ArticlePublic,
        join: lifecycle in ArticleLifecycle,
        on: lifecycle.article_id == public.article_id,
        where:
          public.article_id == ^request.article_id and
            public.revision_id == ^request.article_revision_id and
            lifecycle.state not in [:deleted, :destroy]
      )
    )
  end

  defp current_content?(%ReviewRequest{target_type: :comment} = request) do
    Repo.exists?(
      from(body in CommentBody,
        join: lifecycle in CommentLifecycle,
        on: lifecycle.comment_id == body.comment_id,
        where:
          body.comment_id == ^request.comment_id and
            body.version == ^request.comment_body_version and lifecycle.state == :visible
      )
    )
  end

  defp current_content?(%ReviewRequest{target_type: :doc} = request) do
    Repo.exists?(
      from(public in DocPublic,
        join: lifecycle in DocLifecycle,
        on: lifecycle.article_id == public.article_id and lifecycle.branch_id == public.branch_id,
        where:
          public.article_id == ^request.article_id and public.branch_id == ^request.branch_id and
            public.branch_version_id == ^request.branch_version_id and
            lifecycle.state not in [:deleted, :destroy]
      )
    )
  end

  defp lock_request(request_id) do
    Repo.one(
      from(request in ReviewRequest,
        where: request.id == ^request_id and is_nil(request.superseded_at),
        lock: "FOR UPDATE"
      )
    )
  end

  defp apply_restrictions(request, context, result) do
    with {:ok, active} <- CMS.ReviewRestrictions.active_for(context.lifecycle, context.scope_key),
         {:ok, :pass} <- end_automatic_restrictions(request, context, active),
         {:ok, :pass} <- maybe_apply_restriction(request, context, result) do
      {:ok, :pass}
    end
  end

  defp end_automatic_restrictions(request, context, active) do
    ids =
      active
      |> Enum.reject(&(&1.source == :human))
      |> Enum.map(& &1.id)

    if ids == [] do
      {:ok, :pass}
    else
      CMS.ReviewRestrictions.end_restrictions(
        context.lifecycle,
        context.scope_key,
        ids,
        request.id,
        "superseded_by_current_ai_opinion"
      )
    end
  end

  defp maybe_apply_restriction(request, context, %{"status" => "suspect"}) do
    restriction(request, context, :ai_suspect)
  end

  defp maybe_apply_restriction(request, context, %{"status" => "uncertain"}) do
    restriction(request, context, :awaiting_human)
  end

  defp maybe_apply_restriction(request, context, %{"status" => "clear"}) do
    if request.policy_snapshot["review_mode"] == "human_first" and
         request.policy_snapshot["trigger"] == "publish" do
      restriction(request, context, :awaiting_human)
    else
      {:ok, :pass}
    end
  end

  defp maybe_apply_restriction(_request, _context, _result) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp restriction(request, context, type) do
    CMS.ReviewRestrictions.apply(context.lifecycle, %{
      scope_key: context.scope_key,
      type: type,
      request_id: request.id,
      review_ref: request.review_ref,
      source_ref: "request:#{request.id}:#{type}",
      source: :request,
      applied_at: DateTime.utc_now(:second)
    })
    |> case do
      {:ok, _restriction} -> {:ok, :pass}
      {:error, _reason} = error -> error
    end
  end

  defp apply_wall(request, %{"status" => "suspect"} = result) do
    attrs = wall_attrs(request, result)

    case AlertWall.add_in_transaction(attrs, request.id) do
      {:ok, item} ->
        CMS.ReviewRestrictions.link_item_for_request_in_transaction(request.id, item.id)

      {:error, _reason} = error ->
        error
    end
  end

  defp apply_wall(request, %{"status" => "clear"} = result) do
    attrs = wall_attrs(request, result)

    with {:ok, item} <- AlertWall.replace_ai_opinion_in_transaction(attrs),
         {:ok, :pass} <- maybe_resolve_cleared_item(item, request) do
      {:ok, :pass}
    end
  end

  defp apply_wall(_request, _result), do: {:ok, :pass}

  defp maybe_resolve_cleared_item(:absent, _request), do: {:ok, :pass}

  defp maybe_resolve_cleared_item(item, request) do
    if item.sus_notes == [] and AlertWall.active_report_count(item.id) == 0 do
      case AlertWall.resolve_from_cms_in_transaction(item.id, "ai_clear", request.id) do
        {:ok, _resolved} -> {:ok, :pass}
        {:error, _reason} = error -> error
      end
    else
      {:ok, :pass}
    end
  end

  defp wall_attrs(request, result) do
    %{
      owner: :cms,
      target_type: request.target_type,
      target_id: target_id(request),
      community_id: request.community_id,
      subject_ref: request.review_ref,
      ai_source_ref: request.id,
      sus_notes: result["sus_notes"] || [],
      summary: result["summary"] || ""
    }
  end

  defp target_id(%ReviewRequest{target_type: :doc} = request) do
    "#{request.article_id}:#{request.branch_id}"
  end

  defp target_id(%ReviewRequest{target_type: :article, article_id: article_id}), do: article_id

  defp target_id(%ReviewRequest{target_type: :comment, comment_id: comment_id}) do
    to_string(comment_id)
  end

  defp scope_key(%ReviewRequest{community_id: nil}), do: "platform"
  defp scope_key(%ReviewRequest{community_id: id}), do: "community:#{id}"
end
