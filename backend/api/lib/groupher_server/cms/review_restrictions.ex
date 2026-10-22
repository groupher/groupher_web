defmodule GroupherServer.CMS.ReviewRestrictions do
  @moduledoc """
  Persists scope-specific restrictions and refreshes their public projections.

      locked Lifecycle
        -> ReviewRestrictions apply/end
        -> Article/Binding/Doc visibility projection
        -> same CMS transaction
  """

  import Ecto.Query

  alias GroupherServer.{CMS, Repo}

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleLifecycle,
    ArticleReviewRestriction,
    Comment,
    CommentLifecycle,
    CommentReviewRestriction,
    Community,
    DocLifecycle,
    DocBranch,
    DocReviewRestriction
  }

  alias CMS.Review.Effects

  @public_states [:published, :archived]

  @doc """
  Advances the review epoch for a newly committed content snapshot.

  The caller must already hold the resource Lifecycle lock in the current
  transaction. The token is a concurrency identity, not a user-visible version.

  ## Examples

      ReviewRestrictions.advance_snapshot(locked_lifecycle, "sha256:...")
      #=> {:ok, updated_lifecycle} | {:error, reason}
  """
  @spec advance_snapshot(struct(), String.t()) :: {:ok, struct()} | {:error, term()}
  def advance_snapshot(lifecycle, content_token)
      when is_binary(content_token) and content_token != "" do
    with {:ok, :pass} <- require_transaction(),
         {:ok, changeset} <- snapshot_changeset(lifecycle, content_token) do
      Repo.update(changeset)
    else
      {:error, _reason} = error -> error
    end
  end

  def advance_snapshot(_lifecycle, _content_token) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  @doc """
  Apply a persisted ReviewBot or reviewer restriction inside the resource transaction.

  ## Examples

      ReviewRestrictions.apply(lifecycle, %{scope_key: "platform", cause_key: "case:123", ...})
  """
  @spec apply(struct(), map()) :: {:ok, struct()} | {:error, term()}
  def apply(lifecycle, attrs) when is_map(attrs) do
    with {:ok, :pass} <- require_transaction(),
         {:ok, schema} <- restriction_schema(lifecycle),
         {:ok, :pass} <- validate_scope(lifecycle, attrs),
         {:ok, restriction} <- insert_or_get(schema, lifecycle, attrs),
         {:ok, :pass} <- recompute(lifecycle),
         {:ok, _event} <-
           enqueue_visibility_change(
             lifecycle,
             attrs.scope_key,
             "restriction:#{attrs.cause_key}"
           ) do
      {:ok, restriction}
    end
  end

  @doc """
  Ends only the requested active restrictions on a locked lifecycle row.

  ## Examples

      ReviewRestrictions.end_restrictions(lifecycle, "community:12", [restriction_id], operation_ref, "approved")
  """
  @spec end_restrictions(struct(), String.t(), [term()], Ecto.UUID.t(), String.t()) ::
          {:ok, :pass} | {:error, term()}
  def end_restrictions(lifecycle, scope_key, [], operation_ref, reason)
      when is_binary(scope_key) and is_binary(operation_ref) and is_binary(reason) and
             reason != "" do
    with {:ok, :pass} <- require_transaction(),
         {:ok, _schema} <- restriction_schema(lifecycle) do
      {:ok, :pass}
    end
  end

  def end_restrictions(lifecycle, scope_key, ids, operation_ref, reason)
      when is_binary(scope_key) and is_list(ids) and is_binary(operation_ref) and
             is_binary(reason) and reason != "" do
    with {:ok, :pass} <- require_transaction(),
         {:ok, schema} <- restriction_schema(lifecycle),
         {:ok, restrictions} <- load_active(schema, lifecycle, scope_key, ids),
         {:ok, :pass} <- end_rows(restrictions, operation_ref, reason),
         {:ok, :pass} <- recompute(lifecycle),
         {:ok, _event} <-
           enqueue_visibility_change(
             lifecycle,
             scope_key,
             "end:#{operation_ref}:#{reason}:#{Enum.join(ids, ",")}"
           ) do
      {:ok, :pass}
    end
  end

  @doc """
  Returns the locked active restrictions for one Lifecycle and scope.

  ## Examples

      ReviewRestrictions.active_for(locked_lifecycle, "platform")
      #=> {:ok, [%ArticleReviewRestriction{}]} | {:error, reason}
  """
  @spec active_for(struct(), String.t()) :: {:ok, [struct()]} | {:error, term()}
  def active_for(lifecycle, scope_key) when is_binary(scope_key) do
    with {:ok, :pass} <- require_transaction(),
         {:ok, schema} <- restriction_schema(lifecycle) do
      rows =
        schema
        |> where(
          [restriction],
          restriction.lifecycle_id == ^lifecycle.id and restriction.scope_key == ^scope_key and
            is_nil(restriction.ended_at)
        )
        |> order_by([restriction], asc: restriction.id)
        |> lock("FOR UPDATE")
        |> Repo.all()

      {:ok, rows}
    end
  end

  @doc """
  Rebuilds the public projection from lifecycle state and all active restrictions.

  ## Examples

      ReviewRestrictions.recompute(lifecycle)
  """
  @spec recompute(struct()) :: {:ok, :pass} | {:error, term()}
  def recompute(%ArticleLifecycle{} = lifecycle) do
    with {:ok, :pass} <- require_transaction(),
         {:ok, article} <- load_article(lifecycle.article_id),
         {:ok, :pass} <- recompute_article_public(article, lifecycle),
         {:ok, :pass} <- recompute_bindings(article, lifecycle) do
      {:ok, :pass}
    end
  end

  def recompute(%CommentLifecycle{}), do: require_transaction()

  def recompute(%DocLifecycle{} = lifecycle) do
    with {:ok, :pass} <- require_transaction() do
      visible? =
        lifecycle.state in @public_states and
          not active_scope?(DocReviewRestriction, lifecycle.id, "platform")

      case Repo.query(
             "UPDATE cms.doc_publics SET visible = $1 WHERE article_id = $2 AND branch_id = $3",
             [visible?, Ecto.UUID.dump!(lifecycle.article_id), lifecycle.branch_id]
           ) do
        {:ok, _result} -> {:ok, :pass}
        {:error, reason} -> {:error, reason}
      end
    end
  end

  def recompute(_lifecycle), do: {:error, CMS.ErrorCat.invalid_review_restriction()}

  defp require_transaction do
    if Repo.in_transaction?() do
      {:ok, :pass}
    else
      {:error, CMS.ErrorCat.review_transition_requires_transaction()}
    end
  end

  defp enqueue_visibility_change(
         %ArticleLifecycle{article_id: article_id} = lifecycle,
         scope_key,
         key
       ) do
    case Repo.get(Article, article_id) do
      %Article{} ->
        community_ids = article_scope_community_ids(article_id, scope_key)

        if community_ids == [] do
          {:error, CMS.ErrorCat.invalid_review_restriction()}
        else
          Enum.reduce_while(community_ids, {:ok, :pass}, fn community_id, {:ok, :pass} ->
            case Effects.enqueue(
                   lifecycle,
                   "article:#{article_id}",
                   scope_key,
                   "#{key}:community:#{community_id}",
                   community_id
                 ) do
              {:ok, _event} -> {:cont, {:ok, :pass}}
              {:error, reason} -> {:halt, {:error, reason}}
            end
          end)
        end

      nil ->
        {:error, CMS.ErrorCat.lifecycle_not_found()}
    end
  end

  defp enqueue_visibility_change(
         %CommentLifecycle{comment_id: comment_id} = lifecycle,
         scope_key,
         key
       ) do
    case Repo.get(Comment, comment_id) do
      %Comment{community_id: community_id} ->
        Effects.enqueue(
          lifecycle,
          "comment:#{comment_id}",
          scope_key,
          key,
          community_id
        )

      nil ->
        {:error, CMS.ErrorCat.lifecycle_not_found()}
    end
  end

  defp enqueue_visibility_change(
         %DocLifecycle{article_id: article_id, branch_id: branch_id} = lifecycle,
         scope_key,
         key
       ) do
    with %Article{} <- Repo.get(Article, article_id),
         %DocBranch{community_id: community_id} <- Repo.get(DocBranch, branch_id),
         %Community{} = community <- Repo.get(Community, community_id),
         %ArticleBinding{inner_id: inner_id} <-
           Repo.get_by(ArticleBinding, article_id: article_id, community_id: community_id) do
      CMS.Articles.Effects.enqueue(
        "article.visibility_changed",
        "article",
        article_id,
        {:workflow, "review:doc:#{article_id}:#{branch_id}:#{scope_key}"},
        %{
          "community" => community.slug,
          "community_id" => community.id,
          "thread" => "doc",
          "inner_id" => inner_id,
          "branch_id" => branch_id
        },
        effect_key: "#{lifecycle.review_epoch}:#{lifecycle.review_content_token}:#{key}"
      )
      |> case do
        {:ok, event} -> {:ok, event}
        {:error, _reason} = error -> error
      end
    else
      nil -> {:error, CMS.ErrorCat.lifecycle_not_found()}
    end
  end

  defp article_scope_community_ids(_article_id, "community:" <> id) do
    case Integer.parse(id) do
      {community_id, ""} -> [community_id]
      _ -> []
    end
  end

  defp article_scope_community_ids(article_id, "platform") do
    Repo.all(
      from(binding in ArticleBinding,
        where: binding.article_id == ^article_id,
        select: binding.community_id,
        order_by: binding.community_id
      )
    )
  end

  defp article_scope_community_ids(_article_id, _scope), do: []

  defp restriction_schema(%ArticleLifecycle{}), do: {:ok, ArticleReviewRestriction}
  defp restriction_schema(%CommentLifecycle{}), do: {:ok, CommentReviewRestriction}
  defp restriction_schema(%DocLifecycle{}), do: {:ok, DocReviewRestriction}
  defp restriction_schema(_lifecycle), do: {:error, CMS.ErrorCat.invalid_review_restriction()}

  defp validate_scope(%DocLifecycle{}, %{scope_key: "platform"}), do: {:ok, :pass}

  defp validate_scope(%DocLifecycle{}, _attrs) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp validate_scope(%ArticleLifecycle{article_id: article_id}, %{scope_key: "platform"}) do
    if Repo.get(Article, article_id) do
      {:ok, :pass}
    else
      {:error, CMS.ErrorCat.lifecycle_not_found()}
    end
  end

  defp validate_scope(%ArticleLifecycle{article_id: article_id}, %{scope_key: scope_key})
       when is_binary(scope_key) do
    with ["community", community_id] <- String.split(scope_key, ":", parts: 2),
         {community_id, ""} <- Integer.parse(community_id),
         true <-
           Repo.exists?(
             from(binding in ArticleBinding,
               where: binding.article_id == ^article_id and binding.community_id == ^community_id
             )
           ) do
      {:ok, :pass}
    else
      _ -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp validate_scope(%CommentLifecycle{comment_id: comment_id}, %{scope_key: "platform"}) do
    if Repo.get(Comment, comment_id) do
      {:ok, :pass}
    else
      {:error, CMS.ErrorCat.lifecycle_not_found()}
    end
  end

  defp validate_scope(%CommentLifecycle{comment_id: comment_id}, %{scope_key: scope_key})
       when is_binary(scope_key) do
    with %Comment{community_id: community_id} <- Repo.get(Comment, comment_id),
         true <- scope_key == "community:#{community_id}" do
      {:ok, :pass}
    else
      _ -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp validate_scope(_lifecycle, _attrs) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp insert_or_get(schema, lifecycle, attrs) do
    attrs =
      attrs
      |> Map.put(:lifecycle_id, lifecycle.id)
      |> Map.put_new(:applied_at, DateTime.utc_now(:second))

    changeset = restriction_changeset(schema, attrs)

    case Repo.insert(changeset, mode: :savepoint) do
      {:ok, restriction} -> {:ok, restriction}
      {:error, changeset} -> recover_active(schema, lifecycle.id, attrs, changeset)
    end
  end

  defp recover_active(schema, lifecycle_id, attrs, changeset) do
    query =
      from(restriction in schema,
        where:
          restriction.lifecycle_id == ^lifecycle_id and
            restriction.scope_key == ^attrs.scope_key and
            restriction.cause_key == ^attrs.cause_key and is_nil(restriction.ended_at)
      )

    case Repo.one(query) do
      %{content_token: token, kind: kind} = restriction
      when token == attrs.content_token and kind == attrs.kind ->
        {:ok, restriction}

      %{} ->
        {:error, CMS.ErrorCat.lifecycle_state_conflict()}

      nil ->
        {:error, changeset}
    end
  end

  defp load_active(schema, lifecycle, scope_key, ids) do
    restrictions =
      schema
      |> where(
        [restriction],
        restriction.lifecycle_id == ^lifecycle.id and restriction.scope_key == ^scope_key and
          restriction.id in ^ids and is_nil(restriction.ended_at)
      )
      |> order_by([restriction], asc: restriction.id)
      |> lock("FOR UPDATE")
      |> Repo.all()

    if length(restrictions) == length(Enum.uniq(ids)) and ids != [] do
      {:ok, restrictions}
    else
      {:error, CMS.ErrorCat.review_restriction_not_found()}
    end
  end

  defp end_rows(restrictions, operation_ref, reason) do
    Enum.reduce_while(restrictions, {:ok, :pass}, fn restriction, {:ok, :pass} ->
      now = DateTime.utc_now(:second)

      changeset = restriction_end_changeset(restriction, operation_ref, reason, now)

      case Repo.update(changeset) do
        {:ok, _updated} -> {:cont, {:ok, :pass}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
  end

  defp snapshot_changeset(%ArticleLifecycle{} = lifecycle, content_token) do
    {:ok,
     ArticleLifecycle.changeset(lifecycle, %{
       review_content_token: content_token,
       review_epoch: lifecycle.review_epoch + 1
     })}
  end

  defp snapshot_changeset(%CommentLifecycle{} = lifecycle, content_token) do
    {:ok,
     CommentLifecycle.changeset(lifecycle, %{
       review_content_token: content_token,
       review_epoch: lifecycle.review_epoch + 1
     })}
  end

  defp snapshot_changeset(%DocLifecycle{} = lifecycle, content_token) do
    {:ok,
     DocLifecycle.changeset(lifecycle, %{
       review_content_token: content_token,
       review_epoch: lifecycle.review_epoch + 1
     })}
  end

  defp snapshot_changeset(_lifecycle, _content_token) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp restriction_changeset(ArticleReviewRestriction, attrs) do
    ArticleReviewRestriction.changeset(%ArticleReviewRestriction{}, attrs)
  end

  defp restriction_changeset(CommentReviewRestriction, attrs) do
    CommentReviewRestriction.changeset(%CommentReviewRestriction{}, attrs)
  end

  defp restriction_changeset(DocReviewRestriction, attrs) do
    DocReviewRestriction.changeset(%DocReviewRestriction{}, attrs)
  end

  defp restriction_end_changeset(
         %ArticleReviewRestriction{} = restriction,
         operation_ref,
         reason,
         now
       ) do
    ArticleReviewRestriction.changeset(restriction, %{
      ended_at: now,
      ended_by_operation_ref: operation_ref,
      end_reason: reason,
      version: restriction.version + 1
    })
  end

  defp restriction_end_changeset(
         %CommentReviewRestriction{} = restriction,
         operation_ref,
         reason,
         now
       ) do
    CommentReviewRestriction.changeset(restriction, %{
      ended_at: now,
      ended_by_operation_ref: operation_ref,
      end_reason: reason,
      version: restriction.version + 1
    })
  end

  defp restriction_end_changeset(
         %DocReviewRestriction{} = restriction,
         operation_ref,
         reason,
         now
       ) do
    DocReviewRestriction.changeset(restriction, %{
      ended_at: now,
      ended_by_operation_ref: operation_ref,
      end_reason: reason,
      version: restriction.version + 1
    })
  end

  defp recompute_article_public(article, lifecycle) do
    visible? =
      lifecycle.state in @public_states and
        not active_scope?(ArticleReviewRestriction, lifecycle.id, "platform")

    case Repo.query("UPDATE cms.article_publics SET visible = $1 WHERE article_id = $2", [
           visible?,
           Ecto.UUID.dump!(article.id)
         ]) do
      {:ok, _result} -> {:ok, :pass}
      {:error, reason} -> {:error, reason}
    end
  end

  defp recompute_bindings(article, lifecycle) do
    base_visible? = lifecycle.state in @public_states

    case Repo.query(
           """
           UPDATE cms.article_bindings AS binding
           SET visible = $1
             AND NOT EXISTS (
               SELECT 1
               FROM cms.article_review_restrictions AS restriction
               WHERE restriction.lifecycle_id = $2
                 AND restriction.ended_at IS NULL
                 AND restriction.scope_key IN (
                   'platform', 'community:' || binding.community_id::text
                 )
             )
           WHERE binding.article_id = $3
           """,
           [base_visible?, lifecycle.id, Ecto.UUID.dump!(article.id)]
         ) do
      {:ok, _result} -> {:ok, :pass}
      {:error, reason} -> {:error, reason}
    end
  end

  defp active_scope?(schema, lifecycle_id, scope_key) do
    Repo.exists?(
      from(restriction in schema,
        where:
          restriction.lifecycle_id == ^lifecycle_id and restriction.scope_key == ^scope_key and
            is_nil(restriction.ended_at)
      )
    )
  end

  defp load_article(article_id) do
    case Repo.get(Article, article_id) do
      %Article{} = article -> {:ok, article}
      nil -> {:error, CMS.ErrorCat.lifecycle_not_found()}
    end
  end
end
