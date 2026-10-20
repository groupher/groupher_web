defmodule GroupherServer.CMS.Comments.Query do
  @moduledoc """
  List/paged operations for comments.

  Business position:

      Client
        -> GraphQL
        -> CMS.Comments
        -> Query
        -> Repo / domain event
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]
  alias GroupherServer.{Accounts, CMS, Jobs, Pagi, Repo}

  alias CMS.{QueryBuilder, FrontDesk}
  alias CMS.Articles.Pagination
  alias CMS.Dashboard.Pagination, as: DashboardPagination
  alias Accounts.Model.User
  alias CMS.Gate.Context.Scope.Comment, as: CommentContext
  alias CMS.Comments.{InteractionResponse, Replies}

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleStats,
    Author,
    Comment,
    Community,
    PinnedComment,
    PostSolution
  }

  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Config, Order, Page, Params}

  @pinned_comment_limit Comment.pinned_comment_limit()
  @doc """
  Returns the comment summary state for one article: total count, participant
  count, latest participants, and whether the viewer joined the conversation.

  ## Examples

      CMS.Comments.Query.comments_state(:post, article_id)

  """
  @spec comments_state(T.thread(), T.id()) :: T.domain_res(map())
  def comments_state(thread, article_id) do
    filter = %{page: 1, size: 20}

    with {:ok, article} <- stable_article(thread, article_id),
         thread_query <- article_comments(article.id),
         stats <- Repo.get_by(ArticleStats, thread: thread, article_id: article.id),
         {:ok, paged_participants} <-
           do_paged_comments_participants(thread, thread_query, filter) do
      %{
        total_count: stats_value(stats, :comments_count),
        participants_count: stats_value(stats, :comments_participants_count),
        participants: paged_participants.entries,
        is_viewer_joined: false
      }
      |> done
    end
  end

  @doc """
  Returns one Article's Comment state with viewer participation.

  ## Examples

      Comments.Query.comments_state(:post, post_id, viewer)
  """
  @spec comments_state(T.thread(), T.id(), User.t()) :: T.domain_res(map())
  def comments_state(thread, article_id, %User{} = user) do
    with {:ok, article} <- stable_article(thread, article_id),
         thread_query <- article_comments(article.id),
         {:ok, state} <- comments_state(thread, article_id) do
      user_joined =
        case state.participants |> Enum.any?(&(&1.id == user.id)) do
          true ->
            true

          false ->
            from(c in Comment)
            |> CMS.Gate.scope(user, :read, comment_scope(thread))
            |> where(^thread_query)
            |> where([c], c.author_id == ^user.id)
            |> Repo.exists?()
        end

      state |> Map.merge(%{is_viewer_joined: user_joined}) |> done
    end
  end

  @doc """
  Returns a page of Comments without viewer state.

  ## Examples

      Comments.Query.paged_comments(:post, post_id, filters, :replies)
  """
  @spec paged_comments(T.thread(), T.id(), map(), atom()) :: T.domain_res(T.paged_data())
  def paged_comments(thread, article_id, filters, mode) do
    paged_comments(thread, article_id, filters, mode, nil)
  end

  @doc """
  Returns a page of Comments hydrated for an optional viewer.

  The `:timeline` mode includes flat visible Comments; `:replies` returns root
  Comments with their embedded reply projection.

  ## Examples

      Comments.Query.paged_comments(:post, post_id, filters, :replies, viewer)
  """
  @spec paged_comments(T.thread(), T.id(), map(), atom(), User.t() | nil) ::
          T.domain_res(T.paged_data())

  def paged_comments(thread, article_id, filters, :timeline, user) do
    where_query = dynamic([c], not c.is_folded and not c.is_pinned)
    do_paged_comment(thread, article_id, filters, where_query, user)
  end

  def paged_comments(thread, article_id, filters, :replies, user) do
    where_query =
      dynamic(
        [c],
        is_nil(c.reply_to_comment_id) and not c.is_folded and not c.is_pinned
      )

    do_paged_comment(thread, article_id, filters, where_query, user)
  end

  def paged_comments(_thread, _article_id, _filters, mode, _user) do
    {:error, "unknown mode: #{mode}"}
  end

  @doc "Returns the new CommentPage contract through the shared offset/cursor engine."
  @spec page(atom(), T.id(), String.t(), map(), term(), atom(), User.t() | nil) ::
          T.domain_res(map())
  def page(thread, article_id, community_slug, filter, pagi_input, mode, user \\ nil)

  def page(thread, article_id, community_slug, filter, pagi_input, mode, user)
      when is_atom(thread) and is_binary(community_slug) and is_map(filter) and
             mode in [:timeline, :replies] do
    with {:ok, effective} <-
           DashboardPagination.for_community(community_slug, :comments,
             expected_revision: pagi_revision(pagi_input)
           ),
         {:ok, params} <- comment_params(pagi_input, effective.config),
         {:ok, article} <- stable_article(thread, article_id),
         query <- comment_page_query(article, thread, filter, mode, user),
         order <- comment_order(filter),
         {:ok, page} <-
           ORM.pagi(query, params,
             for: Comment,
             order: order,
             config: effective.config,
             resource: :comments,
             surface: "comments.#{thread}",
             mode: effective.mode,
             schema_version: effective.schema_version,
             query_fingerprint: comment_fingerprint(article.id, thread, filter, mode, order)
           ),
         {:ok, pinned_entries} <-
           comment_pinned_entries(article, thread, params, user) do
      {:ok,
       %{
         entries: page.entries,
         pinned_entries: pinned_entries,
         page_info: comment_page_info(page)
       }}
    end
  end

  def page(_thread, _article_id, _community_slug, _filter, _pagi_input, _mode, _user) do
    {:error, Pagi.invalid_config_context()}
  end

  defp comment_page_query(article, thread, _filter, mode, user) do
    where_query =
      case mode do
        :timeline ->
          dynamic([comment], not comment.is_folded and not comment.is_pinned)

        :replies ->
          dynamic(
            [comment],
            is_nil(comment.reply_to_comment_id) and not comment.is_folded and
              not comment.is_pinned
          )
      end

    from(comment in Comment, as: :comment)
    |> preload([:body, :author])
    |> CMS.Gate.scope(user, :list, comment_scope(thread))
    |> where([comment], comment.article_id == ^article.id)
    |> where(^where_query)
    |> exclude_page_solution(thread, article.id)
  end

  defp comment_params(nil, _config), do: {:ok, nil}

  defp comment_params({:offset, input}, %Config{} = config) when is_map(input) do
    {:ok,
     %Params.Offset{
       page: Map.get(input, :page, 1),
       size: Map.get(input, :size, config.default_size),
       config_revision: Map.get(input, :config_revision)
     }}
  end

  defp comment_params({:cursor, input}, %Config{} = config) when is_map(input) do
    {:ok,
     %Params.Cursor{
       first: Map.get(input, :first, config.default_size),
       after: Map.get(input, :after),
       config_revision: Map.get(input, :config_revision)
     }}
  end

  defp comment_params(_pagi_input, _config), do: {:error, Pagi.invalid_config_context()}

  defp pagi_revision({_api, input}) when is_map(input), do: Map.get(input, :config_revision)
  defp pagi_revision(_pagi_input), do: nil

  defp comment_pinned_entries(article, thread, params, user) do
    if collection_start?(params) do
      page_pinned_comments(article, thread, user)
    else
      {:ok, []}
    end
  end

  defp page_pinned_comments(article, thread, user) do
    special_where =
      if thread == :post do
        dynamic(
          [comment, pin, solution],
          comment.article_id == ^article.id and
            (pin.article_id == ^article.id or solution.article_id == ^article.id)
        )
      else
        dynamic(
          [comment, pin, _solution],
          comment.article_id == ^article.id and pin.article_id == ^article.id
        )
      end

    Comment
    |> join(:left, [comment], pin in PinnedComment, on: pin.comment_id == comment.id)
    |> join(:left, [comment, _pin], solution in PostSolution,
      on: solution.comment_id == comment.id
    )
    |> where(^special_where)
    |> CMS.Gate.scope(user, :list, comment_scope(thread))
    |> order_by([comment, pin], desc: pin.inserted_at, desc: comment.id)
    |> limit(^@pinned_comment_limit)
    |> preload([:body, :author])
    |> Repo.all()
    |> then(&{:ok, &1})
  end

  defp exclude_page_solution(query, :post, article_id) do
    where(
      query,
      [comment],
      not exists(
        from(solution in PostSolution,
          where:
            solution.article_id == ^article_id and solution.comment_id == parent_as(:comment).id
        )
      )
    )
  end

  defp exclude_page_solution(query, _thread, _article_id), do: query

  defp collection_start?(nil), do: true
  defp collection_start?(%Params.Offset{page: 1}), do: true
  defp collection_start?(%Params.Cursor{after: nil}), do: true
  defp collection_start?(_params), do: false

  defp comment_page_info(%Page.Offset{} = page) do
    %{
      api: :offset,
      page: page.page,
      size: page.size,
      total_count: page.total_count,
      total_pages: page.total_pages,
      has_previous_page: page.has_previous_page,
      has_next_page: page.has_next_page
    }
  end

  defp comment_page_info(%Page.Cursor{} = page) do
    %{
      api: :cursor,
      start_cursor: page.start_cursor,
      end_cursor: page.end_cursor,
      has_previous_page: page.has_previous_page,
      has_next_page: page.has_next_page
    }
  end

  defp comment_fingerprint(article_id, thread, filter, mode, order) do
    :crypto.hash(
      :sha256,
      :erlang.term_to_binary({article_id, thread, filter, mode, Order.identity(order)})
    )
    |> Base.encode16(case: :lower)
  end

  @doc """
  Returns a user's published Comments across all public Article threads.

  ## Examples

      Comments.Query.paged_published_comments(target_user, filters, viewer)
  """
  @spec paged_published_comments(User.t(), map(), User.t() | nil) ::
          T.domain_res(T.paged_data())
  def paged_published_comments(%User{id: user_id}, filter, actor) do
    %{page: page, size: size} = filter

    query =
      Comment
      |> CMS.Gate.scope(actor, :list, CommentContext.all_public())
      |> preload(:body)
      |> join(:inner, [comment, ...], author in assoc(comment, :author),
        as: :published_comment_author
      )
      |> where([_comment, ...], as(:published_comment_author).id == ^user_id)
      |> QueryBuilder.filter_pack(Map.delete(filter, :sort))

    with {:ok, paged} <- page_comments(query, page, size, comment_order(filter)) do
      paged |> Page.to_legacy() |> assign_stable_articles() |> done()
    end
  end

  @doc """
  Returns a user's published Comments in one Article thread.

  ## Examples

      Comments.Query.paged_published_comments(target_user, :post, filters, viewer)
  """
  @spec paged_published_comments(User.t(), T.thread(), map(), User.t() | nil) ::
          T.domain_res(T.paged_data())
  def paged_published_comments(%User{id: user_id}, thread, filter, actor) do
    %{page: page, size: size} = filter

    query =
      Comment
      |> CMS.Gate.scope(actor, :list, comment_scope(thread))
      |> preload(:body)
      |> join(:inner, [comment, ...], author in assoc(comment, :author),
        as: :published_comment_author
      )
      |> where([comment, ...], comment.thread == ^thread)
      |> where([_comment, ...], as(:published_comment_author).id == ^user_id)
      |> QueryBuilder.filter_pack(Map.delete(filter, :sort))

    with {:ok, paged} <- page_comments(query, page, size, comment_order(filter)) do
      paged |> Page.to_legacy() |> assign_stable_articles() |> done()
    end
  end

  defp assign_stable_articles(%{entries: entries} = page) do
    article_ids = Enum.map(entries, & &1.article_id)
    community_ids = Enum.map(entries, & &1.community_id)

    binding_by_identity =
      from(binding in ArticleBinding,
        join: community in Community,
        on: community.id == binding.community_id,
        where: binding.article_id in ^article_ids and binding.community_id in ^community_ids,
        select: {binding.article_id, binding.community_id, community.slug, binding.inner_id}
      )
      |> Repo.all()
      |> Map.new(fn {article_id, community_id, community, inner_id} ->
        {{article_id, community_id}, {community, inner_id}}
      end)

    paths =
      Enum.flat_map(entries, fn comment ->
        case Map.get(binding_by_identity, {comment.article_id, comment.community_id}) do
          {community, inner_id} ->
            [%{community: community, thread: comment.thread, inner_id: inner_id}]

          nil ->
            []
        end
      end)

    with {:ok, resolved} <- Pagination.lite_paths(paths) do
      articles_by_path =
        Map.new(resolved, fn article ->
          {{article.community.slug, article.thread, article.inner_id}, article}
        end)

      entries =
        Enum.flat_map(entries, fn comment ->
          case Map.get(binding_by_identity, {comment.article_id, comment.community_id}) do
            {community, inner_id} ->
              case Map.get(articles_by_path, {community, comment.thread, inner_id}) do
                nil -> []
                article -> [Map.put(comment, :article, article)]
              end

            nil ->
              []
          end
        end)

      Map.put(page, :entries, entries)
    end
  end

  @doc """
  Returns folded Comments without viewer state.

  ## Examples

      Comments.Query.paged_folded_comments(:post, post_id, filters)
  """
  @spec paged_folded_comments(T.thread(), T.id(), map()) :: T.domain_res(T.paged_data())
  def paged_folded_comments(thread, article_id, filters) do
    where_query = dynamic([c], c.is_folded and not c.is_pinned)
    do_paged_comment(thread, article_id, filters, where_query, nil)
  end

  @doc """
  Returns folded Comments hydrated for a viewer.

  ## Examples

      Comments.Query.paged_folded_comments(:post, post_id, filters, viewer)
  """
  @spec paged_folded_comments(T.thread(), T.id(), map(), User.t()) ::
          T.domain_res(T.paged_data())
  def paged_folded_comments(thread, article_id, filters, %User{} = user) do
    where_query = dynamic([c], c.is_folded and not c.is_pinned)
    do_paged_comment(thread, article_id, filters, where_query, user)
  end

  @doc """
  Returns replies under one root Comment without viewer state.

  ## Examples

      Comments.Query.paged_comment_replies(comment_id, filters)
  """
  @spec paged_comment_replies(T.id(), map()) :: T.domain_res(T.paged_data())
  def paged_comment_replies(comment_id, filters) do
    paged_comment_replies(comment_id, filters, nil)
  end

  @doc """
  Returns replies under one root Comment hydrated for an optional viewer.

  ## Examples

      Comments.Query.paged_comment_replies(comment_id, filters, viewer)
  """
  @spec paged_comment_replies(T.id(), map(), User.t() | nil) :: T.domain_res(T.paged_data())
  def paged_comment_replies(comment_id, filters, user) do
    do_paged_comment_replies(comment_id, filters, user)
  end

  @doc """
  Returns distinct Comment participants and schedules a best-effort projection
  repair when the persisted count differs.

  ## Examples

      Comments.Query.paged_comments_participants(:post, post_id, filters)
  """
  @spec paged_comments_participants(T.thread(), T.id(), map()) ::
          T.domain_res(T.paged_users())
  def paged_comments_participants(thread, article_id, filters) do
    with {:ok, article} <- stable_article(thread, article_id),
         thread_query <- article_comments(article.id),
         stats <- Repo.get_by(ArticleStats, thread: thread, article_id: article.id),
         {:ok, paged_data} <-
           do_paged_comments_participants(thread, thread_query, filters) do
      case stats_value(stats, :comments_participants_count) !== paged_data.total_count do
        true ->
          {:ok, _} =
            Jobs.enqueue_best_effort(:reconcile_comments_participants, article.id, fn ->
              Jobs.reconcile_comments_participants(
                article.thread,
                article.id,
                paged_data.total_count
              )
            end)

          done(paged_data)

        false ->
          done(paged_data)
      end
    end
  end

  defp do_paged_comments_participants(thread, query, filters) do
    %{page: page, size: size} = filters

    participant_activity =
      Comment
      |> where(^query)
      |> CMS.Gate.scope(nil, :list, comment_scope(thread))
      |> group_by([comment], comment.author_id)
      |> select([comment], %{
        author_id: comment.author_id,
        last_commented_at: max(comment.inserted_at),
        last_comment_id: max(comment.id)
      })

    query =
      from(author in User,
        join: activity in subquery(participant_activity),
        on: author.id == activity.author_id,
        select: author
      )

    with {:ok, paged} <-
           page_comments(
             query,
             page,
             size,
             %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]}
           ) do
      paged |> Page.to_legacy() |> done()
    end
  end

  defp do_paged_comment(thread, article_id, filters, where_query, user) do
    %{page: page, size: size} = filters
    sort = Map.get(filters, :sort, :asc_inserted)

    with {:ok, article} <- stable_article(thread, article_id) do
      thread_query = article_comments(article.id)
      article_author_id = article_author_id(thread, article_id)
      solution = solution_comment(thread, article.id)
      query = from(c in Comment, preload: [:body, reply_to_comment: :author])

      query =
        query
        |> CMS.Gate.scope(user, :list, comment_scope(thread))
        |> where(^thread_query)
        |> where(^where_query)
        |> exclude_solution(solution)
        |> QueryBuilder.filter_pack(Map.delete(Map.merge(filters, %{sort: sort}), :sort))

      with {:ok, paged} <- page_comments(query, page, size, comment_order(%{sort: sort})),
           paged <-
             paged |> Page.to_legacy() |> add_pinned_comments_ifneed(thread, article_id, filters),
           paged <- prepend_solution(paged, solution),
           {:ok, entries} <-
             InteractionResponse.many(paged.entries, user, article_author_id: article_author_id) do
        paged
        |> Map.put(:entries, entries)
        |> done()
      end
    end
  end

  defp solution_comment(:post, article_id) do
    result =
      from(comment in Comment,
        join: solution in PostSolution,
        on: solution.comment_id == comment.id,
        where: solution.article_id == ^article_id,
        preload: [:body, reply_to_comment: :author]
      )
      |> Repo.one()

    result
  end

  defp solution_comment(_thread, _article_id), do: nil

  defp exclude_solution(query, nil), do: query

  defp exclude_solution(query, %Comment{id: solution_id}) do
    where(query, [comment], comment.id != ^solution_id)
  end

  defp prepend_solution(paged, nil), do: paged

  defp prepend_solution(%{entries: entries, total_count: total_count} = paged, solution) do
    if Enum.any?(entries, &(&1.id == solution.id)) do
      %{paged | entries: [solution | Enum.reject(entries, &(&1.id == solution.id))]}
    else
      %{paged | entries: [solution | entries], total_count: total_count + 1}
    end
  end

  defp do_paged_comment_replies(comment_id, filters, user) do
    %{page: page, size: size} = filters
    sort = Map.get(filters, :sort, :asc_inserted)

    with {:ok, root_comment} <- Replies.root(comment_id) do
      query = from(c in Comment, preload: [:body, reply_to_comment: :author])
      root_comment_id = root_comment.id

      where_query =
        dynamic(
          [c],
          not c.is_folded and
            (c.root_comment_id == ^root_comment_id or
               (is_nil(c.root_comment_id) and c.reply_to_comment_id == ^root_comment_id))
        )

      query =
        query
        |> CMS.Gate.scope(user, :list, comment_scope(root_comment.thread))
        |> where(^where_query)
        |> QueryBuilder.filter_pack(Map.delete(Map.merge(filters, %{sort: sort}), :sort))

      with {:ok, paged} <-
             page_comments(query, page, size, comment_order(%{sort: sort})),
           paged <- Page.to_legacy(paged),
           {:ok, entries} <-
             InteractionResponse.many(
               paged.entries,
               user,
               article_author_id: article_author_id(root_comment)
             ) do
        paged |> Map.put(:entries, entries) |> done()
      end
    end
  end

  defp add_pinned_comments_ifneed(paged_comments, thread, article_id, %{page: 1}) do
    with {:ok, article} <- stable_article(thread, article_id),
         {:ok, pinned_comments} <- list_pinned_comments(thread, article) do
      case pinned_comments do
        [] ->
          paged_comments

        _ ->
          pinned_comments =
            pinned_comments
            |> Enum.slice(0, @pinned_comment_limit)
            |> Repo.preload([:body, reply_to_comment: :author])

          entries = pinned_comments ++ paged_comments.entries
          pinned_comment_count = length(pinned_comments)

          total_count = paged_comments.total_count + pinned_comment_count
          paged_comments |> Map.merge(%{entries: entries, total_count: total_count})
      end
    end
  end

  defp add_pinned_comments_ifneed(paged_comments, _thread, _article_id, _), do: paged_comments

  defp page_comments(query, page, size, order) do
    ORM.pagi(
      query,
      %Params.Offset{page: page, size: size},
      for: Comment,
      order: order
    )
  end

  defp comment_order(%{sort: :desc_inserted}) do
    %Order{
      fields: [:inserted_at, :id],
      directions: [:desc, :desc],
      cursor_fields: [:inserted_at, :id]
    }
  end

  defp comment_order(_filter) do
    %Order{
      fields: [:inserted_at, :id],
      directions: [:asc, :asc],
      cursor_fields: [:inserted_at, :id]
    }
  end

  defp article_author_id(thread, article_id) do
    from(article in Article,
      join: author in Author,
      on: author.id == article.author_id,
      where: article.id == ^article_id and article.thread == ^thread,
      select: author.user_id
    )
    |> Repo.one()
  end

  defp article_author_id(comment) do
    with {:ok, article} <- FrontDesk.article_of(comment),
         {:ok, author} <- FrontDesk.article_author(article) do
      author.id
    else
      _ -> nil
    end
  end

  defp comment_scope(:doc), do: CommentContext.for_thread(:doc, branch_policy: :main)
  defp comment_scope(thread), do: CommentContext.for_thread(thread)

  defp list_pinned_comments(thread, %Article{id: article_id}) do
    from(c in Comment,
      join: p in PinnedComment,
      on: p.comment_id == c.id,
      where: p.article_id == ^article_id,
      order_by: [desc: p.inserted_at, desc: p.id],
      select: c
    )
    |> CMS.Gate.scope(nil, :list, comment_scope(thread))
    |> Repo.all()
    |> done
  end

  defp stable_article(thread, article_id) do
    case Repo.get(Article, article_id) do
      %Article{thread: ^thread} = article -> {:ok, article}
      _ -> {:error, CMS.Articles.ErrorCat.article_not_found("article not found")}
    end
  end

  defp article_comments(article_id), do: dynamic([comment], comment.article_id == ^article_id)

  defp stats_value(nil, _field), do: 0
  defp stats_value(stats, field), do: Map.fetch!(stats, field)

  @doc "Returns a Comment by its database identifier, or `nil` when it does not exist."
  def comment(id), do: Repo.get(Comment, id)

  @doc "Preloads the author of the parent Comment referenced by a reply."
  def comment_with_reply_author(%Comment{} = comment) do
    Repo.preload(comment, reply_to_comment: :author)
  end
end
