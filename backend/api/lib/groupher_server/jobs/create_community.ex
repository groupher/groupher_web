defmodule GroupherServer.Jobs.CreateCommunity do
  @moduledoc """
  Creates a Community from one approved Application.

  Business position:

      Apply UI / reviewer
        -> GraphQL resolver
        -> CMS.CommunityApplications
        -> CreateCommunity
        -> Repo / Oban
  """

  use Oban.Worker,
    queue: :community_application,
    max_attempts: 5,
    unique: [period: 86_400, keys: [:application_ref]]

  alias GroupherServer.CMS

  @doc """
  Creates a Community from the approved Application, marking the Application
  as creation-failed once all retries are exhausted.

  The Oban payload must carry the application and stable operation references.
  A non-terminal error is returned for retry; after the final attempt the job
  records `creation_failed` before acknowledging the job.

  ## Examples

      perform(%Oban.Job{args: %{
        "application_ref" => "application_ref",
        "operation_ref" => "operation_ref"
      }, attempt: 1, max_attempts: 5})
  """
  @impl Oban.Worker

  def perform(%Oban.Job{
        args: %{"application_ref" => application_ref, "operation_ref" => operation_ref},
        attempt: attempt,
        max_attempts: max_attempts
      }) do
    case CMS.communities_create_from_application(application_ref, operation_ref) do
      {:ok, _application} ->
        {:ok, :pass}

      {:error, reason} when attempt >= max_attempts ->
        case CMS.community_applications_mark_creation_failed(
               application_ref,
               operation_ref,
               reason
             ) do
          {:ok, _application} -> {:ok, :pass}
          {:error, mark_reason} -> {:error, mark_reason}
        end

      {:error, reason} ->
        {:error, reason}
    end
  end
end
