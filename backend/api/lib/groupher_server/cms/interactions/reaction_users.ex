defmodule GroupherServer.CMS.Interactions.ReactionUsers do
  @moduledoc """
  Loads paged users attached to an Article-owned Interaction fact.

  Business position:

      CMS.Interactions users facade
        -> Interaction-owned reaction query
        -> QueryBuilder / Repo
  """

  import Ecto.Query, warn: false
  import GroupherServer.CMS.Artiment.Matcher

  alias GroupherServer.CMS

  alias GroupherServer.{Accounts}
  alias Accounts.Model.User
  alias CMS.FrontDesk.Relation
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order}

  @doc "Loads one page of users for the supplied Article reaction query."
  def load(queryable, article, pagi) do
    {:ok, thread} = Relation.thread_of(article)

    with {:ok, info} <- match(thread) do
      reaction_query =
        queryable
        |> where([user], field(user, ^info.foreign_key) == ^article.id)

      query =
        from(user in User,
          join: reaction in subquery(reaction_query),
          on: reaction.user_id == user.id,
          select: user
        )

      with {:ok, page} <-
             ORM.pagi(
               query,
               pagi,
               for: User,
               surface: "articles.reaction_users",
               query_fingerprint:
                 :erlang.term_to_binary({queryable, article.id, thread}) |> Base.encode64(),
               order: %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]}
             ) do
        {:ok, page}
      end
    end
  end
end
