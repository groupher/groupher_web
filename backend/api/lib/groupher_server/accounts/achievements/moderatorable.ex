defmodule GroupherServer.Accounts.Achievements.Moderatorable do
  @moduledoc """
  Lists communities where a user has moderator capability.

  This backs account achievement/profile surfaces that need to show moderation
  reach without exposing the join rows directly.

  Business position:

      Client / Auth
        -> GraphQL or internal API
        -> Accounts facade
        -> Moderatorable
        -> Repo
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.Model.User
  alias CMS.Model.CommunityModerator
  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @doc """
  Returns communities where a user has moderator capability.

  ## Examples

      Accounts.Achievements.Moderatorable.paged_moderatorable_communities(user, %{page: 1, size: 20})
  """
  @spec paged_moderatorable_communities(User.t(), map()) :: T.domain_res(T.paged_data())
  def paged_moderatorable_communities(%User{id: user_id}, %{page: page, size: size}) do
    query =
      CommunityModerator
      |> where([e], e.user_id == ^user_id)
      |> join(:inner, [e], c in assoc(e, :community))
      |> select([e, c], c)

    with {:ok, result} <-
           ORM.pagi(
             query,
             %Params.Offset{page: page, size: size},
             for: CMS.Model.Community,
             order: %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]}
           ) do
      done(Page.to_legacy(result))
    end
  end
end
