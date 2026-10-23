defmodule GroupherServer.CMS.Review.Effects do
  @moduledoc """
  Records and delivers post-commit effects for Review visibility changes.

      locked Lifecycle transaction
        -> versioned review.changed Outbox event
        -> Article / Comment Outbox worker
        -> latest token + Gate check
        -> Mention fact refresh + inbox delivery
  """

  import Ecto.Query

  alias GroupherServer.{Accounts, CMS, Messaging, Repo}

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleLifecycle,
    ArticlePublic,
    Author,
    Comment,
    CommentLifecycle,
    Community,
    DocBranchVersion,
    DocLifecycle,
    DocPublic
  }

  alias Accounts.Model.User

  alias CMS.Outbox.Event

  @doc "Replays failed publish projections when a restricted Doc branch becomes public again."
  @spec replay_failed_doc_publish(DocLifecycle.t(), pos_integer()) ::
          {:ok, :pass} | {:error, term()}
  def replay_failed_doc_publish(
        %DocLifecycle{article_id: article_id, branch_id: branch_id},
        community_id
      )
      when is_integer(community_id) do
    with %DocPublic{visible: true, branch_version_id: version_id} <-
           Repo.get_by(DocPublic, article_id: article_id, branch_id: branch_id),
         %DocBranchVersion{revision_id: revision_id} <- Repo.get(DocBranchVersion, version_id),
         %ArticleBinding{} <-
           Repo.get_by(ArticleBinding, article_id: article_id, community_id: community_id),
         {:ok, true} <-
           public_read?(
             Article,
             article_id,
             CMS.Gate.Context.Scope.Doc.public_branch(branch_id),
             community_id
           ) do
      retry_failed_article_projection(article_id, community_id, revision_id)
    else
      _ -> {:ok, :pass}
    end
  end

  def replay_failed_doc_publish(_lifecycle, _community_id), do: {:ok, :pass}

  @doc "Records one durable review visibility event from the caller transaction."
  @spec enqueue(struct(), String.t(), String.t(), String.t(), pos_integer()) ::
          {:ok, Event.t()} | {:error, term()}
  def enqueue(lifecycle, target_key, scope_key, change_key, community_id)
      when is_binary(target_key) and is_binary(scope_key) and is_binary(change_key) and
             is_integer(community_id) do
    with {:ok, attrs} <-
           event_attrs(lifecycle, target_key, scope_key, change_key, community_id),
         {:ok, event} <- CMS.Outbox.send(attrs),
         {:ok, :pass} <-
           replay_failed_article_publish(lifecycle, scope_key, community_id) do
      {:ok, event}
    end
  end

  def enqueue(_lifecycle, _target_key, _scope_key, _change_key, _community_id) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  @doc "Rechecks one committed visibility event and delivers current public mentions."
  @spec deliver(Event.t()) :: {:ok, :pass | :stale | :hidden} | {:error, term()}
  def deliver(%Event{event: event, data: data})
      when event in ["article.review_changed", "comment.review_changed"] and is_map(data) do
    with {:ok, current?} <- current_event?(event, data),
         true <- current? do
      deliver_current(event, data)
    else
      false -> {:ok, :stale}
    end
  end

  def deliver(_event), do: {:error, CMS.ErrorCat.invalid_review_restriction()}

  defp replay_failed_article_publish(
         %ArticleLifecycle{article_id: article_id},
         _scope_key,
         community_id
       ) do
    with %Article{thread: thread} = article <- Repo.get(Article, article_id),
         %ArticleBinding{} <-
           Repo.get_by(ArticleBinding, article_id: article.id, community_id: community_id),
         %ArticlePublic{revision_id: revision_id} <-
           Repo.get_by(ArticlePublic, article_id: article.id),
         {:ok, true} <- public_read?(Article, article.id, article_context(thread), community_id) do
      retry_failed_article_projection(article.id, community_id, revision_id)
    else
      _ -> {:ok, :pass}
    end
  end

  defp replay_failed_article_publish(_lifecycle, _scope_key, _community_id), do: {:ok, :pass}

  defp retry_failed_article_projection(article_id, community_id, revision_id) do
    latest_event =
      from(event in Event,
        where: event.event == "article.projections" and event.resource_id == ^article_id,
        order_by: [desc: event.inserted_at]
      )
      |> Repo.all()
      |> Enum.find(fn event ->
        event.data["community_id"] == community_id and
          event.data["revision_id"] == revision_id
      end)

    case latest_event do
      %Event{status: status} = event when status in [:retrying, :failed] ->
        case CMS.Outbox.send(%{
               event: event.event,
               worker: GroupherServer.Jobs.CMSOutboxArticle,
               resource_type: event.resource_type,
               resource_id: event.resource_id,
               identity: {event.identity_type, event.command_id},
               effect_key: event.effect_key,
               retry_failed: true,
               data: event.data
             }) do
          {:ok, _event} -> {:ok, :pass}
          {:error, _reason} = error -> error
        end

      _ ->
        {:ok, :pass}
    end
  end

  defp deliver_current("article.review_changed", data) do
    with {:ok, %Article{thread: thread} = article} <- load_article(data),
         {:ok, community} <- load_community(data),
         {:ok, true} <-
           public_read?(Article, article.id, article_context(thread), community.id),
         {:ok, _sync_result} <-
           CMS.ArtimentMentions.Store.sync(%{
             id: article.id,
             thread: thread,
             community: community
           }),
         {:ok, recipients} <- CMS.ArtimentMentions.Store.mentioned_user_ids(thread, article.id),
         {:ok, author} <- article_author(article),
         {:ok, mentions} <- article_recipients(recipients, article, author),
         {:ok, _result} <- Messaging.send_mention(article, mentions, author) do
      {:ok, :pass}
    else
      {:ok, false} -> {:ok, :hidden}
      {:error, _reason} = error -> error
    end
  end

  defp deliver_current("comment.review_changed", data) do
    with {:ok, %Comment{} = comment} <- load_comment(data),
         {:ok, community} <- load_community(data),
         {:ok, true} <-
           public_read?(Comment, comment.id, comment_context(comment.thread), community.id),
         {:ok, comment} <- load_comment_body(comment),
         {:ok, _sync_result} <- CMS.ArtimentMentions.Store.sync(comment),
         {:ok, recipients} <- CMS.ArtimentMentions.Store.mentioned_user_ids(:comment, comment.id),
         {:ok, author} <- comment_author(comment),
         {:ok, mentions} <- comment_recipients(recipients, comment, author),
         {:ok, _result} <- Messaging.send_mention(comment, mentions, author),
         {:ok, _notification} <- notify_comment_activity(comment, author) do
      {:ok, :pass}
    else
      {:ok, false} -> {:ok, :hidden}
      {:error, _reason} = error -> error
    end
  end

  defp current_event?("article.review_changed", data) do
    case Repo.get_by(ArticleLifecycle, article_id: data["resource_id"]) do
      %ArticleLifecycle{review_epoch: epoch, review_content_token: token} ->
        {:ok, epoch == data["review_epoch"] and token == data["content_token"]}

      nil ->
        {:ok, false}
    end
  end

  defp current_event?("comment.review_changed", data) do
    case Repo.get_by(CommentLifecycle, comment_id: data["resource_id"]) do
      %CommentLifecycle{review_epoch: epoch, review_content_token: token} ->
        {:ok, epoch == data["review_epoch"] and token == data["content_token"]}

      nil ->
        {:ok, false}
    end
  end

  defp load_article(%{"resource_id" => id}) do
    case Repo.get(Article, id) do
      %Article{} = article -> {:ok, article}
      nil -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp load_article(_data), do: {:error, CMS.ErrorCat.invalid_review_restriction()}

  defp load_comment(%{"resource_id" => id}) do
    case Repo.get(Comment, id) do
      %Comment{} = comment -> {:ok, comment}
      nil -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp load_comment(_data), do: {:error, CMS.ErrorCat.invalid_review_restriction()}

  defp load_community(%{"community_id" => id}) do
    case Repo.get(Community, id) do
      %Community{} = community -> {:ok, community}
      nil -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp load_community(_data), do: {:error, CMS.ErrorCat.invalid_review_restriction()}

  defp load_comment_body(%Comment{} = comment) do
    {:ok, Repo.preload(comment, :body)}
  end

  defp article_author(%Article{author_id: author_id}) do
    case Repo.get(Author, author_id) do
      %Author{user_id: user_id} when is_integer(user_id) ->
        case Repo.get(User, user_id) do
          %User{} = user -> {:ok, user}
          nil -> {:error, CMS.ErrorCat.invalid_review_restriction()}
        end

      _ ->
        {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp comment_author(%Comment{author_id: author_id}) do
    case Repo.get(User, author_id) do
      %User{} = user -> {:ok, user}
      nil -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp notify_comment_activity(%Comment{} = comment, author) do
    {event, key} =
      if is_nil(comment.reply_to_comment_id) do
        {:notify_comment, "review:comment:#{comment.id}:comment"}
      else
        {:notify_reply, "review:comment:#{comment.id}:reply"}
      end

    # Notification delivery belongs here so it shares the current public Gate decision.
    payload =
      case event do
        :notify_comment -> %{comment: comment, from_user: author, delivery_key: key}
        :notify_reply -> %{reply_comment: comment, from_user: author, delivery_key: key}
      end

    CMS.Events.emit(event, payload)
  end

  defp article_recipients(ids, %Article{} = article, %User{id: from_user_id}) do
    case Repo.get(ArticlePublic, article.id) do
      %ArticlePublic{title: title} ->
        now = DateTime.utc_now(:second)

        recipients =
          Enum.map(ids, fn to_user_id ->
            %{
              from_user_id: from_user_id,
              to_user_id: to_user_id,
              title: title,
              article_id: article.id,
              comment_id: nil,
              branch_id: nil,
              thread: article.thread,
              block_linker: [],
              inserted_at: now,
              updated_at: now
            }
          end)

        {:ok, recipients}

      nil ->
        {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp comment_recipients(ids, %Comment{} = comment, %User{id: from_user_id}) do
    case Repo.get(ArticlePublic, comment.article_id) do
      %ArticlePublic{title: title} ->
        now = DateTime.utc_now(:second)

        recipients =
          Enum.map(ids, fn to_user_id ->
            %{
              from_user_id: from_user_id,
              to_user_id: to_user_id,
              title: title,
              article_id: comment.article_id,
              comment_id: comment.id,
              branch_id: comment.branch_id,
              thread: comment.thread,
              block_linker: [],
              inserted_at: now,
              updated_at: now
            }
          end)

        {:ok, recipients}

      nil ->
        {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp public_read?(Article, id, context, community_id) do
    case CMS.Gate.Scope.scope(Article, nil, :read, context) do
      %Ecto.Query{} = query ->
        scoped =
          from(
            [article, gate_article_binding: binding, gate_community: community] in query,
            where:
              article.id == ^id and binding.community_id == ^community_id and
                community.id == ^community_id
          )

        {:ok, Repo.exists?(scoped)}

      _ ->
        {:ok, false}
    end
  end

  defp public_read?(Comment, id, context, community_id) do
    case CMS.Gate.Scope.scope(Comment, nil, :read, context) do
      %Ecto.Query{} = query ->
        article_context = article_context(context.thread)

        visible_articles =
          Article
          |> CMS.Gate.Scope.scope(nil, :read, article_context)
          |> where(
            [gate_article_binding: binding, gate_community: community],
            binding.community_id == ^community_id and community.id == ^community_id
          )
          |> select([article], article.id)

        scoped =
          from(comment in query,
            where:
              comment.id == ^id and comment.community_id == ^community_id and
                comment.article_id in subquery(visible_articles)
          )

        {:ok, Repo.exists?(scoped)}

      _ ->
        {:ok, false}
    end
  end

  defp article_context(:doc), do: CMS.Gate.Context.Scope.Doc.public_main()
  defp article_context(thread), do: CMS.Gate.Context.Scope.Article.public(thread)

  defp comment_context(:doc) do
    CMS.Gate.Context.Scope.Comment.for_thread(:doc, branch_policy: :main)
  end

  defp comment_context(thread), do: CMS.Gate.Context.Scope.Comment.for_thread(thread)

  defp event_attrs(
         %ArticleLifecycle{} = lifecycle,
         target_key,
         scope_key,
         change_key,
         community_id
       ) do
    event_attrs(
      "article.review_changed",
      "article",
      lifecycle.article_id,
      lifecycle,
      target_key,
      scope_key,
      change_key,
      community_id,
      GroupherServer.Jobs.CMSOutboxArticle
    )
  end

  defp event_attrs(
         %CommentLifecycle{} = lifecycle,
         target_key,
         scope_key,
         change_key,
         community_id
       ) do
    event_attrs(
      "comment.review_changed",
      "comment",
      lifecycle.comment_id,
      lifecycle,
      target_key,
      scope_key,
      change_key,
      community_id,
      GroupherServer.Jobs.CMSOutboxComment
    )
  end

  defp event_attrs(_lifecycle, _target_key, _scope_key, _change_key, _community_id) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp event_attrs(
         event,
         resource_type,
         resource_id,
         lifecycle,
         target_key,
         scope_key,
         change_key,
         community_id,
         worker
       ) do
    with {:ok, cache_scope} <- cache_scope(resource_type, resource_id, community_id) do
      {:ok,
       %{
         event: event,
         worker: worker,
         resource_type: resource_type,
         resource_id: resource_id,
         identity: {:workflow, "review:#{target_key}:#{scope_key}"},
         effect_key: "#{lifecycle.review_epoch}:#{lifecycle.review_content_token}:#{change_key}",
         data:
           Map.merge(
             %{
               "target_key" => target_key,
               "resource_id" => to_string(resource_id),
               "scope_key" => scope_key,
               "community_id" => community_id,
               "review_epoch" => lifecycle.review_epoch,
               "content_token" => lifecycle.review_content_token
             },
             cache_scope
           )
       }}
    end
  end

  defp cache_scope("article", article_id, community_id) do
    with %Article{thread: thread} <- Repo.get(Article, article_id),
         %Community{slug: slug} <- Repo.get(Community, community_id),
         %ArticleBinding{inner_id: inner_id} <-
           Repo.get_by(ArticleBinding, article_id: article_id, community_id: community_id) do
      {:ok,
       %{
         "community" => slug,
         "thread" => Atom.to_string(thread),
         "inner_id" => inner_id
       }}
    else
      _ -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  defp cache_scope("comment", comment_id, community_id) do
    with %Comment{article_id: article_id, thread: thread} <- Repo.get(Comment, comment_id),
         %Community{slug: slug} <- Repo.get(Community, community_id),
         %ArticleBinding{inner_id: inner_id} <-
           Repo.get_by(ArticleBinding, article_id: article_id, community_id: community_id) do
      {:ok,
       %{
         "community" => slug,
         "thread" => Atom.to_string(thread),
         "inner_id" => inner_id
       }}
    else
      _ -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end
end
