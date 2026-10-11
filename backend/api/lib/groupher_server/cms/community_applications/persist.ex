defmodule GroupherServer.CMS.CommunityApplications.Persist do
  @moduledoc """
  Owns CommunityApplication row primitives used by Commands and lifecycle workflows.

      CommunityApplications.Command / lifecycle workflow
        -> CommunityApplications.Persist
        -> application rows and claims
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{CMS, Repo}

  alias CMS.Communities.ErrorCat
  alias CMS.Model.CommunityApplication

  @doc "Inserts a new CommunityApplication row in the caller's transaction."
  def insert_application(changeset), do: Repo.insert(changeset)

  @doc "Updates a CommunityApplication row in the caller's transaction."
  def update_application(changeset), do: Repo.update(changeset)

  @doc "Inserts one application event row in the caller's transaction."
  def insert_event(changeset), do: Repo.insert(changeset)

  @doc "Locks one application owned by the applicant."
  def lock_owned(public_ref, user_id) do
    case from(application in CommunityApplication,
           where: application.public_ref == ^public_ref and application.user_id == ^user_id,
           lock: "FOR UPDATE"
         )
         |> Repo.one() do
      %CommunityApplication{} = application -> {:ok, application}
      nil -> {:error, ErrorCat.application_not_found()}
    end
  end

  @doc "Locks one submitted application for expiry maintenance."
  def lock_submitted(public_ref) do
    from(application in CommunityApplication,
      where: application.public_ref == ^public_ref,
      lock: "FOR UPDATE SKIP LOCKED"
    )
    |> Repo.one()
  end

  @doc "Returns submitted applications whose expiry is due."
  def due(now, limit \\ 100) do
    from(application in CommunityApplication,
      where: application.status == :submitted and application.expires_at <= ^now,
      order_by: [asc: application.expires_at],
      limit: ^limit
    )
    |> Repo.all()
  end
end
