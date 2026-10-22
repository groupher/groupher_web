defmodule GroupherServer.CMS.Review.Effects do
  @moduledoc """
  Records and delivers post-commit effects for Review visibility changes.

      locked Lifecycle transaction
        -> versioned review.changed Outbox event
        -> Article / Comment Outbox worker
        -> latest token + Gate check
        -> Mention fact refresh + inbox delivery
  """

  import Ecto.Query, only: [where: 3]

  alias GroupherServer.{Accounts, CMS, Messaging, Repo}

  alias CMS.Model.{
    Article,
    ArticleLifecycle,
    ArticlePublic,
    Author,
    Comment,
    CommentLifecycle,
    Community
  }

  alias Accounts.Model.User

  alias CMS.Outbox.Event

  @doc "Records one durable review visibility event from the caller transaction."
  @spec enqueue(struct(), String.t(), String.t(), String.t(), pos_integer()) ::
          {:ok, Event.t()} | {:error, term()}
  def enqueue(lifecycle, target_key, scope_key, change_key, community_id)
      when is_binary(target_key) and is_binary(scope_key) and is_binary(change_key) and
             is_integer(community_id) do
    event_attrs(lifecycle, target_key, scope_key, change_key, community_id)
    |> case do
      {:ok, attrs} -> CMS.Outbox.send(attrs)
      {:error, _reason} = error -> error
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

  defp deliver_current("article.review_changed", data) do
    with {:ok, %Article{thread: thread} = article} <- load_article(data),
         {:ok, true} <- public_read?(Article, article.id, article_context(thread)),
         {:ok, community} <- load_community(data),
         {:ok, _sync_result} <-
           CMS.ArtimentMentions.Store.sync(%{id: article.id, thread: thread, community: community}),
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
         {:ok, true} <- public_read?(Comment, comment.id, comment_context(comment.thread)),
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

  defp public_read?(schema, id, context) do
    case CMS.Gate.Scope.scope(schema, nil, :read, context) do
      %Ecto.Query{} = query -> {:ok, Repo.exists?(where(query, [resource], resource.id == ^id))}
      _ -> {:ok, false}
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
    {:ok,
     %{
       event: event,
       worker: worker,
       resource_type: resource_type,
       resource_id: resource_id,
       identity: {:workflow, "review:#{target_key}:#{scope_key}"},
       effect_key: "#{lifecycle.review_epoch}:#{lifecycle.review_content_token}:#{change_key}",
       data: %{
         "target_key" => target_key,
         "resource_id" => to_string(resource_id),
         "scope_key" => scope_key,
         "community_id" => community_id,
         "review_epoch" => lifecycle.review_epoch,
         "content_token" => lifecycle.review_content_token
       }
     }}
  end
end
