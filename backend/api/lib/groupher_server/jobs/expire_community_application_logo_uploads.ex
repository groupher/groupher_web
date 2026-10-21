defmodule GroupherServer.Jobs.ExpireCommunityApplicationLogoUploads do
  @moduledoc """
  Marks unattached Application Logo uploads as expired.

  Business position:

      Apply UI / reviewer
        -> GraphQL resolver
        -> CMS.CommunityApplications
        -> ExpireLogoUploads
        -> Repo / Oban
  """

  use Oban.Worker, queue: :community_application, max_attempts: 3

  alias GroupherServer.CMS

  @doc """
  Marks unattached Application Logo uploads as expired and cleans their objects.

  This is an Oban callback. It returns `{:ok, :pass}` only after the bounded
  maintenance owner accepts the work; an error is returned so Oban can retry.

  ## Examples

      perform(%Oban.Job{})
  """
  @impl Oban.Worker

  def perform(_job) do
    case CMS.community_applications_expire_logo_uploads(DateTime.utc_now(:second)) do
      {:ok, _count} -> {:ok, :pass}
      {:error, reason} -> {:error, reason}
    end
  end
end
