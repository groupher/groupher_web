defmodule GroupherServer.CMS.Communities.NameAvailability do
  @moduledoc """
  Queries the shared community slug namespace for claims, communities, and cooldowns.

  Syntax and reserved-name validation is delegated to `NameRules`; this module
  owns all database-backed availability checks.

      raw name -> NameRules -> claim/community queries -> available or denial
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{CMS, Repo}
  alias CMS.Communities.{ErrorCat, NameRules}
  alias CMS.Model.{Community, CommunitySlugClaim}
  alias Helper.Datetime

  @blocking_claim_statuses [:application, :community, :reserved, :disputed]

  @doc """
  Checks whether a normalized name is available in the shared namespace.

  ## Examples

      NameAvailability.check("new-community")
      #=> {:ok, "new-community"}
  """
  @spec check(term(), keyword()) ::
          {:ok, String.t()} | {:error, ErrorCat.error()}
  def check(slug, opts \\ []) do
    with {:ok, slug} <- NameRules.format_check(slug) do
      cond do
        blocking_claim = blocking_claim(slug, opts) ->
          {:error, claim_error(blocking_claim)}

        Repo.exists?(from(c in Community, where: c.slug == ^slug)) ->
          {:error, ErrorCat.slug_claimed()}

        true ->
          {:ok, slug}
      end
    end
  end

  defp blocking_claim(slug, opts) do
    query =
      from(claim in CommunitySlugClaim,
        where:
          claim.slug == ^slug and is_nil(claim.released_at) and
            claim.status in ^@blocking_claim_statuses,
        order_by: [asc: claim.inserted_at]
      )

    query = exclude_application_claim(query, Keyword.get(opts, :ignore_application_id))

    query
    |> Repo.all()
    |> List.first()
    |> case do
      %CommunitySlugClaim{} = claim -> claim
      nil -> cooldown_claim(slug)
    end
  end

  defp exclude_application_claim(query, nil), do: query

  defp exclude_application_claim(query, application_id) do
    from(claim in query,
      where: is_nil(claim.application_id) or claim.application_id != ^application_id
    )
  end

  defp cooldown_claim(slug) do
    now = Datetime.now()

    Repo.one(
      from(claim in CommunitySlugClaim,
        where:
          claim.slug == ^slug and is_nil(claim.released_at) and
            claim.status == :cooldown and
            (is_nil(claim.cooldown_until) or claim.cooldown_until > ^now),
        order_by: [asc: claim.inserted_at]
      )
    )
  end

  defp claim_error(%CommunitySlugClaim{status: :reserved}), do: ErrorCat.reserved_slug()
  defp claim_error(%CommunitySlugClaim{status: :disputed}), do: ErrorCat.slug_disputed()
  defp claim_error(%CommunitySlugClaim{status: :cooldown}), do: ErrorCat.slug_in_cooldown()
  defp claim_error(%CommunitySlugClaim{}), do: ErrorCat.slug_claimed()
end
