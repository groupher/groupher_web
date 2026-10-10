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
  alias Helper.ORM

  @doc """
  Returns communities where a user has moderator capability.

  ## Examples

      Accounts.Achievements.Moderatorable.paged_moderatorable_communities(user, %{page: 1, size: 20})
  """
  @spec paged_moderatorable_communities(User.t(), map()) :: term()
  def paged_moderatorable_communities(%User{id: user_id}, %{page: page, size: size}) do
    CommunityModerator
    |> where([e], e.user_id == ^user_id)
    |> join(:inner, [e], c in assoc(e, :community))
    |> select([e, c], c)
    |> ORM.paginator(page: page, size: size)
    |> done()
  end
end
