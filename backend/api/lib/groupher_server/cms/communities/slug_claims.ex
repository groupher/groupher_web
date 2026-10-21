defmodule GroupherServer.CMS.Communities.SlugClaims do
  @moduledoc """
  Database-backed ownership for the shared community slug namespace.

  Business position:

      Client / reviewer
        -> CMS.Communities
        -> SlugClaims
        -> Repo / Oban
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{CMS, Repo}
  alias Ecto.Multi
  alias CMS.Model.{CommunityApplication, CommunitySlugClaim}

  @doc """
  Adds a Multi step inserting the slug claim for the application carried in
  `changes[application_key]`.

  ## Examples

      expires_at = DateTime.utc_now(:second)
      Ecto.Multi.new()
      |> CMS.Communities.SlugClaims.insert_application(:claim, :application, expires_at)
      #=> %Ecto.Multi{}

  """
  @spec insert_application(Multi.t(), atom(), atom(), DateTime.t()) :: Multi.t()
  def insert_application(multi, name, application_key, expires_at) do
    Multi.insert(multi, name, fn changes ->
      application = Map.fetch!(changes, application_key)

      CommunitySlugClaim.changeset(%CommunitySlugClaim{}, %{
        slug: application.slug,
        status: :application,
        application_id: application.id,
        claimed_by_user_id: application.user_id,
        claim_reason: "community_application",
        expires_at: expires_at
      })
    end)
  end

  @doc "Adds a Multi step that releases all active claims owned by an application."
  @spec release_application(Multi.t(), atom(), CommunityApplication.t(), DateTime.t()) ::
          Multi.t()
  def release_application(multi, name, %CommunityApplication{} = application, now) do
    Multi.update_all(
      multi,
      name,
      from(claim in CommunitySlugClaim,
        where: claim.application_id == ^application.id and is_nil(claim.released_at)
      ),
      set: [released_at: now, expires_at: nil, updated_at: now]
    )
  end

  @doc "Adds a Multi step that removes the expiry from an active application claim."
  @spec clear_expiry(Multi.t(), atom(), CommunityApplication.t(), DateTime.t()) :: Multi.t()
  def clear_expiry(multi, name, %CommunityApplication{} = application, now) do
    Multi.update_all(
      multi,
      name,
      from(claim in CommunitySlugClaim,
        where: claim.application_id == ^application.id and is_nil(claim.released_at)
      ),
      set: [expires_at: nil, updated_at: now]
    )
  end

  @doc "Adds a Multi step that promotes an application claim to its Community."
  @spec promote(Multi.t(), atom(), CommunityApplication.t(), atom(), DateTime.t()) :: Multi.t()
  def promote(multi, name, %CommunityApplication{} = application, community_key, now) do
    Multi.update_all(
      multi,
      name,
      fn changes ->
        community = Map.fetch!(changes, community_key)

        from(claim in CommunitySlugClaim,
          where: claim.application_id == ^application.id and is_nil(claim.released_at),
          update: [
            set: [
              status: :community,
              community_id: ^community.id,
              expires_at: nil,
              updated_at: ^now
            ]
          ]
        )
      end,
      []
    )
  end

  @doc "Returns the active slug claim for an application, if one exists."
  @spec claim_for_application(CommunityApplication.t()) :: CommunitySlugClaim.t() | nil
  def claim_for_application(%CommunityApplication{id: application_id}) do
    Repo.one(
      from(claim in CommunitySlugClaim,
        where: claim.application_id == ^application_id and is_nil(claim.released_at)
      )
    )
  end

  @doc "Releases expired claims for terminal applications and returns the row count."
  @spec release_expired(DateTime.t()) :: {:ok, non_neg_integer()} | {:error, term()}
  def release_expired(%DateTime{} = now) do
    terminal_statuses = ~w(created rejected cancelled expired creation_failed)a

    {count, _} =
      from(claim in CommunitySlugClaim,
        join: application in CommunityApplication,
        on: application.id == claim.application_id,
        where:
          claim.status == :application and is_nil(claim.released_at) and
            application.status in ^terminal_statuses and
            (is_nil(claim.expires_at) or claim.expires_at <= ^now)
      )
      |> Repo.update_all(set: [released_at: now, expires_at: nil, updated_at: now])

    {:ok, count}
  end
end
