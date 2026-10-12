defmodule GroupherServer.CMS.Outbox.Workflow.Comment do
  @moduledoc """
  Delivers public cache cleanup intents created by Comment writes.

  Business position:

      committed Comment outbox event
        -> Comment.Cleanup worker
        -> cache purge or comment effects
  """

  alias GroupherServer.Accounts

  alias GroupherServer.{CMS, Jobs, Repo}
  alias CMS.Outbox
  alias CMS.Model.{Article, Comment, Community}
  alias CMS.SearchArtiments.Indexer
  alias Accounts.Model.User

  def perform(%Oban.Job{args: %{"event_id" => event_id}} = job) do
    case Outbox.execute(event_id, &cleanup/1) do
      {:ok, _value} ->
        {:ok, :pass}

      {:busy, seconds} ->
        {:snooze, seconds}

      {:error, _reason} when job.attempt >= job.max_attempts ->
        _ = Outbox.mark_failed(event_id)
        {:ok, :pass}

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp cleanup(event) do
    case event.event do
      "comment.changed" ->
        with {:ok, tags} <-
               GroupherServer.PublicCache.scope_tags(:comments_content_changed, event.data),
             {:ok, _} <- GroupherServer.PublicCache.cloudflare_purge(tags) do
          {:ok, :purged}
        end

      "comment.deleted" ->
        with %Article{} = article <- Repo.get(Article, event.resource_id),
             {:ok, _} <- normalize(Indexer.enqueue_metrics(article)) do
          {:ok, :effects_enqueued}
        else
          nil -> {:error, :comment_article_not_found}
        end

      action ->
        comment_effects(action, event)
    end
  end

  defp comment_effects(action, event)
       when action in ["comment.created", "comment.replied", "comment.updated"] do
    with %Comment{} = comment <- Repo.get(Comment, event.resource_id),
         %User{} = actor <- Repo.get(User, event.data["actor_id"]),
         %Community{} = community <- Repo.get(Community, event.data["community_id"]),
         {:ok, _} <- enqueue_comment_job(action, comment, actor, community) do
      {:ok, :effects_enqueued}
    else
      nil -> {:error, :comment_effect_target_not_found}
    end
  end

  defp comment_effects(_action, _event), do: {:error, :unknown_comment_outbox_event}

  defp enqueue_comment_job("comment.created", comment, actor, community) do
    with {:ok, _} <- enqueue(:sync_mentions, comment.id, fn -> Jobs.sync_mentions(comment) end),
         {:ok, _} <-
           enqueue(:notify_comment, comment.id, fn -> Jobs.notify_comment(comment, actor) end),
         {:ok, _} <-
           enqueue(:subscribe_community, community.id, fn ->
             Jobs.subscribe_community(community, actor)
           end) do
      {:ok, :pass}
    end
  end

  defp enqueue_comment_job("comment.replied", comment, actor, _community) do
    with {:ok, _} <- enqueue(:sync_mentions, comment.id, fn -> Jobs.sync_mentions(comment) end),
         {:ok, _} <-
           enqueue(:notify_reply, comment.id, fn -> Jobs.notify_reply(comment, actor) end) do
      {:ok, :pass}
    end
  end

  defp enqueue_comment_job("comment.updated", comment, _actor, _community) do
    enqueue(:sync_mentions, comment.id, fn -> Jobs.sync_mentions(comment) end)
  end

  defp enqueue(type, key, fun), do: Jobs.enqueue_best_effort(type, key, fun)

  defp normalize(:ok), do: {:ok, :pass}
  defp normalize({:ok, _}), do: {:ok, :pass}
  defp normalize({:error, reason}), do: {:error, reason}
end
