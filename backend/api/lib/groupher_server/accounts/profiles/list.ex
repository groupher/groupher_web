defmodule GroupherServer.Accounts.Profiles.List do
  @moduledoc """
  Profile list queries for users and subscribed communities.

  The module keeps profile-page pagination, default community suggestions, and
  subscribed-community reads under the account namespace.

  Business position:

      Accounts.Profiles.Query -> Profiles.List -> User / community read models
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{Accounts, CMS, Repo}

  alias Accounts.Fans
  alias Accounts.Model.User

  alias CMS.Model.{Community, CommunitySubscriber}
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Params}

  @default_subscribed_communities GroupherServer.Accounts.Config.default_subscribed_communities()

  @doc "Pages User identities using the explicit Pagi position."
  def paged_users(filter, pagi, viewer \\ nil) do
    sort = Map.get(filter, :sort, :desc_inserted)

    if sort in [:asc_inserted, :desc_inserted] do
      direction = if sort == :asc_inserted, do: :asc, else: :desc

      order = %Order{
        fields: [:inserted_at, :id],
        directions: [direction, direction],
        cursor_fields: [:inserted_at, :id]
      }

      with {:ok, page} <-
             ORM.pagi(User, pagi,
               for: User,
               order: order,
               surface: "accounts.users",
               query_fingerprint: Atom.to_string(sort)
             ) do
        case viewer do
          %User{} -> {:ok, Fans.mark_viewer_follow_status({:ok, page}, viewer)}
          nil -> {:ok, page}
        end
      end
    else
      {:error, GroupherServer.Pagi.unsupported_sort()}
    end
  end

  @doc "Returns bounded default suggestions, with Home independently included when present."
  def default_community_suggestions do
    query =
      CMS.communities_public_query()
      |> GroupherServer.CMS.query_builder_filter_pack(%{category: "pl"})
      |> where([community], community.slug != "home")
      |> distinct(true)
      |> order_by([community], desc: community.inserted_at, desc: community.id)
      |> limit(@default_subscribed_communities)

    suggestions = Repo.all(query)

    home =
      CMS.communities_public_query()
      |> where([community], community.slug == "home")
      |> Repo.one()

    {:ok, suggestions ++ if(home, do: [home], else: [])}
  end

  @doc "Pages a user's actual subscriptions by Community identity."
  @spec subscribed_communities(User.t(), map(), Params.t() | nil) :: tuple()
  def subscribed_communities(%User{id: id}, filter, pagi) do
    ids =
      from(member in CommunitySubscriber,
        where: member.user_id == ^id,
        select: member.community_id
      )

    sort = Map.get(filter, :sort, :desc_inserted)

    if sort in [:asc_inserted, :desc_inserted] do
      query =
        CMS.communities_public_query()
        |> where([community], community.id in subquery(ids))

      direction = if sort == :asc_inserted, do: :asc, else: :desc

      order = %Order{
        fields: [:inserted_at, :id],
        directions: [direction, direction],
        cursor_fields: [:inserted_at, :id]
      }

      ORM.pagi(query, pagi,
        for: Community,
        order: order,
        surface: "accounts.subscribed_communities",
        query_fingerprint: :erlang.term_to_binary({id, sort}) |> Base.encode64()
      )
    else
      {:error, GroupherServer.Pagi.unsupported_sort()}
    end
  end
end
