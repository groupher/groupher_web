defmodule GroupherServer.Accounts.Upvotes do
  @moduledoc """
  Viewer-facing read model for artiments an account has upvoted.

  Business position:

      Client / Auth -> Accounts facade -> Upvotes query -> CMS interaction read model
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.Profiles.ErrorCat, as: ProfileErrorCat
  alias Accounts.Model.User

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleLifecycle,
    ArticlePublic,
    ArticleStats,
    ArticleUpvote,
    Author,
    Community,
    DocBranch,
    DocBranchState,
    DocLifecycle,
    DocPublic
  }

  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Params}

  @doc """
  Returns the articles upvoted by a user, optionally filtered by thread.

  ## Examples

      Accounts.upvotes_paged_articles(user, %{page: 1, size: 20, thread: :post})
  """
  def paged_articles(%User{id: user_id}, %{thread: thread} = filter) when is_atom(thread) do
    load_articles(user_id, thread, filter)
  end

  def paged_articles(%User{}, %{thread: _thread}) do
    {:error, ProfileErrorCat.custom("invalid thread")}
  end

  def paged_articles(%User{id: user_id}, filter) do
    load_articles(user_id, nil, filter)
  end

  defp load_articles(user_id, thread, %{page: page, size: size}) do
    query =
      from(upvote in ArticleUpvote,
        join: article in Article,
        on: article.id == upvote.article_id and article.thread == upvote.thread,
        join: binding in ArticleBinding,
        on:
          binding.article_id == article.id and
            binding.visible == true and binding.inner_id > 0,
        join: community in Community,
        on: community.id == binding.community_id,
        join: author in Author,
        on: author.id == article.author_id,
        join: user in User,
        on: user.id == author.user_id,
        left_join: stats in ArticleStats,
        on: stats.article_id == article.id and stats.thread == article.thread,
        left_join: public in ArticlePublic,
        on: public.article_id == article.id and public.visible == true,
        left_join: lifecycle in ArticleLifecycle,
        on:
          lifecycle.article_id == article.id and
            lifecycle.state in [:published, :archived],
        left_join: branch in DocBranch,
        on: branch.community_id == binding.community_id and branch.type == :main,
        left_join: doc_state in DocBranchState,
        on: doc_state.article_id == article.id and doc_state.branch_id == branch.id,
        left_join: doc_public in DocPublic,
        on:
          doc_public.article_id == article.id and doc_public.branch_id == branch.id and
            doc_public.visible == true,
        left_join: doc_lifecycle in DocLifecycle,
        on:
          doc_lifecycle.article_id == article.id and doc_lifecycle.branch_id == branch.id and
            doc_lifecycle.state in [:published, :archived],
        where: upvote.user_id == ^user_id,
        where:
          (article.thread == :doc and doc_state.moderation_state == :legal and
             not is_nil(doc_public.id) and not is_nil(doc_lifecycle.id)) or
            (article.thread != :doc and article.moderation_state == :legal and
               not is_nil(public.article_id) and not is_nil(lifecycle.id)),
        select: %{
          id: article.id,
          inner_id: binding.inner_id,
          thread: article.thread,
          title: fragment("COALESCE(?, ?)", public.title, doc_public.title),
          author: user,
          upvotes_count: coalesce(stats.upvotes_count, 0)
        }
      )

    query =
      if is_nil(thread),
        do: query,
        else: where(query, [upvote, ...], upvote.thread == ^thread)

    with {:ok, order} <-
           Order.new(%{
             fields: [:inserted_at, :id],
             directions: [:desc, :desc],
             cursor_fields: [:inserted_at, :id]
           }),
         {:ok, page} <-
           ORM.pagi(
             query,
             %Params.Offset{page: page, size: size},
             for: ArticleUpvote,
             order: order
           ) do
      page
      |> Helper.ORM.Pagi.Page.to_legacy()
      |> done()
    end
  end
end
