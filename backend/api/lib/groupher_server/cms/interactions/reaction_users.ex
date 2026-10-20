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

  alias GroupherServer.Accounts.Model.User
  alias CMS.FrontDesk.Relation
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @doc "Loads one page of users for the supplied Article reaction query."
  def load(queryable, article, filter) do
    {:ok, thread} = Relation.thread_of(article)
    %{page: page, size: size} = filter

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
               %Params.Offset{page: page, size: size},
               for: GroupherServer.Accounts.Model.User,
               order: %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]}
             ) do
        {:ok, Page.to_legacy(page)}
      end
    end
  end
end
