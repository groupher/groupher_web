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

  Kanban and published-owner views share the canonical ArticleLite selector,
  binding identity and PageInfo contract.
  """

  import Ecto.Query, warn: false

  import Helper.Utils,
    only: [
      done: 1
    ]

  alias GroupherServer.{Accounts, CMS, Repo}

  alias Accounts.Model.User
  alias CMS.Articles.Pagination
  alias CMS.Artiment.Const
  alias CMS.Dashboard.KanbanBoards
  alias CMS.Gate.Context.Scope.Article, as: ArticleContext
  alias CMS.Gate.Context.Scope.Doc, as: DocContext
  alias CMS.Gate.Scope

  alias CMS.Model.{
    Article,
    ArticleBinding,
    Community,
    DocBranch,
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

  @doc "Bootstraps enabled Kanban columns as independent canonical Post pages."
  def grouped_kanban(%Community{} = community) do
    enabled = enabled_kanban_boards(community)

    Enum.reduce_while(KanbanBoards.values_list(), {:ok, %{}}, fn board, {:ok, pages} ->
      filter =
        if board in enabled, do: %{status: kanban_board_status(board)}, else: %{statuses: []}

      filter =
        case filter do
          %{status: statuses} when is_list(statuses) -> %{statuses: statuses}
          other -> other
        end

      case kanban_page(community, filter, nil) do
        {:ok, page} -> {:cont, {:ok, Map.put(pages, board, page)}}
        error -> {:halt, error}
      end
    end)
  end

  defp enabled_kanban_boards(community) do
    community
    |> Repo.preload(:dashboard, force: true)
    |> get_in([Access.key(:dashboard), Access.key(:layout), Access.key(:kanban_boards)])
    |> case do
      boards when is_list(boards) and boards != [] -> boards
      _ -> KanbanBoards.default_values_list()
    end
  end

  defp kanban_board_status(:backlog), do: @article_status.backlog
  defp kanban_board_status(:todo), do: @article_status.todo
  defp kanban_board_status(:wip), do: @article_status.wip
  defp kanban_board_status(:done), do: @article_status.done
  defp kanban_board_status(:rejected), do: @kanban_rejected_statuses

  @doc "Pages a Kanban status set using the canonical Article list selector."
  def kanban_page(%Community{} = community, filter, pagi) do
    filter = filter |> Map.put(:community, community.slug) |> Map.put_new(:order, :publish)
    Pagination.page(:post, filter, pagi, nil, include_pinned: true)
  end

  @doc "Pages public binding paths authored by the target user."
  def paged_published(thread, filter, pagi, %User{} = target_user, viewer) do
    filter = Map.put(filter, :author_id, target_user.id)
    Pagination.page(thread, filter, pagi, viewer, include_pinned: true)
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
