defmodule GroupherServer.Jobs.ExpireCommunityApplications do
  @moduledoc """
  Expires submitted Applications whose review window elapsed.

  Business position:

      Apply UI / reviewer
        -> GraphQL resolver
        -> CMS.CommunityApplications
        -> ExpireSubmitted
        -> Repo / Oban
  """

  use Oban.Worker, queue: :community_application, max_attempts: 3

  alias GroupherServer.CMS

  @doc """
  Expires submitted Applications whose review window elapsed.

  The bounded maintenance owner returns a tagged result. Any error is returned
  to Oban so a later attempt can retry the remaining applications.

  ## Examples

      perform(%Oban.Job{})
  """
  @impl Oban.Worker

  def perform(_job) do
    case CMS.community_applications_expire_due(DateTime.utc_now(:second)) do
      {:ok, _count} -> {:ok, :pass}
      {:error, reason} -> {:error, reason}
    end
  end
end
