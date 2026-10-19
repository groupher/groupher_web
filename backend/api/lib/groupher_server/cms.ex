defmodule GroupherServer.CMS do
  @moduledoc """
  Public boundary for the CMS Context.

      transport / job / another Context
        -> CMS
        -> internal CMS capability or owner

  Callers outside `GroupherServer.CMS.*` must enter through this module.
  """

  require GroupherServer.CMS.Articles.Const
  require GroupherServer.CMS.Artiment.Const
  require GroupherServer.CMS.Artiment.Threads
  require GroupherServer.CMS.Dashboard.KanbanBoards

  alias __MODULE__.{ArticlePath, Comments, EmotionFormatter, Insights, Query}

  @doc "Defines a typed CMS command Confirmation through the public CMS contract."
  defmacro command_confirmation(opts) do
    quote do
      use GroupherServer.CMS.Command.ConfirmationDefinition, unquote(opts)
    end
  end

  @doc "Builds an ArticleCollect changeset for an Accounts-owned embedded collection."
  @spec article_collect_changeset(struct(), map()) :: Ecto.Changeset.t()
  def article_collect_changeset(article_collect, attrs) do
    GroupherServer.CMS.Model.ArticleCollect.changeset(article_collect, attrs)
  end

  @doc "Expands the registered CMS Article thread values at compile time."
  defmacro artiment_threads_values do
    GroupherServer.CMS.Artiment.Threads.values()
  end

  @doc "Expands the Article ordering values at compile time."
  defmacro articles_const_order_values_ast do
    GroupherServer.CMS.Articles.Const.order_values_ast()
  end

  @doc "Expands the Artiment category values at compile time."
  defmacro artiment_const_cat_values_ast do
    GroupherServer.CMS.Artiment.Const.cat_values_ast()
  end

  @doc "Expands the Artiment status values at compile time."
  defmacro artiment_const_status_values_ast do
    GroupherServer.CMS.Artiment.Const.status_values_ast()
  end

  @doc "Expands the Dashboard Kanban board values at compile time."
  defmacro dashboard_kanban_boards_values do
    GroupherServer.CMS.Dashboard.KanbanBoards.values()
  end

  @doc "Returns the CMS Dataloader source used by the GraphQL adapter."
  @spec dataloader_source() :: Dataloader.Ecto.t()
  defdelegate dataloader_source(), to: Query

  @doc "Parses a public Article path into the canonical CMS input shape."
  @spec parse_article_path(map(), keyword()) :: {:ok, ArticlePath.t()} | {:error, term()}
  defdelegate parse_article_path(article_path, opts \\ []), to: ArticlePath, as: :parse

  @doc "Parses the Article path embedded in resolver or middleware arguments."
  @spec parse_article_arguments(map(), keyword()) :: {:ok, map()} | {:error, term()}
  defdelegate parse_article_arguments(arguments, opts \\ []),
    to: ArticlePath,
    as: :parse_arguments

  @doc "Formats internal emotion state for the public API."
  @spec format_emotions(map() | nil, :article | :comment | nil) :: [map()]
  defdelegate format_emotions(emotions, kind), to: EmotionFormatter, as: :format

  @doc "Returns public reaction totals without viewer-specific fields."
  @spec emotion_counts(map() | nil, :article | :comment | nil) :: [map()]
  defdelegate emotion_counts(emotions, kind), to: EmotionFormatter, as: :counts

  @doc "Rebuilds the stored comment-participant count for one Article."
  @spec reconcile_comments_participants(atom(), Ecto.UUID.t(), non_neg_integer()) ::
          {:ok, term()} | {:error, term()}
  defdelegate reconcile_comments_participants(thread, article_id, total_count),
    to: Comments,
    as: :reconcile_participants_count

  @doc "Returns the CMS Article type used by the Analysis projection."
  @spec article_insights_type(map()) :: {:ok, atom()} | {:error, term()}
  defdelegate article_insights_type(article), to: Insights, as: :article_type

  @doc "Authorizes an already loaded Article for Insights reads."
  @spec authorize_article_insights(map(), term(), atom(), keyword()) ::
          {:ok, :pass} | {:error, term()}
  defdelegate authorize_article_insights(article, viewer, article_type, opts),
    to: Insights,
    as: :authorize

  @doc "Resolves and authorizes a public Article path for an Insights read."
  @spec resolve_article_for_insights(map(), term(), keyword()) ::
          {:ok, map()} | {:error, term()}
  defdelegate resolve_article_for_insights(article_path, viewer, opts),
    to: Insights,
    as: :resolve

  @doc "Delivers one committed CMS outbox event through its owning workflow."
  @spec deliver_outbox(atom(), Oban.Job.t()) :: Oban.Worker.result()
  def deliver_outbox(kind, job), do: GroupherServer.CMS.Outbox.Workflow.perform(kind, job)

  @doc "Executes a typed Article effect through the public CMS boundary."
  @spec articles_effect(map()) :: {:ok, term()} | {:error, term()}
  defdelegate articles_effect(effect), to: GroupherServer.CMS.Articles.Effects, as: :run

  @doc "Delivers one typed Comment effect for the Jobs boundary."
  defdelegate comments_deliver_effect(type, payload),
    to: GroupherServer.CMS.Comments.Effects,
    as: :deliver

  @doc "Resolves the canonical ArticleBinding for an Article and Community reference."
  @spec articles_resolve_binding(term(), term()) ::
          {:ok, GroupherServer.CMS.Model.ArticleBinding.t()} | {:error, term()}
  defdelegate articles_resolve_binding(article_ref, community_ref),
    to: GroupherServer.CMS.FrontDesk,
    as: :resolve_binding

  @doc "Delegates GroupherServer.CMS.AbuseReports.paged_reports/1 through the CMS Context boundary."
  defdelegate abuse_reports_paged_reports(arg1),
    to: GroupherServer.CMS.AbuseReports,
    as: :paged_reports

  @doc "Delegates GroupherServer.CMS.ArticleStats.for_article/2 through the CMS Context boundary."
  defdelegate article_stats_for_article(arg1, arg2),
    to: GroupherServer.CMS.ArticleStats,
    as: :for_article

  @doc "Delegates GroupherServer.CMS.ArticleStats.read_public/3 through the CMS Context boundary."
  defdelegate article_stats_read_public(arg1, arg2, arg3),
    to: GroupherServer.CMS.ArticleStats,
    as: :read_public

  @doc "Delegates GroupherServer.CMS.Articles.Bindings.all/1 through the CMS Context boundary."
  defdelegate articles_bindings_all(arg1), to: GroupherServer.CMS.Articles.Bindings, as: :all

  @doc "Delegates GroupherServer.CMS.Articles.Bindings.get/2 through the CMS Context boundary."
  defdelegate articles_bindings_get(arg1, arg2),
    to: GroupherServer.CMS.Articles.Bindings,
    as: :get

  @doc "Delegates GroupherServer.CMS.Articles.Bindings.Tags.list/1 through the CMS Context boundary."
  defdelegate articles_bindings_tags_list(arg1),
    to: GroupherServer.CMS.Articles.Bindings.Tags,
    as: :list

  @doc "Delegates GroupherServer.CMS.Articles.count_published/2 through the CMS Context boundary."
  defdelegate articles_count_published(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :count_published

  @doc "Delegates GroupherServer.CMS.Articles.cover_edit_info/2 through the CMS Context boundary."
  defdelegate articles_cover_edit_info(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :cover_edit_info

  @doc "Delegates GroupherServer.CMS.Articles.create_stable_draft_result/4 through the CMS Context boundary."
  defdelegate articles_create_stable_draft_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :create_stable_draft_result

  @doc "Delegates GroupherServer.CMS.Articles.create_stable_draft_result/5 through the CMS Context boundary."
  defdelegate articles_create_stable_draft_result(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Articles,
    as: :create_stable_draft_result

  @doc "Delegates GroupherServer.CMS.Articles.create/4 through the CMS Context boundary."
  defdelegate articles_create(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :create

  @doc "Delegates GroupherServer.CMS.Articles.create/5 through the CMS Context boundary."
  defdelegate articles_create(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Articles,
    as: :create

  @doc "Delegates GroupherServer.CMS.Articles.get_trashed/1 through the CMS Context boundary."
  defdelegate articles_get_trashed(arg1), to: GroupherServer.CMS.Articles, as: :get_trashed

  @doc "Delegates GroupherServer.CMS.Articles.get_trashed/3 through the CMS Context boundary."
  defdelegate articles_get_trashed(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :get_trashed

  @doc "Delegates GroupherServer.CMS.Articles.grouped_kanban/1 through the CMS Context boundary."
  defdelegate articles_grouped_kanban(arg1), to: GroupherServer.CMS.Articles, as: :grouped_kanban

  @doc "Delegates GroupherServer.CMS.Articles.list_trashed/1 through the CMS Context boundary."
  defdelegate articles_list_trashed(arg1), to: GroupherServer.CMS.Articles, as: :list_trashed

  @doc "Delegates GroupherServer.CMS.Articles.list_trashed/2 through the CMS Context boundary."
  defdelegate articles_list_trashed(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :list_trashed

  @doc "Delegates GroupherServer.CMS.Articles.lock_comments_result/2 through the CMS Context boundary."
  defdelegate articles_lock_comments_result(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :lock_comments_result

  @doc "Delegates GroupherServer.CMS.Articles.lock_comments_result/3 through the CMS Context boundary."
  defdelegate articles_lock_comments_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :lock_comments_result

  @doc "Delegates GroupherServer.CMS.Articles.mirror/6 through the CMS Context boundary."
  defdelegate articles_mirror(arg1, arg2, arg3, arg4, arg5, arg6),
    to: GroupherServer.CMS.Articles,
    as: :mirror

  @doc "Delegates GroupherServer.CMS.Articles.move/6 through the CMS Context boundary."
  defdelegate articles_move(arg1, arg2, arg3, arg4, arg5, arg6),
    to: GroupherServer.CMS.Articles,
    as: :move

  @doc "Delegates GroupherServer.CMS.Articles.page/2 through the CMS Context boundary."
  defdelegate articles_page(arg1, arg2), to: GroupherServer.CMS.Articles, as: :page

  @doc "Delegates GroupherServer.CMS.Articles.page/3 through the CMS Context boundary."
  defdelegate articles_page(arg1, arg2, arg3), to: GroupherServer.CMS.Articles, as: :page

  @doc "Delegates GroupherServer.CMS.Articles.paged_audit_failed/2 through the CMS Context boundary."
  defdelegate articles_paged_audit_failed(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :paged_audit_failed

  @doc "Delegates GroupherServer.CMS.Articles.paged_kanban/2 through the CMS Context boundary."
  defdelegate articles_paged_kanban(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :paged_kanban

  @doc "Delegates GroupherServer.CMS.Articles.paged_published/3 through the CMS Context boundary."
  defdelegate articles_paged_published(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :paged_published

  @doc "Delegates GroupherServer.CMS.Articles.paged_published/4 through the CMS Context boundary."
  defdelegate articles_paged_published(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :paged_published

  @doc "Delegates GroupherServer.CMS.Articles.permanently_delete_trashed/2 through the CMS Context boundary."
  defdelegate articles_permanently_delete_trashed(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :permanently_delete_trashed

  @doc "Delegates GroupherServer.CMS.Articles.permanently_delete_trashed/3 through the CMS Context boundary."
  defdelegate articles_permanently_delete_trashed(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :permanently_delete_trashed

  defdelegate articles_permanently_delete_trashed_receipt(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :permanently_delete_trashed_receipt

  @doc "Delegates GroupherServer.CMS.Articles.pin/4 through the CMS Context boundary."
  defdelegate articles_pin(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Articles, as: :pin

  @doc "Delegates GroupherServer.CMS.Articles.publish/3 through the CMS Context boundary."
  defdelegate articles_publish(arg1, arg2, arg3), to: GroupherServer.CMS.Articles, as: :publish

  @doc "Delegates GroupherServer.CMS.Articles.restore_trashed/2 through the CMS Context boundary."
  defdelegate articles_restore_trashed(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :restore_trashed

  @doc "Delegates GroupherServer.CMS.Articles.restore_trashed/3 through the CMS Context boundary."
  defdelegate articles_restore_trashed(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :restore_trashed

  defdelegate articles_restore_trashed_receipt(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :restore_trashed_receipt

  @doc "Delegates GroupherServer.CMS.Articles.set_cat_result/3 through the CMS Context boundary."
  defdelegate articles_set_cat_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :set_cat_result

  @doc "Delegates GroupherServer.CMS.Articles.set_cat_result/4 through the CMS Context boundary."
  defdelegate articles_set_cat_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :set_cat_result

  @doc "Delegates GroupherServer.CMS.Articles.set_status_result/3 through the CMS Context boundary."
  defdelegate articles_set_status_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :set_status_result

  @doc "Delegates GroupherServer.CMS.Articles.set_status_result/4 through the CMS Context boundary."
  defdelegate articles_set_status_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :set_status_result

  @doc "Delegates GroupherServer.CMS.Articles.sink_result/2 through the CMS Context boundary."
  defdelegate articles_sink_result(arg1, arg2), to: GroupherServer.CMS.Articles, as: :sink_result

  @doc "Delegates GroupherServer.CMS.Articles.sink_result/3 through the CMS Context boundary."
  defdelegate articles_sink_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :sink_result

  @doc "Delegates GroupherServer.CMS.Articles.Store.body_draft/1 through the CMS Context boundary."
  defdelegate articles_store_body_draft(arg1),
    to: GroupherServer.CMS.Articles.Store,
    as: :body_draft

  @doc "Delegates GroupherServer.CMS.Articles.trash/2 through the CMS Context boundary."
  defdelegate articles_trash(arg1, arg2), to: GroupherServer.CMS.Articles, as: :trash

  @doc "Delegates GroupherServer.CMS.Articles.trash/3 through the CMS Context boundary."
  defdelegate articles_trash(arg1, arg2, arg3), to: GroupherServer.CMS.Articles, as: :trash

  defdelegate articles_trash_receipt(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :trash_receipt

  @doc "Delegates GroupherServer.CMS.Articles.undo_lock_comments_result/2 through the CMS Context boundary."
  defdelegate articles_undo_lock_comments_result(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :undo_lock_comments_result

  @doc "Delegates GroupherServer.CMS.Articles.undo_lock_comments_result/3 through the CMS Context boundary."
  defdelegate articles_undo_lock_comments_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :undo_lock_comments_result

  @doc "Delegates GroupherServer.CMS.Articles.undo_pin/4 through the CMS Context boundary."
  defdelegate articles_undo_pin(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :undo_pin

  @doc "Delegates GroupherServer.CMS.Articles.undo_sink_result/2 through the CMS Context boundary."
  defdelegate articles_undo_sink_result(arg1, arg2),
    to: GroupherServer.CMS.Articles,
    as: :undo_sink_result

  @doc "Delegates GroupherServer.CMS.Articles.undo_sink_result/3 through the CMS Context boundary."
  defdelegate articles_undo_sink_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Articles,
    as: :undo_sink_result

  @doc "Delegates GroupherServer.CMS.Articles.unmirror/4 through the CMS Context boundary."
  defdelegate articles_unmirror(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :unmirror

  @doc "Delegates GroupherServer.CMS.Articles.update_draft/4 through the CMS Context boundary."
  defdelegate articles_update_draft(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :update_draft

  @doc "Delegates GroupherServer.CMS.Articles.update/4 through the CMS Context boundary."
  defdelegate articles_update(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Articles,
    as: :update

  @doc "Delegates GroupherServer.CMS.Artiment.Config.comment_emotions/0 through the CMS Context boundary."
  defdelegate artiment_config_comment_emotions(),
    to: GroupherServer.CMS.Artiment.Config,
    as: :comment_emotions

  @doc "Delegates GroupherServer.CMS.Artiment.Config.emotions/0 through the CMS Context boundary."
  defdelegate artiment_config_emotions(), to: GroupherServer.CMS.Artiment.Config, as: :emotions

  @doc "Delegates GroupherServer.CMS.Artiment.Config.threads/0 through the CMS Context boundary."
  defdelegate artiment_config_threads(), to: GroupherServer.CMS.Artiment.Config, as: :threads

  @doc "Delegates GroupherServer.CMS.ArtimentMentions.mentioned_by/2 through the CMS Context boundary."
  defdelegate artiment_mentions_mentioned_by(arg1, arg2),
    to: GroupherServer.CMS.ArtimentMentions,
    as: :mentioned_by

  @doc "Delegates GroupherServer.CMS.ArtimentMentions.mentioned_by/3 through the CMS Context boundary."
  defdelegate artiment_mentions_mentioned_by(arg1, arg2, arg3),
    to: GroupherServer.CMS.ArtimentMentions,
    as: :mentioned_by

  @doc "Delegates GroupherServer.CMS.ArtimentMentions.mentions/2 through the CMS Context boundary."
  defdelegate artiment_mentions_mentions(arg1, arg2),
    to: GroupherServer.CMS.ArtimentMentions,
    as: :mentions

  @doc "Delegates GroupherServer.CMS.ArtimentMentions.mentions/3 through the CMS Context boundary."
  defdelegate artiment_mentions_mentions(arg1, arg2, arg3),
    to: GroupherServer.CMS.ArtimentMentions,
    as: :mentions

  @doc "Delegates GroupherServer.CMS.Artiment.Threads.article_enums/0 through the CMS Context boundary."
  defdelegate artiment_threads_article_enums(),
    to: GroupherServer.CMS.Artiment.Threads,
    as: :article_enums

  @doc "Delegates GroupherServer.CMS.Assets.complete_upload/1 through the CMS Context boundary."
  defdelegate assets_complete_upload(arg1), to: GroupherServer.CMS.Assets, as: :complete_upload

  @doc "Delegates GroupherServer.CMS.Assets.create_upload_intent/3 through the CMS Context boundary."
  defdelegate assets_create_upload_intent(arg1, arg2, arg3),
    to: GroupherServer.CMS.Assets,
    as: :create_upload_intent

  @doc "Delegates GroupherServer.CMS.Assets.delete/2 through the CMS Context boundary."
  defdelegate assets_delete(arg1, arg2), to: GroupherServer.CMS.Assets, as: :delete

  @doc "Delegates GroupherServer.CMS.Assets.delete/4 through the CMS Context boundary."
  defdelegate assets_delete(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Assets, as: :delete

  @doc "Delegates GroupherServer.CMS.Assets.Endpoints.validate!/0 through the CMS Context boundary."
  defdelegate assets_endpoints_validate!(),
    to: GroupherServer.CMS.Assets.Endpoints,
    as: :validate!

  @doc "Delegates GroupherServer.CMS.Assets.Endpoints.validate!/1 through the CMS Context boundary."
  defdelegate assets_endpoints_validate!(arg1),
    to: GroupherServer.CMS.Assets.Endpoints,
    as: :validate!

  @doc "Delegates GroupherServer.CMS.Assets.Endpoints.validate!/2 through the CMS Context boundary."
  defdelegate assets_endpoints_validate!(arg1, arg2),
    to: GroupherServer.CMS.Assets.Endpoints,
    as: :validate!

  @doc "Delegates GroupherServer.CMS.Assets.origin_info/1 through the CMS Context boundary."
  defdelegate assets_origin_info(arg1), to: GroupherServer.CMS.Assets, as: :origin_info

  @doc "Delegates GroupherServer.CMS.Assets.page/1 through the CMS Context boundary."
  defdelegate assets_page(arg1), to: GroupherServer.CMS.Assets, as: :page

  @doc "Delegates GroupherServer.CMS.Assets.page/2 through the CMS Context boundary."
  defdelegate assets_page(arg1, arg2), to: GroupherServer.CMS.Assets, as: :page

  @doc "Delegates GroupherServer.CMS.Assets.refs/2 through the CMS Context boundary."
  defdelegate assets_refs(arg1, arg2), to: GroupherServer.CMS.Assets, as: :refs

  @doc "Delegates GroupherServer.CMS.Assets.refs/3 through the CMS Context boundary."
  defdelegate assets_refs(arg1, arg2, arg3), to: GroupherServer.CMS.Assets, as: :refs

  @doc "Delegates GroupherServer.CMS.Assets.register_to_community/3 through the CMS Context boundary."
  defdelegate assets_register_to_community(arg1, arg2, arg3),
    to: GroupherServer.CMS.Assets,
    as: :register_to_community

  @doc "Delegates GroupherServer.CMS.Assets.register_to_community/4 through the CMS Context boundary."
  defdelegate assets_register_to_community(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Assets,
    as: :register_to_community

  @doc "Delegates GroupherServer.CMS.Assets.stats/1 through the CMS Context boundary."
  defdelegate assets_stats(arg1), to: GroupherServer.CMS.Assets, as: :stats

  @doc "Delegates GroupherServer.CMS.Assets.stats/2 through the CMS Context boundary."
  defdelegate assets_stats(arg1, arg2), to: GroupherServer.CMS.Assets, as: :stats

  @doc "Delegates GroupherServer.CMS.Assets.usage/1 through the CMS Context boundary."
  defdelegate assets_usage(arg1), to: GroupherServer.CMS.Assets, as: :usage

  @doc "Delegates GroupherServer.CMS.Comments.accept_solution/2 through the CMS Context boundary."
  defdelegate comments_accept_solution(arg1, arg2),
    to: GroupherServer.CMS.Comments,
    as: :accept_solution

  @doc "Delegates GroupherServer.CMS.Comments.accept_solution/3 through the CMS Context boundary."
  defdelegate comments_accept_solution(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :accept_solution

  @doc "Delegates GroupherServer.CMS.Comments.comments_state/2 through the CMS Context boundary."
  defdelegate comments_comments_state(arg1, arg2),
    to: GroupherServer.CMS.Comments,
    as: :comments_state

  @doc "Delegates GroupherServer.CMS.Comments.comments_state/3 through the CMS Context boundary."
  defdelegate comments_comments_state(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :comments_state

  @doc "Delegates GroupherServer.CMS.Comments.create_comment_result/4 through the CMS Context boundary."
  defdelegate comments_create_comment_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Comments,
    as: :create_comment_result

  @doc "Delegates GroupherServer.CMS.Comments.create_comment_result/5 through the CMS Context boundary."
  defdelegate comments_create_comment_result(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Comments,
    as: :create_comment_result

  @doc "Delegates GroupherServer.CMS.Comments.delete_comment_result/2 through the CMS Context boundary."
  defdelegate comments_delete_comment_result(arg1, arg2),
    to: GroupherServer.CMS.Comments,
    as: :delete_comment_result

  @doc "Delegates GroupherServer.CMS.Comments.delete_comment_result/3 through the CMS Context boundary."
  defdelegate comments_delete_comment_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :delete_comment_result

  @doc "Delegates GroupherServer.CMS.Comments.one_comment/1 through the CMS Context boundary."
  defdelegate comments_one_comment(arg1), to: GroupherServer.CMS.Comments, as: :one_comment

  @doc "Delegates GroupherServer.CMS.Comments.one_comment/2 through the CMS Context boundary."
  defdelegate comments_one_comment(arg1, arg2), to: GroupherServer.CMS.Comments, as: :one_comment

  @doc "Delegates GroupherServer.CMS.Comments.paged_audit_failed_comments/1 through the CMS Context boundary."
  defdelegate comments_paged_audit_failed_comments(arg1),
    to: GroupherServer.CMS.Comments,
    as: :paged_audit_failed_comments

  @doc "Delegates GroupherServer.CMS.Comments.paged_comment_replies/2 through the CMS Context boundary."
  defdelegate comments_paged_comment_replies(arg1, arg2),
    to: GroupherServer.CMS.Comments,
    as: :paged_comment_replies

  @doc "Delegates GroupherServer.CMS.Comments.paged_comment_replies/3 through the CMS Context boundary."
  defdelegate comments_paged_comment_replies(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :paged_comment_replies

  @doc "Delegates GroupherServer.CMS.Comments.paged_comments_participants/3 through the CMS Context boundary."
  defdelegate comments_paged_comments_participants(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :paged_comments_participants

  @doc "Delegates GroupherServer.CMS.Comments.paged_comments/4 through the CMS Context boundary."
  defdelegate comments_paged_comments(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Comments,
    as: :paged_comments

  @doc "Delegates GroupherServer.CMS.Comments.paged_comments/5 through the CMS Context boundary."
  defdelegate comments_paged_comments(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Comments,
    as: :paged_comments

  @doc "Delegates GroupherServer.CMS.Comments.paged_published_comments/2 through the CMS Context boundary."
  defdelegate comments_paged_published_comments(arg1, arg2),
    to: GroupherServer.CMS.Comments,
    as: :paged_published_comments

  @doc "Delegates GroupherServer.CMS.Comments.paged_published_comments/3 through the CMS Context boundary."
  defdelegate comments_paged_published_comments(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :paged_published_comments

  @doc "Delegates GroupherServer.CMS.Comments.paged_published_comments/4 through the CMS Context boundary."
  defdelegate comments_paged_published_comments(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Comments,
    as: :paged_published_comments

  @doc "Delegates GroupherServer.CMS.Comments.pin_comment/1 through the CMS Context boundary."
  defdelegate comments_pin_comment(arg1), to: GroupherServer.CMS.Comments, as: :pin_comment

  @doc "Delegates GroupherServer.CMS.Comments.pin_comment/2 through the CMS Context boundary."
  defdelegate comments_pin_comment(arg1, arg2), to: GroupherServer.CMS.Comments, as: :pin_comment

  @doc "Delegates GroupherServer.CMS.Comments.pin_comment/3 through the CMS Context boundary."
  defdelegate comments_pin_comment(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :pin_comment

  @doc "Delegates GroupherServer.CMS.Comments.reconcile_states/3 through the CMS Context boundary."
  defdelegate comments_reconcile_states(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :reconcile_states

  @doc "Delegates GroupherServer.CMS.Comments.reply_comment_result/3 through the CMS Context boundary."
  defdelegate comments_reply_comment_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :reply_comment_result

  @doc "Delegates GroupherServer.CMS.Comments.reply_comment_result/4 through the CMS Context boundary."
  defdelegate comments_reply_comment_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Comments,
    as: :reply_comment_result

  @doc "Delegates GroupherServer.CMS.Comments.revoke_solution/2 through the CMS Context boundary."
  defdelegate comments_revoke_solution(arg1, arg2),
    to: GroupherServer.CMS.Comments,
    as: :revoke_solution

  @doc "Delegates GroupherServer.CMS.Comments.revoke_solution/3 through the CMS Context boundary."
  defdelegate comments_revoke_solution(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :revoke_solution

  @doc "Delegates GroupherServer.CMS.Comments.undo_pin_comment/1 through the CMS Context boundary."
  defdelegate comments_undo_pin_comment(arg1),
    to: GroupherServer.CMS.Comments,
    as: :undo_pin_comment

  @doc "Delegates GroupherServer.CMS.Comments.undo_pin_comment/2 through the CMS Context boundary."
  defdelegate comments_undo_pin_comment(arg1, arg2),
    to: GroupherServer.CMS.Comments,
    as: :undo_pin_comment

  @doc "Delegates GroupherServer.CMS.Comments.undo_pin_comment/3 through the CMS Context boundary."
  defdelegate comments_undo_pin_comment(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :undo_pin_comment

  @doc "Delegates GroupherServer.CMS.Comments.update_comment_result/5 through the CMS Context boundary."
  defdelegate comments_update_comment_result(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Comments,
    as: :update_comment_result

  @doc "Delegates GroupherServer.CMS.Comments.viewer_states/3 through the CMS Context boundary."
  defdelegate comments_viewer_states(arg1, arg2, arg3),
    to: GroupherServer.CMS.Comments,
    as: :viewer_states

  @doc "Delegates GroupherServer.CMS.Communities.add_moderator/3 through the CMS Context boundary."
  defdelegate communities_add_moderator(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :add_moderator

  @doc "Delegates GroupherServer.CMS.Communities.add_moderator/4 through the CMS Context boundary."
  defdelegate communities_add_moderator(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :add_moderator

  @doc "Delegates GroupherServer.CMS.Communities.add_moderators/3 through the CMS Context boundary."
  defdelegate communities_add_moderators(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :add_moderators

  @doc "Delegates GroupherServer.CMS.Communities.add_moderators/4 through the CMS Context boundary."
  defdelegate communities_add_moderators(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :add_moderators

  @doc "Delegates GroupherServer.CMS.Communities.all_passport_rules/0 through the CMS Context boundary."
  defdelegate communities_all_passport_rules(),
    to: GroupherServer.CMS.Communities,
    as: :all_passport_rules

  @doc "Delegates GroupherServer.CMS.Communities.check_name/1 through the CMS Context boundary."
  defdelegate communities_check_name(arg1), to: GroupherServer.CMS.Communities, as: :check_name

  @doc "Delegates GroupherServer.CMS.Communities.check_name/2 through the CMS Context boundary."
  defdelegate communities_check_name(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :check_name

  @doc "Delegates GroupherServer.CMS.Communities.count/2 through the CMS Context boundary."
  defdelegate communities_count(arg1, arg2), to: GroupherServer.CMS.Communities, as: :count

  @doc "Delegates GroupherServer.CMS.Communities.create_category/2 through the CMS Context boundary."
  defdelegate communities_create_category(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :create_category

  @doc "Delegates GroupherServer.CMS.Communities.create_category/3 through the CMS Context boundary."
  defdelegate communities_create_category(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :create_category

  @doc "Delegates GroupherServer.CMS.Communities.create_from_application/2 through the CMS Context boundary."
  defdelegate communities_create_from_application(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :create_from_application

  @doc "Delegates GroupherServer.CMS.Communities.create_tag_group/3 through the CMS Context boundary."
  defdelegate communities_create_tag_group(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :create_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.create_tag_group/4 through the CMS Context boundary."
  defdelegate communities_create_tag_group(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :create_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.create_tag_group/5 through the CMS Context boundary."
  defdelegate communities_create_tag_group(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :create_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.create_tag/4 through the CMS Context boundary."
  defdelegate communities_create_tag(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :create_tag

  @doc "Delegates GroupherServer.CMS.Communities.create_tag/5 through the CMS Context boundary."
  defdelegate communities_create_tag(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :create_tag

  @doc "Delegates GroupherServer.CMS.Communities.create/2 through the CMS Context boundary."
  defdelegate communities_create(arg1, arg2), to: GroupherServer.CMS.Communities, as: :create

  @doc "Delegates GroupherServer.CMS.Communities.create/3 through the CMS Context boundary."
  defdelegate communities_create(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :create

  @doc "Delegates GroupherServer.CMS.Communities.delete_category/2 through the CMS Context boundary."
  defdelegate communities_delete_category(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :delete_category

  @doc "Delegates GroupherServer.CMS.Communities.delete_category/4 through the CMS Context boundary."
  defdelegate communities_delete_category(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :delete_category

  @doc "Delegates GroupherServer.CMS.Communities.delete_tag_group/3 through the CMS Context boundary."
  defdelegate communities_delete_tag_group(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :delete_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.delete_tag_group/4 through the CMS Context boundary."
  defdelegate communities_delete_tag_group(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :delete_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.delete_tag_group/5 through the CMS Context boundary."
  defdelegate communities_delete_tag_group(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :delete_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.delete_tag/1 through the CMS Context boundary."
  defdelegate communities_delete_tag(arg1), to: GroupherServer.CMS.Communities, as: :delete_tag

  @doc "Delegates GroupherServer.CMS.Communities.delete_tag/2 through the CMS Context boundary."
  defdelegate communities_delete_tag(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :delete_tag

  @doc "Delegates GroupherServer.CMS.Communities.delete_tag/3 through the CMS Context boundary."
  defdelegate communities_delete_tag(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :delete_tag

  @doc "Delegates GroupherServer.CMS.Communities.fetch/1 through the CMS Context boundary."
  defdelegate communities_fetch(arg1), to: GroupherServer.CMS.Communities, as: :fetch

  @doc "Delegates GroupherServer.CMS.Communities.fetch/2 through the CMS Context boundary."
  defdelegate communities_fetch(arg1, arg2), to: GroupherServer.CMS.Communities, as: :fetch

  @doc "Delegates GroupherServer.CMS.Communities.fetch/3 through the CMS Context boundary."
  defdelegate communities_fetch(arg1, arg2, arg3), to: GroupherServer.CMS.Communities, as: :fetch

  @doc "Delegates GroupherServer.CMS.Communities.get_passport/1 through the CMS Context boundary."
  defdelegate communities_get_passport(arg1),
    to: GroupherServer.CMS.Communities,
    as: :get_passport

  @doc "Delegates GroupherServer.CMS.Communities.Lifecycle.ensure_created/1 through the CMS Context boundary."
  defdelegate communities_lifecycle_ensure_created(arg1),
    to: GroupherServer.CMS.Communities.Lifecycle,
    as: :ensure_created

  @doc "Delegates GroupherServer.CMS.Communities.Lifecycle.ensure_created/2 through the CMS Context boundary."
  defdelegate communities_lifecycle_ensure_created(arg1, arg2),
    to: GroupherServer.CMS.Communities.Lifecycle,
    as: :ensure_created

  @doc "Delegates GroupherServer.CMS.Communities.mark_setup_failed/4 through the CMS Context boundary."
  defdelegate communities_mark_setup_failed(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :mark_setup_failed

  @doc "Delegates GroupherServer.CMS.Communities.members/3 through the CMS Context boundary."
  defdelegate communities_members(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :members

  @doc "Delegates GroupherServer.CMS.Communities.members/4 through the CMS Context boundary."
  defdelegate communities_members(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :members

  @doc "Delegates GroupherServer.CMS.Communities.paged_categories/1 through the CMS Context boundary."
  defdelegate communities_paged_categories(arg1),
    to: GroupherServer.CMS.Communities,
    as: :paged_categories

  @doc "Delegates GroupherServer.CMS.Communities.paged/1 through the CMS Context boundary."
  defdelegate communities_paged(arg1), to: GroupherServer.CMS.Communities, as: :paged

  @doc "Delegates GroupherServer.CMS.Communities.paged/2 through the CMS Context boundary."
  defdelegate communities_paged(arg1, arg2), to: GroupherServer.CMS.Communities, as: :paged

  @doc "Delegates GroupherServer.CMS.Communities.reindex_tag_groups/3 through the CMS Context boundary."
  defdelegate communities_reindex_tag_groups(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :reindex_tag_groups

  @doc "Delegates GroupherServer.CMS.Communities.reindex_tag_groups/4 through the CMS Context boundary."
  defdelegate communities_reindex_tag_groups(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :reindex_tag_groups

  @doc "Delegates GroupherServer.CMS.Communities.reindex_tag_groups/5 through the CMS Context boundary."
  defdelegate communities_reindex_tag_groups(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :reindex_tag_groups

  @doc "Delegates GroupherServer.CMS.Communities.reindex_tags_across_groups/4 through the CMS Context boundary."
  defdelegate communities_reindex_tags_across_groups(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :reindex_tags_across_groups

  @doc "Delegates GroupherServer.CMS.Communities.reindex_tags_across_groups/5 through the CMS Context boundary."
  defdelegate communities_reindex_tags_across_groups(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :reindex_tags_across_groups

  @doc "Delegates GroupherServer.CMS.Communities.reindex_tags_in_group/5 through the CMS Context boundary."
  defdelegate communities_reindex_tags_in_group(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :reindex_tags_in_group

  @doc "Delegates GroupherServer.CMS.Communities.reindex_tags_in_group/6 through the CMS Context boundary."
  defdelegate communities_reindex_tags_in_group(arg1, arg2, arg3, arg4, arg5, arg6),
    to: GroupherServer.CMS.Communities,
    as: :reindex_tags_in_group

  @doc "Delegates GroupherServer.CMS.Communities.release_expired_slug_claims/1 through the CMS Context boundary."
  defdelegate communities_release_expired_slug_claims(arg1),
    to: GroupherServer.CMS.Communities,
    as: :release_expired_slug_claims

  @doc "Delegates GroupherServer.CMS.Communities.remove_moderator/3 through the CMS Context boundary."
  defdelegate communities_remove_moderator(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :remove_moderator

  @doc "Delegates GroupherServer.CMS.Communities.remove_moderator/4 through the CMS Context boundary."
  defdelegate communities_remove_moderator(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :remove_moderator

  @doc "Delegates GroupherServer.CMS.Communities.request_destroy/1 through the CMS Context boundary."
  defdelegate communities_request_destroy(arg1),
    to: GroupherServer.CMS.Communities,
    as: :request_destroy

  @doc "Delegates GroupherServer.CMS.Communities.request_destroy/2 through the CMS Context boundary."
  defdelegate communities_request_destroy(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :request_destroy

  @doc "Delegates GroupherServer.CMS.Communities.request_destroy/3 through the CMS Context boundary."
  defdelegate communities_request_destroy(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :request_destroy

  @doc "Delegates GroupherServer.CMS.Communities.run_setup/2 through the CMS Context boundary."
  defdelegate communities_run_setup(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :run_setup

  @doc "Delegates GroupherServer.CMS.Communities.set_category/2 through the CMS Context boundary."
  defdelegate communities_set_category(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :set_category

  @doc "Delegates GroupherServer.CMS.Communities.set_category/4 through the CMS Context boundary."
  defdelegate communities_set_category(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :set_category

  @doc "Delegates GroupherServer.CMS.Communities.set_tag/2 through the CMS Context boundary."
  defdelegate communities_set_tag(arg1, arg2), to: GroupherServer.CMS.Communities, as: :set_tag

  @doc "Delegates GroupherServer.CMS.Communities.set_tag/3 through the CMS Context boundary."
  defdelegate communities_set_tag(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :set_tag

  @doc "Delegates GroupherServer.CMS.Communities.set_tag/4 through the CMS Context boundary."
  defdelegate communities_set_tag(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :set_tag

  @doc "Delegates GroupherServer.CMS.Communities.stamp_passport/2 through the CMS Context boundary."
  defdelegate communities_stamp_passport(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :stamp_passport

  @doc "Delegates GroupherServer.CMS.Communities.subscribe_default_ifnot/1 through the CMS Context boundary."
  defdelegate communities_subscribe_default_ifnot(arg1),
    to: GroupherServer.CMS.Communities,
    as: :subscribe_default_ifnot

  @doc "Delegates GroupherServer.CMS.Communities.subscribe/2 through the CMS Context boundary."
  defdelegate communities_subscribe(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :subscribe

  @doc "Delegates GroupherServer.CMS.Communities.subscribe/3 through the CMS Context boundary."
  defdelegate communities_subscribe(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :subscribe

  @doc "Delegates GroupherServer.CMS.Communities.tag_groups/1 through the CMS Context boundary."
  defdelegate communities_tag_groups(arg1), to: GroupherServer.CMS.Communities, as: :tag_groups

  @doc "Delegates GroupherServer.CMS.Communities.tag_stats/1 through the CMS Context boundary."
  defdelegate communities_tag_stats(arg1), to: GroupherServer.CMS.Communities, as: :tag_stats

  @doc "Delegates GroupherServer.CMS.Communities.tag_stats/3 through the CMS Context boundary."
  defdelegate communities_tag_stats(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :tag_stats

  @doc "Delegates GroupherServer.CMS.Communities.unset_category/2 through the CMS Context boundary."
  defdelegate communities_unset_category(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :unset_category

  @doc "Delegates GroupherServer.CMS.Communities.unset_category/4 through the CMS Context boundary."
  defdelegate communities_unset_category(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :unset_category

  @doc "Delegates GroupherServer.CMS.Communities.unset_tag/2 through the CMS Context boundary."
  defdelegate communities_unset_tag(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :unset_tag

  @doc "Delegates GroupherServer.CMS.Communities.unset_tag/3 through the CMS Context boundary."
  defdelegate communities_unset_tag(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :unset_tag

  @doc "Delegates GroupherServer.CMS.Communities.unset_tag/4 through the CMS Context boundary."
  defdelegate communities_unset_tag(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :unset_tag

  @doc "Delegates GroupherServer.CMS.Communities.unsubscribe/2 through the CMS Context boundary."
  defdelegate communities_unsubscribe(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :unsubscribe

  @doc "Delegates GroupherServer.CMS.Communities.unsubscribe/3 through the CMS Context boundary."
  defdelegate communities_unsubscribe(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :unsubscribe

  @doc "Delegates GroupherServer.CMS.Communities.update_category/2 through the CMS Context boundary."
  defdelegate communities_update_category(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :update_category

  @doc "Delegates GroupherServer.CMS.Communities.update_category/4 through the CMS Context boundary."
  defdelegate communities_update_category(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :update_category

  @doc "Delegates GroupherServer.CMS.Communities.update_moderator_passport/4 through the CMS Context boundary."
  defdelegate communities_update_moderator_passport(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :update_moderator_passport

  @doc "Delegates GroupherServer.CMS.Communities.update_moderator_passport/5 through the CMS Context boundary."
  defdelegate communities_update_moderator_passport(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :update_moderator_passport

  @doc "Delegates GroupherServer.CMS.Communities.update_operations/3 through the CMS Context boundary."
  defdelegate communities_update_operations(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :update_operations

  @doc "Delegates GroupherServer.CMS.Communities.update_tag_group/4 through the CMS Context boundary."
  defdelegate communities_update_tag_group(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :update_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.update_tag_group/5 through the CMS Context boundary."
  defdelegate communities_update_tag_group(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Communities,
    as: :update_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.update_tag_group/6 through the CMS Context boundary."
  defdelegate communities_update_tag_group(arg1, arg2, arg3, arg4, arg5, arg6),
    to: GroupherServer.CMS.Communities,
    as: :update_tag_group

  @doc "Delegates GroupherServer.CMS.Communities.update_tag/2 through the CMS Context boundary."
  defdelegate communities_update_tag(arg1, arg2),
    to: GroupherServer.CMS.Communities,
    as: :update_tag

  @doc "Delegates GroupherServer.CMS.Communities.update_tag/3 through the CMS Context boundary."
  defdelegate communities_update_tag(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :update_tag

  @doc "Delegates GroupherServer.CMS.Communities.update_tag/4 through the CMS Context boundary."
  defdelegate communities_update_tag(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :update_tag

  @doc "Delegates GroupherServer.CMS.Communities.update/3 through the CMS Context boundary."
  defdelegate communities_update(arg1, arg2, arg3),
    to: GroupherServer.CMS.Communities,
    as: :update

  @doc "Delegates GroupherServer.CMS.Communities.update/4 through the CMS Context boundary."
  defdelegate communities_update(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Communities,
    as: :update

  @doc "Delegates GroupherServer.CMS.CommunityApplications.applicant/1 through the CMS Context boundary."
  defdelegate community_applications_applicant(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :applicant

  @doc "Delegates GroupherServer.CMS.CommunityApplications.application_community/1 through the CMS Context boundary."
  defdelegate community_applications_application_community(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :application_community

  @doc "Delegates GroupherServer.CMS.CommunityApplications.approve/4 through the CMS Context boundary."
  defdelegate community_applications_approve(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.CommunityApplications,
    as: :approve

  @doc "Delegates GroupherServer.CMS.CommunityApplications.approve/5 through the CMS Context boundary."
  defdelegate community_applications_approve(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.CommunityApplications,
    as: :approve

  @doc "Delegates GroupherServer.CMS.CommunityApplications.cancel/3 through the CMS Context boundary."
  defdelegate community_applications_cancel(arg1, arg2, arg3),
    to: GroupherServer.CMS.CommunityApplications,
    as: :cancel

  @doc "Delegates GroupherServer.CMS.CommunityApplications.cancel/4 through the CMS Context boundary."
  defdelegate community_applications_cancel(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.CommunityApplications,
    as: :cancel

  @doc "Delegates GroupherServer.CMS.CommunityApplications.complete_logo_upload/1 through the CMS Context boundary."
  defdelegate community_applications_complete_logo_upload(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :complete_logo_upload

  @doc "Delegates GroupherServer.CMS.CommunityApplications.create_logo_upload_intent/2 through the CMS Context boundary."
  defdelegate community_applications_create_logo_upload_intent(arg1, arg2),
    to: GroupherServer.CMS.CommunityApplications,
    as: :create_logo_upload_intent

  @doc "Delegates GroupherServer.CMS.CommunityApplications.event_actor/1 through the CMS Context boundary."
  defdelegate community_applications_event_actor(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :event_actor

  @doc "Delegates GroupherServer.CMS.CommunityApplications.events/1 through the CMS Context boundary."
  defdelegate community_applications_events(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :events

  @doc "Delegates GroupherServer.CMS.CommunityApplications.events/2 through the CMS Context boundary."
  defdelegate community_applications_events(arg1, arg2),
    to: GroupherServer.CMS.CommunityApplications,
    as: :events

  @doc "Delegates GroupherServer.CMS.CommunityApplications.expire_due/1 through the CMS Context boundary."
  defdelegate community_applications_expire_due(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :expire_due

  @doc "Delegates GroupherServer.CMS.CommunityApplications.expire_logo_uploads/1 through the CMS Context boundary."
  defdelegate community_applications_expire_logo_uploads(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :expire_logo_uploads

  @doc "Delegates GroupherServer.CMS.CommunityApplications.get_owned/2 through the CMS Context boundary."
  defdelegate community_applications_get_owned(arg1, arg2),
    to: GroupherServer.CMS.CommunityApplications,
    as: :get_owned

  @doc "Delegates GroupherServer.CMS.CommunityApplications.logo_origin/1 through the CMS Context boundary."
  defdelegate community_applications_logo_origin(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :logo_origin

  @doc "Delegates GroupherServer.CMS.CommunityApplications.logo/1 through the CMS Context boundary."
  defdelegate community_applications_logo(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :logo

  @doc "Delegates GroupherServer.CMS.CommunityApplications.mark_creation_failed/3 through the CMS Context boundary."
  defdelegate community_applications_mark_creation_failed(arg1, arg2, arg3),
    to: GroupherServer.CMS.CommunityApplications,
    as: :mark_creation_failed

  @doc "Delegates GroupherServer.CMS.CommunityApplications.reject/4 through the CMS Context boundary."
  defdelegate community_applications_reject(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.CommunityApplications,
    as: :reject

  @doc "Delegates GroupherServer.CMS.CommunityApplications.reject/5 through the CMS Context boundary."
  defdelegate community_applications_reject(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.CommunityApplications,
    as: :reject

  @doc "Delegates GroupherServer.CMS.CommunityApplications.retry_creation/3 through the CMS Context boundary."
  defdelegate community_applications_retry_creation(arg1, arg2, arg3),
    to: GroupherServer.CMS.CommunityApplications,
    as: :retry_creation

  @doc "Delegates GroupherServer.CMS.CommunityApplications.retry_creation/4 through the CMS Context boundary."
  defdelegate community_applications_retry_creation(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.CommunityApplications,
    as: :retry_creation

  @doc "Delegates GroupherServer.CMS.CommunityApplications.retry_setup/4 through the CMS Context boundary."
  defdelegate community_applications_retry_setup(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.CommunityApplications,
    as: :retry_setup

  @doc "Delegates GroupherServer.CMS.CommunityApplications.review_detail/2 through the CMS Context boundary."
  defdelegate community_applications_review_detail(arg1, arg2),
    to: GroupherServer.CMS.CommunityApplications,
    as: :review_detail

  @doc "Delegates GroupherServer.CMS.CommunityApplications.review_queue_by_public_filter/2 through the CMS Context boundary."
  defdelegate community_applications_review_queue_by_public_filter(arg1, arg2),
    to: GroupherServer.CMS.CommunityApplications,
    as: :review_queue_by_public_filter

  @doc "Delegates GroupherServer.CMS.CommunityApplications.reviewer/1 through the CMS Context boundary."
  defdelegate community_applications_reviewer(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :reviewer

  @doc "Delegates GroupherServer.CMS.CommunityApplications.start_review/3 through the CMS Context boundary."
  defdelegate community_applications_start_review(arg1, arg2, arg3),
    to: GroupherServer.CMS.CommunityApplications,
    as: :start_review

  @doc "Delegates GroupherServer.CMS.CommunityApplications.start_review/4 through the CMS Context boundary."
  defdelegate community_applications_start_review(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.CommunityApplications,
    as: :start_review

  @doc "Delegates GroupherServer.CMS.CommunityApplications.state/1 through the CMS Context boundary."
  defdelegate community_applications_state(arg1),
    to: GroupherServer.CMS.CommunityApplications,
    as: :state

  @doc "Delegates GroupherServer.CMS.CommunityApplications.submit/3 through the CMS Context boundary."
  defdelegate community_applications_submit(arg1, arg2, arg3),
    to: GroupherServer.CMS.CommunityApplications,
    as: :submit

  @doc "Delegates GroupherServer.CMS.Dashboard.save_custom_theme_preset/2 through the CMS Context boundary."
  defdelegate dashboard_save_custom_theme_preset(arg1, arg2),
    to: GroupherServer.CMS.Dashboard,
    as: :save_custom_theme_preset

  @doc "Delegates GroupherServer.CMS.Dashboard.save_custom_theme_preset/3 through the CMS Context boundary."
  defdelegate dashboard_save_custom_theme_preset(arg1, arg2, arg3),
    to: GroupherServer.CMS.Dashboard,
    as: :save_custom_theme_preset

  @doc "Delegates GroupherServer.CMS.Dashboard.save_custom_theme_preset/4 through the CMS Context boundary."
  defdelegate dashboard_save_custom_theme_preset(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Dashboard,
    as: :save_custom_theme_preset

  @doc "Delegates GroupherServer.CMS.Dashboard.select_theme_preset/2 through the CMS Context boundary."
  defdelegate dashboard_select_theme_preset(arg1, arg2),
    to: GroupherServer.CMS.Dashboard,
    as: :select_theme_preset

  @doc "Delegates GroupherServer.CMS.Dashboard.select_theme_preset/3 through the CMS Context boundary."
  defdelegate dashboard_select_theme_preset(arg1, arg2, arg3),
    to: GroupherServer.CMS.Dashboard,
    as: :select_theme_preset

  @doc "Delegates GroupherServer.CMS.Dashboard.select_theme_preset/4 through the CMS Context boundary."
  defdelegate dashboard_select_theme_preset(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Dashboard,
    as: :select_theme_preset

  @doc "Delegates GroupherServer.CMS.Dashboard.update/2 through the CMS Context boundary."
  defdelegate dashboard_update(arg1, arg2), to: GroupherServer.CMS.Dashboard, as: :update

  @doc "Delegates GroupherServer.CMS.Dashboard.update/3 through the CMS Context boundary."
  defdelegate dashboard_update(arg1, arg2, arg3), to: GroupherServer.CMS.Dashboard, as: :update

  @doc "Delegates GroupherServer.CMS.Dashboard.update/4 through the CMS Context boundary."
  defdelegate dashboard_update(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Dashboard,
    as: :update

  @doc "Delegates GroupherServer.CMS.Dashboard.update/5 through the CMS Context boundary."
  defdelegate dashboard_update(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Dashboard,
    as: :update

  @doc "Delegates GroupherServer.CMS.DocCover.add_card/4 through the CMS Context boundary."
  defdelegate doc_cover_add_card(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocCover,
    as: :add_card

  @doc "Delegates GroupherServer.CMS.DocCover.pin_doc/4 through the CMS Context boundary."
  defdelegate doc_cover_pin_doc(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocCover,
    as: :pin_doc

  @doc "Delegates GroupherServer.CMS.DocCover.read/1 through the CMS Context boundary."
  defdelegate doc_cover_read(arg1), to: GroupherServer.CMS.DocCover, as: :read

  @doc "Delegates GroupherServer.CMS.DocCover.read/2 through the CMS Context boundary."
  defdelegate doc_cover_read(arg1, arg2), to: GroupherServer.CMS.DocCover, as: :read

  @doc "Delegates GroupherServer.CMS.DocCover.read/3 through the CMS Context boundary."
  defdelegate doc_cover_read(arg1, arg2, arg3), to: GroupherServer.CMS.DocCover, as: :read

  @doc "Delegates GroupherServer.CMS.DocCover.remove_card/4 through the CMS Context boundary."
  defdelegate doc_cover_remove_card(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocCover,
    as: :remove_card

  @doc "Delegates GroupherServer.CMS.DocCover.reorder_cards/4 through the CMS Context boundary."
  defdelegate doc_cover_reorder_cards(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocCover,
    as: :reorder_cards

  @doc "Delegates GroupherServer.CMS.DocCover.reorder_pinned_docs/4 through the CMS Context boundary."
  defdelegate doc_cover_reorder_pinned_docs(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocCover,
    as: :reorder_pinned_docs

  @doc "Delegates GroupherServer.CMS.DocCover.unpin_doc/4 through the CMS Context boundary."
  defdelegate doc_cover_unpin_doc(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocCover,
    as: :unpin_doc

  @doc "Delegates GroupherServer.CMS.DocCover.update_card_appearance/5 through the CMS Context boundary."
  defdelegate doc_cover_update_card_appearance(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.DocCover,
    as: :update_card_appearance

  @doc "Delegates GroupherServer.CMS.DocCover.update_pinned_doc_appearance/5 through the CMS Context boundary."
  defdelegate doc_cover_update_pinned_doc_appearance(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.DocCover,
    as: :update_pinned_doc_appearance

  @doc "Delegates the explicit internal DocTree create-node entry."
  defdelegate doc_tree_create_node_internal(arg1, arg2),
    to: GroupherServer.CMS.DocTree,
    as: :create_node_internal

  defdelegate doc_tree_create_node_internal(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :create_node_internal

  defdelegate doc_tree_create_node_receipt(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :create_node_receipt

  @doc "Delegates the explicit internal DocTree delete-node entry."
  defdelegate doc_tree_delete_node_internal(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :delete_node_internal

  @doc "Delegates GroupherServer.CMS.DocTree.delete_node/4 through the CMS Context boundary."
  defdelegate doc_tree_delete_node(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :delete_node

  @doc "Delegates the explicit internal DocTree duplicate-node entry."
  defdelegate doc_tree_duplicate_node_internal(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :duplicate_node_internal

  @doc "Delegates GroupherServer.CMS.DocTree.duplicate_node/4 through the CMS Context boundary."
  defdelegate doc_tree_duplicate_node(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :duplicate_node

  @doc "Delegates GroupherServer.CMS.DocTree.move_doc_to_draft_result/3 through the CMS Context boundary."
  defdelegate doc_tree_move_doc_to_draft_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :move_doc_to_draft_result

  @doc "Delegates GroupherServer.CMS.DocTree.move_doc_to_draft_result/4 through the CMS Context boundary."
  defdelegate doc_tree_move_doc_to_draft_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :move_doc_to_draft_result

  @doc "Delegates the explicit internal DocTree move-node entry."
  defdelegate doc_tree_move_node_internal(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :move_node_internal

  @doc "Delegates GroupherServer.CMS.DocTree.move_node/4 through the CMS Context boundary."
  defdelegate doc_tree_move_node(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :move_node

  @doc "Delegates GroupherServer.CMS.DocTree.move_subtree_to_draft/3 through the CMS Context boundary."
  defdelegate doc_tree_move_subtree_to_draft(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :move_subtree_to_draft

  @doc "Delegates GroupherServer.CMS.DocTree.move_subtree_to_draft/4 through the CMS Context boundary."
  defdelegate doc_tree_move_subtree_to_draft(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :move_subtree_to_draft

  @doc "Delegates GroupherServer.CMS.DocTree.publish_changes/3 through the CMS Context boundary."
  defdelegate doc_tree_publish_changes(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :publish_changes

  @doc "Delegates GroupherServer.CMS.DocTree.publish_changes/4 through the CMS Context boundary."
  defdelegate doc_tree_publish_changes(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :publish_changes

  @doc "Delegates GroupherServer.CMS.DocTree.publish_checklist/1 through the CMS Context boundary."
  defdelegate doc_tree_publish_checklist(arg1),
    to: GroupherServer.CMS.DocTree,
    as: :publish_checklist

  @doc "Delegates GroupherServer.CMS.DocTree.publish_checklist/2 through the CMS Context boundary."
  defdelegate doc_tree_publish_checklist(arg1, arg2),
    to: GroupherServer.CMS.DocTree,
    as: :publish_checklist

  @doc "Delegates GroupherServer.CMS.DocTree.read_public/1 through the CMS Context boundary."
  defdelegate doc_tree_read_public(arg1), to: GroupherServer.CMS.DocTree, as: :read_public

  @doc "Delegates GroupherServer.CMS.DocTree.read_public/2 through the CMS Context boundary."
  defdelegate doc_tree_read_public(arg1, arg2), to: GroupherServer.CMS.DocTree, as: :read_public

  @doc "Delegates GroupherServer.CMS.DocTree.read/1 through the CMS Context boundary."
  defdelegate doc_tree_read(arg1), to: GroupherServer.CMS.DocTree, as: :read

  @doc "Delegates GroupherServer.CMS.DocTree.read/2 through the CMS Context boundary."
  defdelegate doc_tree_read(arg1, arg2), to: GroupherServer.CMS.DocTree, as: :read

  @doc "Delegates the explicit internal DocTree restore-trash entry."
  defdelegate doc_tree_restore_trash_item_internal(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :restore_trash_item_internal

  @doc "Delegates GroupherServer.CMS.DocTree.restore_trash_item/4 through the CMS Context boundary."
  defdelegate doc_tree_restore_trash_item(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :restore_trash_item

  @doc "Delegates GroupherServer.CMS.DocTree.trash_items/1 through the CMS Context boundary."
  defdelegate doc_tree_trash_items(arg1), to: GroupherServer.CMS.DocTree, as: :trash_items

  @doc "Delegates GroupherServer.CMS.DocTree.trash_items/2 through the CMS Context boundary."
  defdelegate doc_tree_trash_items(arg1, arg2), to: GroupherServer.CMS.DocTree, as: :trash_items

  @doc "Delegates GroupherServer.CMS.DocTree.update_draft/4 through the CMS Context boundary."
  defdelegate doc_tree_update_draft(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :update_draft

  defdelegate doc_tree_update_draft(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.DocTree,
    as: :update_draft

  @doc "Delegates the explicit internal DocTree update-node entry."
  defdelegate doc_tree_update_node_internal(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree,
    as: :update_node_internal

  @doc "Delegates GroupherServer.CMS.DocTree.update_node/4 through the CMS Context boundary."
  defdelegate doc_tree_update_node(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree,
    as: :update_node

  @doc "Delegates GroupherServer.CMS.Docs.Branch.resolve/2 through the CMS Context boundary."
  defdelegate docs_branch_resolve(arg1, arg2), to: GroupherServer.CMS.Docs.Branch, as: :resolve

  @doc "Delegates GroupherServer.CMS.Docs.get_branch_version/3 through the CMS Context boundary."
  defdelegate docs_get_branch_version(arg1, arg2, arg3),
    to: GroupherServer.CMS.Docs,
    as: :get_branch_version

  @doc "Delegates GroupherServer.CMS.Docs.list_branch_versions/2 through the CMS Context boundary."
  defdelegate docs_list_branch_versions(arg1, arg2),
    to: GroupherServer.CMS.Docs,
    as: :list_branch_versions

  @doc "Delegates GroupherServer.CMS.Docs.list_branch_versions/3 through the CMS Context boundary."
  defdelegate docs_list_branch_versions(arg1, arg2, arg3),
    to: GroupherServer.CMS.Docs,
    as: :list_branch_versions

  @doc "Delegates GroupherServer.CMS.Docs.read_editor_head/2 through the CMS Context boundary."
  defdelegate docs_read_editor_head(arg1, arg2),
    to: GroupherServer.CMS.Docs,
    as: :read_editor_head

  @doc "Delegates GroupherServer.CMS.Docs.read_editor_head/3 through the CMS Context boundary."
  defdelegate docs_read_editor_head(arg1, arg2, arg3),
    to: GroupherServer.CMS.Docs,
    as: :read_editor_head

  @doc "Delegates GroupherServer.CMS.Docs.restore_revision_to_draft/4 through the CMS Context boundary."
  defdelegate docs_restore_revision_to_draft(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Docs,
    as: :restore_revision_to_draft

  @doc "Delegates GroupherServer.CMS.Docs.restore_revision_to_draft/5 through the CMS Context boundary."
  defdelegate docs_restore_revision_to_draft(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Docs,
    as: :restore_revision_to_draft

  @doc "Delegates GroupherServer.CMS.FrontDesk.community/1 through the CMS Context boundary."
  defdelegate front_desk_community(arg1), to: GroupherServer.CMS.FrontDesk, as: :community

  @doc "Delegates GroupherServer.CMS.FrontDesk.community/2 through the CMS Context boundary."
  defdelegate front_desk_community(arg1, arg2), to: GroupherServer.CMS.FrontDesk, as: :community

  @doc "Delegates GroupherServer.CMS.FrontDesk.community/3 through the CMS Context boundary."
  defdelegate front_desk_community(arg1, arg2, arg3),
    to: GroupherServer.CMS.FrontDesk,
    as: :community

  @doc "Delegates GroupherServer.CMS.Gate.ErrorCat.resource_not_found/0 through the CMS Context boundary."
  defdelegate gate_error_cat_resource_not_found(),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :resource_not_found

  @doc "Delegates GroupherServer.CMS.Gate.ErrorCat.resource_not_found/1 through the CMS Context boundary."
  defdelegate gate_error_cat_resource_not_found(arg1),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :resource_not_found

  @doc "Delegates GroupherServer.CMS.Interactions.article_states_for_paths/2 through the CMS Context boundary."
  defdelegate interactions_article_states_for_paths(arg1, arg2),
    to: GroupherServer.CMS.Interactions,
    as: :article_states_for_paths

  @doc "Delegates GroupherServer.CMS.Interactions.article_states_for_paths/3 through the CMS Context boundary."
  defdelegate interactions_article_states_for_paths(arg1, arg2, arg3),
    to: GroupherServer.CMS.Interactions,
    as: :article_states_for_paths

  @doc "Delegates GroupherServer.CMS.Interactions.collect/3 through the CMS Context boundary."
  defdelegate interactions_collect(arg1, arg2, arg3),
    to: GroupherServer.CMS.Interactions,
    as: :collect

  @doc "Delegates GroupherServer.CMS.Interactions.collected_users/2 through the CMS Context boundary."
  defdelegate interactions_collected_users(arg1, arg2),
    to: GroupherServer.CMS.Interactions,
    as: :collected_users

  @doc "Delegates GroupherServer.CMS.Interactions.counts/1 through the CMS Context boundary."
  defdelegate interactions_counts(arg1), to: GroupherServer.CMS.Interactions, as: :counts

  @doc "Delegates GroupherServer.CMS.Interactions.emotion_result/4 through the CMS Context boundary."
  defdelegate interactions_emotion_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Interactions,
    as: :emotion_result

  @doc "Delegates GroupherServer.CMS.Interactions.article_state/2 through the CMS Context boundary."
  defdelegate interactions_article_state(arg1, arg2),
    to: GroupherServer.CMS.Interactions,
    as: :article_state

  @doc "Delegates GroupherServer.CMS.Interactions.report_result/5 through the CMS Context boundary."
  defdelegate interactions_report_result(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Interactions,
    as: :report_result

  @doc "Delegates GroupherServer.CMS.Interactions.undo_collect/3 through the CMS Context boundary."
  defdelegate interactions_undo_collect(arg1, arg2, arg3),
    to: GroupherServer.CMS.Interactions,
    as: :undo_collect

  @doc "Delegates GroupherServer.CMS.Interactions.undo_emotion_result/4 through the CMS Context boundary."
  defdelegate interactions_undo_emotion_result(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Interactions,
    as: :undo_emotion_result

  @doc "Delegates GroupherServer.CMS.Interactions.undo_report_result/3 through the CMS Context boundary."
  defdelegate interactions_undo_report_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Interactions,
    as: :undo_report_result

  @doc "Delegates GroupherServer.CMS.Interactions.undo_upvote_result/3 through the CMS Context boundary."
  defdelegate interactions_undo_upvote_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Interactions,
    as: :undo_upvote_result

  @doc "Delegates GroupherServer.CMS.Interactions.upvote_result/3 through the CMS Context boundary."
  defdelegate interactions_upvote_result(arg1, arg2, arg3),
    to: GroupherServer.CMS.Interactions,
    as: :upvote_result

  @doc "Delegates GroupherServer.CMS.Interactions.upvoted_users/2 through the CMS Context boundary."
  defdelegate interactions_upvoted_users(arg1, arg2),
    to: GroupherServer.CMS.Interactions,
    as: :upvoted_users

  @doc "Delegates GroupherServer.CMS.Interactions.viewer_state/2 through the CMS Context boundary."
  defdelegate interactions_viewer_state(arg1, arg2),
    to: GroupherServer.CMS.Interactions,
    as: :viewer_state

  @doc "Delegates GroupherServer.CMS.Interactions.viewer_state/3 through the CMS Context boundary."
  defdelegate interactions_viewer_state(arg1, arg2, arg3),
    to: GroupherServer.CMS.Interactions,
    as: :viewer_state

  @doc "Delegates GroupherServer.CMS.Model.Embeds.ArticleMeta.default_meta/0 through the CMS Context boundary."
  defdelegate model_embeds_article_meta_default_meta(),
    to: GroupherServer.CMS.Model.Embeds.ArticleMeta,
    as: :default_meta

  @doc "Delegates GroupherServer.CMS.Model.Embeds.CommentEmotion.default_emotions/0 through the CMS Context boundary."
  defdelegate model_embeds_comment_emotion_default_emotions(),
    to: GroupherServer.CMS.Model.Embeds.CommentEmotion,
    as: :default_emotions

  @doc "Delegates GroupherServer.CMS.Model.Embeds.CommentMeta.default_meta/0 through the CMS Context boundary."
  defdelegate model_embeds_comment_meta_default_meta(),
    to: GroupherServer.CMS.Model.Embeds.CommentMeta,
    as: :default_meta

  @doc "Delegates GroupherServer.CMS.Model.Embeds.CommunityMeta.default_meta/0 through the CMS Context boundary."
  defdelegate model_embeds_community_meta_default_meta(),
    to: GroupherServer.CMS.Model.Embeds.CommunityMeta,
    as: :default_meta

  @doc "Delegates GroupherServer.CMS.Outbox.Workflow.perform/2 through the CMS Context boundary."
  defdelegate outbox_workflow_perform(arg1, arg2),
    to: GroupherServer.CMS.Outbox.Workflow,
    as: :perform

  @doc "Delegates GroupherServer.CMS.Press.article/1 through the CMS Context boundary."
  defdelegate press_article(arg1), to: GroupherServer.CMS.Press, as: :article

  @doc "Delegates GroupherServer.CMS.Press.community_rss_feed/1 through the CMS Context boundary."
  defdelegate press_community_rss_feed(arg1),
    to: GroupherServer.CMS.Press,
    as: :community_rss_feed

  @doc "Delegates GroupherServer.CMS.Press.community_rss_feed/2 through the CMS Context boundary."
  defdelegate press_community_rss_feed(arg1, arg2),
    to: GroupherServer.CMS.Press,
    as: :community_rss_feed

  @doc "Delegates GroupherServer.CMS.Press.config/1 through the CMS Context boundary."
  defdelegate press_config(arg1), to: GroupherServer.CMS.Press, as: :config

  @doc "Delegates GroupherServer.CMS.Press.site_manifest/1 through the CMS Context boundary."
  defdelegate press_site_manifest(arg1), to: GroupherServer.CMS.Press, as: :site_manifest

  @doc "Delegates GroupherServer.CMS.Press.thread_rss_feed/2 through the CMS Context boundary."
  defdelegate press_thread_rss_feed(arg1, arg2),
    to: GroupherServer.CMS.Press,
    as: :thread_rss_feed

  @doc "Delegates GroupherServer.CMS.Press.thread_rss_feed/3 through the CMS Context boundary."
  defdelegate press_thread_rss_feed(arg1, arg2, arg3),
    to: GroupherServer.CMS.Press,
    as: :thread_rss_feed

  @doc "Delegates GroupherServer.CMS.Press.update_config/3 through the CMS Context boundary."
  defdelegate press_update_config(arg1, arg2, arg3),
    to: GroupherServer.CMS.Press,
    as: :update_config

  @doc "Delegates GroupherServer.CMS.Press.update_config/4 through the CMS Context boundary."
  defdelegate press_update_config(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Press,
    as: :update_config

  @doc "Delegates GroupherServer.CMS.SearchArtiments.search/1 through the CMS Context boundary."
  defdelegate search_artiments_search(arg1), to: GroupherServer.CMS.SearchArtiments, as: :search

  @doc "Delegates GroupherServer.CMS.Search.community/1 through the CMS Context boundary."
  defdelegate search_community(arg1), to: GroupherServer.CMS.Search, as: :community

  @doc "Delegates GroupherServer.CMS.Search.community/2 through the CMS Context boundary."
  defdelegate search_community(arg1, arg2), to: GroupherServer.CMS.Search, as: :community

  @doc "Delegates GroupherServer.CMS.Search.community/3 through the CMS Context boundary."
  defdelegate search_community(arg1, arg2, arg3), to: GroupherServer.CMS.Search, as: :community

  @doc "Delegates GroupherServer.CMS.Snapshot.perform_refresh/3 through the CMS Context boundary."
  defdelegate snapshot_perform_refresh(arg1, arg2, arg3),
    to: GroupherServer.CMS.Snapshot,
    as: :perform_refresh

  @doc "Delegates GroupherServer.CMS.Trash.permanently_delete_action_in_scope/4 through the CMS Context boundary."
  defdelegate trash_permanently_delete_action_in_scope(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.Trash,
    as: :permanently_delete_action_in_scope

  @doc "Delegates GroupherServer.CMS.Trash.permanently_delete_action_in_scope/5 through the CMS Context boundary."
  defdelegate trash_permanently_delete_action_in_scope(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.Trash,
    as: :permanently_delete_action_in_scope

  @doc "Delegates GroupherServer.CMS.Trash.purge_due/0 through the CMS Context boundary."
  defdelegate trash_purge_due(), to: GroupherServer.CMS.Trash, as: :purge_due

  @doc "Delegates GroupherServer.CMS.Trash.purge_due/1 through the CMS Context boundary."
  defdelegate trash_purge_due(arg1), to: GroupherServer.CMS.Trash, as: :purge_due

  @doc "Delegates GroupherServer.CMS.ViewTracker.track/3 through the CMS Context boundary."
  defdelegate view_tracker_track(arg1, arg2, arg3), to: GroupherServer.CMS.ViewTracker, as: :track

  @doc "Delegates GroupherServer.CMS.ViewTracker.track/4 through the CMS Context boundary."
  defdelegate view_tracker_track(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.ViewTracker,
    as: :track

  @doc "Delegates GroupherServer.CMS.ViewTracker.viewer_states_for_paths/2 through the CMS Context boundary."
  defdelegate view_tracker_viewer_states_for_paths(arg1, arg2),
    to: GroupherServer.CMS.ViewTracker,
    as: :viewer_states_for_paths

  @doc "Delegates GroupherServer.CMS.ViewTracker.viewer_states_for_paths/3 through the CMS Context boundary."
  defdelegate view_tracker_viewer_states_for_paths(arg1, arg2, arg3),
    to: GroupherServer.CMS.ViewTracker,
    as: :viewer_states_for_paths

  @doc "Delegates GroupherServer.CMS.Wallpaper.batch_published?/1 through the CMS Context boundary."
  defdelegate wallpaper_batch_published?(arg1),
    to: GroupherServer.CMS.Wallpaper,
    as: :batch_published?

  @doc "Delegates GroupherServer.CMS.Wallpaper.prepare_upload/3 through the CMS Context boundary."
  defdelegate wallpaper_prepare_upload(arg1, arg2, arg3),
    to: GroupherServer.CMS.Wallpaper,
    as: :prepare_upload

  @doc "Delegates GroupherServer.CMS.Wallpaper.publish/3 through the CMS Context boundary."
  defdelegate wallpaper_publish(arg1, arg2, arg3), to: GroupherServer.CMS.Wallpaper, as: :publish

  @doc "Delegates GroupherServer.CMS.Wallpaper.reconcile_lifecycle/0 through the CMS Context boundary."
  defdelegate wallpaper_reconcile_lifecycle(),
    to: GroupherServer.CMS.Wallpaper,
    as: :reconcile_lifecycle

  @doc "Delegates GroupherServer.CMS.Wallpaper.restore_snapshot/3 through the CMS Context boundary."
  defdelegate wallpaper_restore_snapshot(arg1, arg2, arg3),
    to: GroupherServer.CMS.Wallpaper,
    as: :restore_snapshot

  @doc "Delegates GroupherServer.CMS.Wallpaper.wallpaper_history/2 through the CMS Context boundary."
  defdelegate wallpaper_wallpaper_history(arg1, arg2),
    to: GroupherServer.CMS.Wallpaper,
    as: :wallpaper_history

  @doc "Delegates GroupherServer.CMS.Wallpaper.wallpaper_settings/1 through the CMS Context boundary."
  defdelegate wallpaper_wallpaper_settings(arg1),
    to: GroupherServer.CMS.Wallpaper,
    as: :wallpaper_settings

  @doc "Delegates GroupherServer.CMS.Wallpaper.wallpaper/1 through the CMS Context boundary."
  defdelegate wallpaper_wallpaper(arg1), to: GroupherServer.CMS.Wallpaper, as: :wallpaper

  @doc "Delegates CMS.Command.execute/2 through the CMS Context boundary."
  defdelegate command_execute(arg1, arg2), to: GroupherServer.CMS.Command, as: :execute

  @doc "Delegates CMS.Interactions.Persist.find_collect/2 through the CMS Context boundary."
  defdelegate interactions_persist_find_collect(arg1, arg2),
    to: GroupherServer.CMS.Interactions.Persist,
    as: :find_collect

  @doc "Delegates CMS.Interactions.Persist.attach_collect_folder/2 through the CMS Context boundary."
  defdelegate interactions_persist_attach_collect_folder(arg1, arg2),
    to: GroupherServer.CMS.Interactions.Persist,
    as: :attach_collect_folder

  @doc "Delegates CMS.Interactions.Persist.detach_collect_folder/2 through the CMS Context boundary."
  defdelegate interactions_persist_detach_collect_folder(arg1, arg2),
    to: GroupherServer.CMS.Interactions.Persist,
    as: :detach_collect_folder

  @doc "Delegates CMS.QueryBuilder.filter_pack/2 through the CMS Context boundary."
  defdelegate query_builder_filter_pack(arg1, arg2),
    to: GroupherServer.CMS.QueryBuilder,
    as: :filter_pack

  @doc "Delegates CMS.Gate.Context.Scope.Article.draft/1 through the CMS Context boundary."
  defdelegate gate_context_scope_article_draft(arg1),
    to: GroupherServer.CMS.Gate.Context.Scope.Article,
    as: :draft

  @doc "Delegates CMS.Gate.Context.Scope.Article.draft/2 through the CMS Context boundary."
  defdelegate gate_context_scope_article_draft(arg1, arg2),
    to: GroupherServer.CMS.Gate.Context.Scope.Article,
    as: :draft

  @doc "Delegates CMS.Gate.Context.Scope.Article.draft/3 through the CMS Context boundary."
  defdelegate gate_context_scope_article_draft(arg1, arg2, arg3),
    to: GroupherServer.CMS.Gate.Context.Scope.Article,
    as: :draft

  @doc "Delegates CMS.Articles.ErrorCat.not_exist/0 through the CMS Context boundary."
  defdelegate articles_error_cat_not_exist(),
    to: GroupherServer.CMS.Articles.ErrorCat,
    as: :not_exist

  @doc "Delegates CMS.Articles.ErrorCat.not_exist/1 through the CMS Context boundary."
  defdelegate articles_error_cat_not_exist(arg1),
    to: GroupherServer.CMS.Articles.ErrorCat,
    as: :not_exist

  @doc "Delegates CMS.Gate.Context.Scope.Doc.draft/1 through the CMS Context boundary."
  defdelegate gate_context_scope_doc_draft(arg1),
    to: GroupherServer.CMS.Gate.Context.Scope.Doc,
    as: :draft

  @doc "Delegates CMS.Gate.Context.Scope.Doc.draft/2 through the CMS Context boundary."
  defdelegate gate_context_scope_doc_draft(arg1, arg2),
    to: GroupherServer.CMS.Gate.Context.Scope.Doc,
    as: :draft

  @doc "Delegates CMS.Gate.Context.Scope.Doc.draft/3 through the CMS Context boundary."
  defdelegate gate_context_scope_doc_draft(arg1, arg2, arg3),
    to: GroupherServer.CMS.Gate.Context.Scope.Doc,
    as: :draft

  @doc "Delegates CMS.Gate.Context.Scope.Article.public/1 through the CMS Context boundary."
  defdelegate gate_context_scope_article_public(arg1),
    to: GroupherServer.CMS.Gate.Context.Scope.Article,
    as: :public

  @doc "Delegates CMS.Gate.Context.Scope.Article.public/2 through the CMS Context boundary."
  defdelegate gate_context_scope_article_public(arg1, arg2),
    to: GroupherServer.CMS.Gate.Context.Scope.Article,
    as: :public

  @doc "Delegates CMS.Gate.scope/4 through the CMS Context boundary."
  defdelegate gate_scope(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Gate, as: :scope

  @doc "Delegates CMS.Gate.Context.Scope.Doc.public_branch/1 through the CMS Context boundary."
  defdelegate gate_context_scope_doc_public_branch(arg1),
    to: GroupherServer.CMS.Gate.Context.Scope.Doc,
    as: :public_branch

  @doc "Delegates CMS.Gate.Context.Scope.Doc.public_branch/2 through the CMS Context boundary."
  defdelegate gate_context_scope_doc_public_branch(arg1, arg2),
    to: GroupherServer.CMS.Gate.Context.Scope.Doc,
    as: :public_branch

  @doc "Delegates CMS.Artiment.Matcher.match/1 through the CMS Context boundary."
  defdelegate artiment_matcher_match(arg1), to: GroupherServer.CMS.Artiment.Matcher, as: :match

  @doc "Delegates CMS.Artiment.Matcher.match/3 through the CMS Context boundary."
  defdelegate artiment_matcher_match(arg1, arg2, arg3),
    to: GroupherServer.CMS.Artiment.Matcher,
    as: :match

  @doc "Delegates CMS.Passport.Authorization.check/2 through the CMS Context boundary."
  defdelegate passport_authorization_check(arg1, arg2),
    to: GroupherServer.CMS.Passport.Authorization,
    as: :check

  @doc "Delegates CMS.Passport.Authorization.check/3 through the CMS Context boundary."
  defdelegate passport_authorization_check(arg1, arg2, arg3),
    to: GroupherServer.CMS.Passport.Authorization,
    as: :check

  @doc "Delegates CMS.Artiment.Matcher.match_interaction/1 through the CMS Context boundary."
  defdelegate artiment_matcher_match_interaction(arg1),
    to: GroupherServer.CMS.Artiment.Matcher,
    as: :match_interaction

  @doc "Delegates CMS.ErrorCat.unexpected_external_response/0 through the CMS Context boundary."
  defdelegate error_cat_unexpected_external_response(),
    to: GroupherServer.CMS.ErrorCat,
    as: :unexpected_external_response

  @doc "Delegates CMS.ErrorCat.unexpected_external_response/1 through the CMS Context boundary."
  defdelegate error_cat_unexpected_external_response(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :unexpected_external_response

  @doc "Delegates CMS.ErrorCat.external_unavailable/0 through the CMS Context boundary."
  defdelegate error_cat_external_unavailable(),
    to: GroupherServer.CMS.ErrorCat,
    as: :external_unavailable

  @doc "Delegates CMS.ErrorCat.external_unavailable/1 through the CMS Context boundary."
  defdelegate error_cat_external_unavailable(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :external_unavailable

  @doc "Delegates CMS.ErrorCat.external_not_found/0 through the CMS Context boundary."
  defdelegate error_cat_external_not_found(),
    to: GroupherServer.CMS.ErrorCat,
    as: :external_not_found

  @doc "Delegates CMS.ErrorCat.external_not_found/1 through the CMS Context boundary."
  defdelegate error_cat_external_not_found(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :external_not_found

  @doc "Delegates CMS.ErrorCat.not_configured/0 through the CMS Context boundary."
  defdelegate error_cat_not_configured(), to: GroupherServer.CMS.ErrorCat, as: :not_configured

  @doc "Delegates CMS.ErrorCat.not_configured/1 through the CMS Context boundary."
  defdelegate error_cat_not_configured(arg1), to: GroupherServer.CMS.ErrorCat, as: :not_configured

  @doc "Delegates CMS.Dashboard.Persist.get_or_insert_dashboard/1 through the CMS Context boundary."
  defdelegate dashboard_persist_get_or_insert_dashboard(arg1),
    to: GroupherServer.CMS.Dashboard.Persist,
    as: :get_or_insert_dashboard

  @doc "Delegates CMS.ErrorCat.community_not_persisted/0 through the CMS Context boundary."
  defdelegate error_cat_community_not_persisted(),
    to: GroupherServer.CMS.ErrorCat,
    as: :community_not_persisted

  @doc "Delegates CMS.ErrorCat.community_not_persisted/1 through the CMS Context boundary."
  defdelegate error_cat_community_not_persisted(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :community_not_persisted

  @doc "Delegates CMS.Dashboard.Persist.get_dashboard/1 through the CMS Context boundary."
  defdelegate dashboard_persist_get_dashboard(arg1),
    to: GroupherServer.CMS.Dashboard.Persist,
    as: :get_dashboard

  @doc "Delegates CMS.Dashboard.Persist.update_website_id/2 through the CMS Context boundary."
  defdelegate dashboard_persist_update_website_id(arg1, arg2),
    to: GroupherServer.CMS.Dashboard.Persist,
    as: :update_website_id

  @doc "Delegates CMS.ErrorCat.dashboard_not_found/0 through the CMS Context boundary."
  defdelegate error_cat_dashboard_not_found(),
    to: GroupherServer.CMS.ErrorCat,
    as: :dashboard_not_found

  @doc "Delegates CMS.ErrorCat.dashboard_not_found/1 through the CMS Context boundary."
  defdelegate error_cat_dashboard_not_found(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :dashboard_not_found

  @doc "Delegates CMS.FrontDesk.comment/1 through the CMS Context boundary."
  defdelegate front_desk_comment(arg1), to: GroupherServer.CMS.FrontDesk, as: :comment

  @doc "Delegates CMS.FrontDesk.comment/2 through the CMS Context boundary."
  defdelegate front_desk_comment(arg1, arg2), to: GroupherServer.CMS.FrontDesk, as: :comment

  @doc "Delegates CMS.FrontDesk.comment/3 through the CMS Context boundary."
  defdelegate front_desk_comment(arg1, arg2, arg3), to: GroupherServer.CMS.FrontDesk, as: :comment

  @doc "Delegates CMS.FrontDesk.article/1 through the CMS Context boundary."
  defdelegate front_desk_article(arg1), to: GroupherServer.CMS.FrontDesk, as: :article

  @doc "Delegates CMS.FrontDesk.article/2 through the CMS Context boundary."
  defdelegate front_desk_article(arg1, arg2), to: GroupherServer.CMS.FrontDesk, as: :article

  @doc "Delegates CMS.FrontDesk.article/3 through the CMS Context boundary."
  defdelegate front_desk_article(arg1, arg2, arg3), to: GroupherServer.CMS.FrontDesk, as: :article

  @doc "Delegates CMS.FrontDesk.articles/1 through the CMS Context boundary."
  defdelegate front_desk_articles(arg1), to: GroupherServer.CMS.FrontDesk, as: :articles

  @doc "Delegates CMS.FrontDesk.article_author/1 through the CMS Context boundary."
  defdelegate front_desk_article_author(arg1),
    to: GroupherServer.CMS.FrontDesk,
    as: :article_author

  @doc "Delegates CMS.FrontDesk.article_of/1 through the CMS Context boundary."
  defdelegate front_desk_article_of(arg1), to: GroupherServer.CMS.FrontDesk, as: :article_of

  @doc "Delegates CMS.FrontDesk.thread_of/1 through the CMS Context boundary."
  defdelegate front_desk_thread_of(arg1), to: GroupherServer.CMS.FrontDesk, as: :thread_of

  @doc "Delegates CMS.FrontDesk.community_tag/1 through the CMS Context boundary."
  defdelegate front_desk_community_tag(arg1), to: GroupherServer.CMS.FrontDesk, as: :community_tag

  @doc "Delegates CMS.FrontDesk.community_tag/3 through the CMS Context boundary."
  defdelegate front_desk_community_tag(arg1, arg2, arg3),
    to: GroupherServer.CMS.FrontDesk,
    as: :community_tag

  @doc "Delegates CMS.FrontDesk.community_tag_group/1 through the CMS Context boundary."
  defdelegate front_desk_community_tag_group(arg1),
    to: GroupherServer.CMS.FrontDesk,
    as: :community_tag_group

  @doc "Delegates CMS.Command.Receipt.prune_expired/0 through the CMS Context boundary."
  defdelegate command_receipt_prune_expired(),
    to: GroupherServer.CMS.Command.Receipt,
    as: :prune_expired

  @doc "Delegates CMS.Command.Receipt.prune_expired/1 through the CMS Context boundary."
  defdelegate command_receipt_prune_expired(arg1),
    to: GroupherServer.CMS.Command.Receipt,
    as: :prune_expired

  @doc "Delegates CMS.Events.emit/2 through the CMS Context boundary."
  defdelegate events_emit(arg1, arg2), to: GroupherServer.CMS.Events, as: :emit

  @doc "Delegates CMS.Events.emit/3 through the CMS Context boundary."
  defdelegate events_emit(arg1, arg2, arg3), to: GroupherServer.CMS.Events, as: :emit

  @doc "Delegates CMS.SearchArtiments.Indexer.upsert_article/2 through the CMS Context boundary."
  defdelegate search_artiments_indexer_upsert_article(arg1, arg2),
    to: GroupherServer.CMS.SearchArtiments.Indexer,
    as: :upsert_article

  @doc "Delegates CMS.SearchArtiments.Indexer.sync_article_metrics/2 through the CMS Context boundary."
  defdelegate search_artiments_indexer_sync_article_metrics(arg1, arg2),
    to: GroupherServer.CMS.SearchArtiments.Indexer,
    as: :sync_article_metrics

  @doc "Delegates CMS.SearchArtiments.Indexer.delete_article/2 through the CMS Context boundary."
  defdelegate search_artiments_indexer_delete_article(arg1, arg2),
    to: GroupherServer.CMS.SearchArtiments.Indexer,
    as: :delete_article

  @doc "Delegates CMS.ViewTracker.cleanup_expired/0 through the CMS Context boundary."
  defdelegate view_tracker_cleanup_expired(),
    to: GroupherServer.CMS.ViewTracker,
    as: :cleanup_expired

  @doc "Delegates CMS.Artiment.Threads.to_atom/1 through the CMS Context boundary."
  defdelegate artiment_threads_to_atom(arg1),
    to: GroupherServer.CMS.Artiment.Threads,
    as: :to_atom

  @doc "Delegates CMS.Artiment.Threads.enums/0 through the CMS Context boundary."
  defdelegate artiment_threads_enums(), to: GroupherServer.CMS.Artiment.Threads, as: :enums

  @doc "Delegates CMS.ErrorCat.invalid_notify_payload/0 through the CMS Context boundary."
  defdelegate error_cat_invalid_notify_payload(),
    to: GroupherServer.CMS.ErrorCat,
    as: :invalid_notify_payload

  @doc "Delegates CMS.ErrorCat.invalid_notify_payload/1 through the CMS Context boundary."
  defdelegate error_cat_invalid_notify_payload(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :invalid_notify_payload

  @doc "Delegates CMS.ErrorCat.invalid_body/0 through the CMS Context boundary."
  defdelegate error_cat_invalid_body(), to: GroupherServer.CMS.ErrorCat, as: :invalid_body

  @doc "Delegates CMS.ErrorCat.invalid_body/1 through the CMS Context boundary."
  defdelegate error_cat_invalid_body(arg1), to: GroupherServer.CMS.ErrorCat, as: :invalid_body

  @doc "Delegates CMS.ViewTracker.AnonymousSession.ensure/1 through the CMS Context boundary."
  defdelegate view_tracker_anonymous_session_ensure(arg1),
    to: GroupherServer.CMS.ViewTracker.AnonymousSession,
    as: :ensure

  @doc "Delegates CMS.Communities.ErrorCat.not_exist/0 through the CMS Context boundary."
  defdelegate communities_error_cat_not_exist(),
    to: GroupherServer.CMS.Communities.ErrorCat,
    as: :not_exist

  @doc "Delegates CMS.Communities.ErrorCat.not_exist/1 through the CMS Context boundary."
  defdelegate communities_error_cat_not_exist(arg1),
    to: GroupherServer.CMS.Communities.ErrorCat,
    as: :not_exist

  @doc "Delegates CMS.Comments.ErrorCat.not_exist/0 through the CMS Context boundary."
  defdelegate comments_error_cat_not_exist(),
    to: GroupherServer.CMS.Comments.ErrorCat,
    as: :not_exist

  @doc "Delegates CMS.Comments.ErrorCat.not_exist/1 through the CMS Context boundary."
  defdelegate comments_error_cat_not_exist(arg1),
    to: GroupherServer.CMS.Comments.ErrorCat,
    as: :not_exist

  @doc "Delegates CMS.Passport.Registry.requirement/1 through the CMS Context boundary."
  defdelegate passport_registry_requirement(arg1),
    to: GroupherServer.CMS.Passport.Registry,
    as: :requirement

  @doc "Delegates CMS.Passport.ErrorCat.passport/0 through the CMS Context boundary."
  defdelegate passport_error_cat_passport(),
    to: GroupherServer.CMS.Passport.ErrorCat,
    as: :passport

  @doc "Delegates CMS.Passport.ErrorCat.passport/1 through the CMS Context boundary."
  defdelegate passport_error_cat_passport(arg1),
    to: GroupherServer.CMS.Passport.ErrorCat,
    as: :passport

  @doc "Delegates CMS.ErrorCat.missing_passport/0 through the CMS Context boundary."
  defdelegate error_cat_missing_passport(), to: GroupherServer.CMS.ErrorCat, as: :missing_passport

  @doc "Delegates CMS.ErrorCat.missing_passport/1 through the CMS Context boundary."
  defdelegate error_cat_missing_passport(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :missing_passport

  @doc "Delegates CMS.Passport.Registry.normalize_rules/1 through the CMS Context boundary."
  defdelegate passport_registry_normalize_rules(arg1),
    to: GroupherServer.CMS.Passport.Registry,
    as: :normalize_rules

  @doc "Delegates CMS.ErrorCat.invalid_requirement/0 through the CMS Context boundary."
  defdelegate error_cat_invalid_requirement(),
    to: GroupherServer.CMS.ErrorCat,
    as: :invalid_requirement

  @doc "Delegates CMS.ErrorCat.invalid_requirement/1 through the CMS Context boundary."
  defdelegate error_cat_invalid_requirement(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :invalid_requirement

  @doc "Delegates CMS.ErrorCat.missing_thread/0 through the CMS Context boundary."
  defdelegate error_cat_missing_thread(), to: GroupherServer.CMS.ErrorCat, as: :missing_thread

  @doc "Delegates CMS.ErrorCat.missing_thread/1 through the CMS Context boundary."
  defdelegate error_cat_missing_thread(arg1), to: GroupherServer.CMS.ErrorCat, as: :missing_thread

  @doc "Delegates CMS.ErrorCat.missing_community/0 through the CMS Context boundary."
  defdelegate error_cat_missing_community(),
    to: GroupherServer.CMS.ErrorCat,
    as: :missing_community

  @doc "Delegates CMS.ErrorCat.missing_community/1 through the CMS Context boundary."
  defdelegate error_cat_missing_community(arg1),
    to: GroupherServer.CMS.ErrorCat,
    as: :missing_community

  @doc "Delegates CMS.Gate.RateLimit.Publish.check/1 through the CMS Context boundary."
  defdelegate gate_rate_limit_publish_check(arg1),
    to: GroupherServer.CMS.Gate.RateLimit.Publish,
    as: :check

  @doc "Delegates CMS.Gate.RateLimit.Publish.check/2 through the CMS Context boundary."
  defdelegate gate_rate_limit_publish_check(arg1, arg2),
    to: GroupherServer.CMS.Gate.RateLimit.Publish,
    as: :check

  @doc "Delegates CMS.Gate.ErrorCat.throttle_interval/0 through the CMS Context boundary."
  defdelegate gate_error_cat_throttle_interval(),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :throttle_interval

  @doc "Delegates CMS.Gate.ErrorCat.throttle_interval/1 through the CMS Context boundary."
  defdelegate gate_error_cat_throttle_interval(arg1),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :throttle_interval

  @doc "Delegates CMS.Gate.ErrorCat.throttle_hour/0 through the CMS Context boundary."
  defdelegate gate_error_cat_throttle_hour(),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :throttle_hour

  @doc "Delegates CMS.Gate.ErrorCat.throttle_hour/1 through the CMS Context boundary."
  defdelegate gate_error_cat_throttle_hour(arg1),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :throttle_hour

  @doc "Delegates CMS.Gate.ErrorCat.throttle_day/0 through the CMS Context boundary."
  defdelegate gate_error_cat_throttle_day(),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :throttle_day

  @doc "Delegates CMS.Gate.ErrorCat.throttle_day/1 through the CMS Context boundary."
  defdelegate gate_error_cat_throttle_day(arg1),
    to: GroupherServer.CMS.Gate.ErrorCat,
    as: :throttle_day

  @doc "Delegates CMS.Passport.Registry.all_rules/1 through the CMS Context boundary."
  defdelegate passport_registry_all_rules(arg1),
    to: GroupherServer.CMS.Passport.Registry,
    as: :all_rules

  @doc "Delegates CMS.Passport.Registry.all_rules/2 through the CMS Context boundary."
  defdelegate passport_registry_all_rules(arg1, arg2),
    to: GroupherServer.CMS.Passport.Registry,
    as: :all_rules

  @doc "Delegates CMS.ErrorCat.custom/0 through the CMS Context boundary."
  defdelegate error_cat_custom(), to: GroupherServer.CMS.ErrorCat, as: :custom

  @doc "Delegates CMS.ErrorCat.custom/1 through the CMS Context boundary."
  defdelegate error_cat_custom(arg1), to: GroupherServer.CMS.ErrorCat, as: :custom

  @doc "Delegates CMS.ContentImport.DocValidator.preview/3 through the CMS Context boundary."
  defdelegate content_import_doc_validator_preview(arg1, arg2, arg3),
    to: GroupherServer.CMS.ContentImport.DocValidator,
    as: :preview

  @doc "Delegates CMS.DocTree.Workflows.ContentImport.apply/2 through the CMS Context boundary."
  defdelegate doc_tree_workflows_content_import_apply(arg1, arg2),
    to: GroupherServer.CMS.DocTree.Workflows.ContentImport,
    as: :apply

  @doc "Delegates CMS.Marker.field/2 through the CMS Context boundary."
  defdelegate marker_field(arg1, arg2), to: GroupherServer.CMS.Marker, as: :field

  @doc "Delegates CMS.Passport.Registry.root_passport_item_count/0 through the CMS Context boundary."
  defdelegate passport_registry_root_passport_item_count(),
    to: GroupherServer.CMS.Passport.Registry,
    as: :root_passport_item_count

  @doc "Delegates CMS.Dashboard.Fields.macro_schema/1 through the CMS Context boundary."
  defdelegate dashboard_fields_macro_schema(arg1),
    to: GroupherServer.CMS.Dashboard.Fields,
    as: :macro_schema

  @doc "Delegates CMS.Dashboard.Fields.enum_values/1 through the CMS Context boundary."
  defdelegate dashboard_fields_enum_values(arg1),
    to: GroupherServer.CMS.Dashboard.Fields,
    as: :enum_values

  @doc "Delegates CMS.Dashboard.Fields.rainbow_colors/0 through the CMS Context boundary."
  defdelegate dashboard_fields_rainbow_colors(),
    to: GroupherServer.CMS.Dashboard.Fields,
    as: :rainbow_colors

  @doc "Delegates CMS.Dashboard.KanbanBoards.values_list/0 through the CMS Context boundary."
  defdelegate dashboard_kanban_boards_values_list(),
    to: GroupherServer.CMS.Dashboard.KanbanBoards,
    as: :values_list
end
