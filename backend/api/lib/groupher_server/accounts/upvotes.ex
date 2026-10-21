defmodule GroupherServer.Accounts.Upvotes do
  @moduledoc """
  Pages a user's upvoted Article paths. The fact plus binding identifies a row;
  public entry eligibility and batch hydration share the CMS Lite read scope.

      Accounts -> scoped Upvote/binding rows -> ORM.Pagi -> batch ArticleLite
  """
  import Ecto.Query

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.Model.{Article, ArticleBinding, ArticleUpvote, Community}
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Params}

  @spec paged_articles(User.t(), map(), Params.t() | nil) :: tuple()
  def paged_articles(%User{id: id}, filter, pagi) do
    thread = Map.get(filter, :thread)

    if is_nil(thread) or thread in CMS.artiment_config_threads() do
      visible = CMS.articles_public_binding_ids()

      query =
        from(upvote in ArticleUpvote,
          join: article in Article,
          on: article.id == upvote.article_id,
          join: binding in ArticleBinding,
          as: :upvote_binding,
          on: binding.article_id == article.id,
          join: community in Community,
          on: community.id == binding.community_id,
          where: upvote.user_id == ^id and binding.id in subquery(visible),
          select: %{
            id: upvote.id,
            inserted_at: upvote.inserted_at,
            binding_id: binding.id,
            path: %{community: community.slug, thread: article.thread, inner_id: binding.inner_id}
          }
        )

      query = if thread, do: where(query, [upvote], upvote.thread == ^thread), else: query

      order = %Order{
        fields: [:inserted_at, :id, :binding_id],
        directions: [:desc, :desc, :desc],
        cursor_fields: [:inserted_at, :id, :binding_id]
      }

      with {:ok, page} <-
             ORM.pagi(query, pagi,
               for: ArticleUpvote,
               order: order,
               surface: "accounts.upvoted_articles",
               query_fingerprint: :erlang.term_to_binary({id, thread}) |> Base.encode64()
             ),
           {:ok, entries} <- CMS.articles_lite_paths(Enum.map(page.entries, & &1.path)) do
        by_path = Map.new(entries, &{{&1.community.slug, &1.thread, &1.inner_id}, &1})

        entries =
          Enum.map(page.entries, fn %{path: path} ->
            Map.fetch!(by_path, {path.community, path.thread, path.inner_id})
          end)

        {:ok, %{page | entries: entries}}
      end
    else
      {:error, Accounts.Profiles.ErrorCat.custom("invalid thread")}
    end
  end
end
