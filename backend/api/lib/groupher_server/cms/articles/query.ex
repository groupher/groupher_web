defmodule GroupherServer.CMS.Articles.Query do
  @moduledoc """
  Article listing helpers.

  Business position:

      Client / importer
        -> GraphQL or service boundary
        -> CMS.Articles
        -> Query
        -> Pagination (ArticleLite) / named composite query
        -> Repo / domain event

  The ordinary list path returns ArticleLite-shaped rows through a transitional
  legacy response adapter. Kanban and published-owner views retain their
  domain-specific joined predicates, page the binding identity first, and use
  one bounded `FrontDesk.articles/1` batch for the full legacy presentation.
  """

  import Ecto.Query, warn: false

  import Helper.Utils,
    only: [
      done: 1
    ]

  alias GroupherServer.{Accounts, CMS, Repo}

  alias Accounts.Model.User
  alias CMS.Articles.Pagination
  alias CMS.Articles.Response
  alias CMS.Artiment.Const
  alias CMS.Dashboard.KanbanBoards
  alias CMS.FrontDesk
  alias CMS.Gate.Context.Scope.Article, as: ArticleContext
  alias CMS.Gate.Context.Scope.Doc, as: DocContext
  alias CMS.Gate.Scope

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleLifecycle,
    ArticlePublic,
    Community,
    DocBranch,
    KanbanState,
    PinnedArticle
  }

  alias Helper.T

  @article_status Const.status_values() |> Enum.into(%{}, &{&1, &1})
  @kanban_rejected_statuses [
    @article_status.reject,
    @article_status.reject_dup,
    @article_status.reject_no_plan,
    @article_status.reject_repro,
    @article_status.reject_stale
  ]

  @doc """
  Returns a paged list of legal articles for one thread.

  Applies the public article scope, filter pack, and optional interaction
  ordering, then prepends pinned articles on the first page.

  ## Examples

      CMS.Articles.Query.page(:post, %{page: 1, size: 20})

  """
  @spec page(atom(), map()) :: T.domain_res(term())
  def page(thread, filter), do: do_page(thread, filter, nil)

  @spec page(atom(), map(), User.t()) :: T.domain_res(term())
  def page(thread, filter, %User{} = user), do: do_page(thread, filter, user)

  defp do_page(thread, filter, viewer) do
    with {:ok, page} <- Pagination.page(thread, filter, viewer),
         {:ok, entries} <- legacy_entries(page.pinned_entries ++ page.entries, viewer) do
      page_info = page.page_info
      pinned_count = length(page.pinned_entries)

      {:ok,
       %{
         entries: entries,
         total_count: Map.get(page_info, :total_count, 0) + pinned_count,
         page_number: Map.get(page_info, :page, 1),
         page_size: Map.get(page_info, :size, Map.get(filter, :size, 20)),
         total_pages: Map.get(page_info, :total_pages, 0)
       }}
    end
  end

  defp legacy_entries(entries, viewer) do
    with {:ok, resources} <- Pagination.legacy_entries(entries) do
      Response.list(resources, viewer)
    end
  end

  @doc "Returns the enabled Kanban boards as a named composite of paged boards."
  @spec grouped_kanban(Community.t()) :: T.domain_res(term())
  def grouped_kanban(%Community{} = community) do
    filter = %{page: 1, size: 20}
    enabled_boards = enabled_kanban_boards(community)

    grouped =
      KanbanBoards.values_list()
      |> Map.new(fn board ->
        {:ok, paged_posts} = paged_kanban_for_board(community, board, filter, enabled_boards)
        {board, paged_posts}
      end)

    {:ok, grouped}
  end

  defp enabled_kanban_boards(%Community{} = community) do
    community
    |> Repo.preload(:dashboard, force: true)
    |> get_in([Access.key(:dashboard), Access.key(:layout), Access.key(:kanban_boards)])
    |> case do
      boards when is_list(boards) and boards != [] -> boards
      _ -> KanbanBoards.default_values_list()
    end
  end

  defp paged_kanban_for_board(
         %Community{} = community,
         board,
         filter,
         enabled_boards
       ) do
    if board in enabled_boards do
      paged_kanban(community, Map.put(filter, :status, kanban_board_status(board)))
    else
      {:ok, empty_paged_kanban(filter)}
    end
  end

  defp kanban_board_status(:backlog), do: @article_status.backlog
  defp kanban_board_status(:todo), do: @article_status.todo
  defp kanban_board_status(:wip), do: @article_status.wip
  defp kanban_board_status(:done), do: @article_status.done
  # rejected is a virtual kanban column that aggregates all reject states.
  defp kanban_board_status(:rejected), do: @kanban_rejected_statuses

  defp empty_paged_kanban(%{page: page, size: size}) do
    %{entries: [], total_count: 0, page_number: page, page_size: size, total_pages: 0}
  end

  @doc "Returns one binding-identity page for a Kanban status or status set."
  def paged_kanban(%Community{} = community, %{status: statuses} = filter)
      when is_list(statuses) do
    %{page: page, size: size} = filter

    valid_statuses = Enum.filter(statuses, &(is_atom(&1) and &1 in Map.keys(@article_status)))

    case valid_statuses do
      [] ->
        %{entries: [], total_count: 0, page_number: page, page_size: size, total_pages: 0}
        |> done()

      _ ->
        stable_paged_kanban(community, valid_statuses, page, size)
    end
  end

  def paged_kanban(%Community{} = community, filter) do
    %{page: page, size: size, status: status} = filter

    stable_paged_kanban(community, [status], page, size)
  end

  defp stable_paged_kanban(community, statuses, page, size) do
    base =
      from(article in Article,
        join: binding in ArticleBinding,
        on: binding.article_id == article.id,
        join: state in KanbanState,
        on: state.article_binding_id == binding.id,
        join: public in ArticlePublic,
        on: public.article_id == article.id and public.visible == true,
        join: lifecycle in ArticleLifecycle,
        on: lifecycle.article_id == article.id,
        where:
          article.thread == :post and article.moderation_state == :legal and
            binding.community_id == ^community.id and binding.visible == true and
            lifecycle.state in [:published, :archived] and state.status in ^statuses,
        order_by: [desc: public.published_at],
        select: %{inner_id: binding.inner_id, status: state.status}
      )

    total_count = Repo.aggregate(exclude(base, :order_by), :count)

    paths =
      base
      |> offset(^((page - 1) * size))
      |> limit(^size)
      |> Repo.all()
      |> Enum.map(fn %{inner_id: inner_id, status: status} ->
        %{community: community.slug, thread: :post, inner_id: inner_id, status: status}
      end)

    with {:ok, entries} <- read_public_paths(paths, nil) do
      status_by_inner_id = Map.new(paths, &{&1.inner_id, &1.status})

      entries =
        Enum.map(entries, &Map.put(&1, :status, Map.fetch!(status_by_inner_id, &1.inner_id)))

      {:ok,
       %{
         entries: entries,
         total_count: total_count,
         page_number: page,
         page_size: size,
         total_pages: if(total_count == 0, do: 0, else: ceil(total_count / size))
       }}
    end
  end

  @spec paged_published(atom(), map(), User.t(), User.t() | nil) :: T.domain_res(term())
  @doc "Returns a binding-identity page of public articles authored by a user."
  def paged_published(thread, filter, %User{} = target_user, actor) do
    %{page: page, size: size} = filter

    with %Ecto.Query{} = query <- Scope.scope(Article, actor, :list, scope_context(thread)) do
      query =
        query
        |> join(:inner, [article, ...], author in assoc(article, :author), as: :published_author)
        |> join(:inner, [article, ...], binding in ArticleBinding,
          on: binding.article_id == article.id and binding.visible == true,
          as: :published_binding
        )
        |> join(:inner, [_article, ...], community in Community,
          on: community.id == as(:published_binding).community_id,
          as: :published_community
        )
        |> where([_article, ...], as(:published_author).user_id == ^target_user.id)
        |> order_by([article, ...], desc: article.active_at, desc: article.inserted_at)
        |> select([article, ...], %{
          inner_id: as(:published_binding).inner_id,
          community: as(:published_community).slug
        })

      total_count = query |> exclude(:order_by) |> exclude(:select) |> Repo.aggregate(:count)

      paths =
        query
        |> offset(^((page - 1) * size))
        |> limit(^size)
        |> Repo.all()
        |> Enum.map(&Map.put(&1, :thread, thread))

      with {:ok, entries} <- read_public_paths(paths, actor) do
        %{
          entries: entries,
          total_count: total_count,
          page_number: page,
          page_size: size,
          total_pages: if(total_count == 0, do: 0, else: ceil(total_count / size))
        }
        |> done()
      end
    end
  end

  @spec count_published(atom(), User.t()) :: T.domain_res(non_neg_integer())
  def count_published(thread, %User{} = user) do
    with %Ecto.Query{} = query <- Scope.scope(Article, nil, :list, scope_context(thread)) do
      query
      |> join(:inner, [article, ...], author in assoc(article, :author), as: :published_author)
      |> where([_article, ...], as(:published_author).user_id == ^user.id)
      |> select([article, ...], count(article.id))
      |> Repo.one()
      |> done()
    end
  end

  defp scope_context(:doc), do: DocContext.public_main()
  defp scope_context(thread), do: ArticleContext.public(thread)

  defp read_public_paths(paths, actor) when is_list(paths) do
    with {:ok, resolved} <- FrontDesk.articles(paths) do
      bindings = resolved |> Enum.map(& &1.binding) |> Repo.preload(:community)

      resources =
        resolved
        |> Enum.zip(bindings)
        |> Enum.map(fn {%{article: article}, binding} ->
          article
          |> Map.put(:community, binding.community)
          |> Map.put(:inner_id, binding.inner_id)
        end)
        |> Repo.preload(author: :user)

      Response.list(resources, actor)
    end
  end

  @doc false
  def binding(article_id, community_id) do
    Repo.get_by(ArticleBinding, article_id: article_id, community_id: community_id)
  end

  @doc false
  def pinned_binding(article_id, community_id) do
    from(pin in PinnedArticle,
      join: binding in ArticleBinding,
      on: pin.article_binding_id == binding.id,
      where: binding.article_id == ^article_id and binding.community_id == ^community_id
    )
    |> Repo.one()
  end

  @doc false
  def community(id), do: Repo.get(Community, id)

  @doc false
  def branch_community(branch_id) do
    with %DocBranch{community_id: community_id} <- Repo.get(DocBranch, branch_id),
         %Community{} = community <- Repo.get(Community, community_id) do
      {:ok, community}
    else
      _ -> {:error, :article_binding_not_found}
    end
  end

  @doc false
  def article(id), do: Repo.get(Article, id)

  @doc false
  def article_with_author(%Article{} = article), do: Repo.preload(article, author: :user)

  @doc false
  def reload_with_author(%{__struct__: schema, id: id}) do
    case Repo.get(schema, id) do
      nil -> {:error, CMS.ErrorCat.command_result_unavailable()}
      canonical -> {:ok, Repo.preload(canonical, author: :user)}
    end
  end
end
