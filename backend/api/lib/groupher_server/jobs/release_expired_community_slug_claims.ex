defmodule GroupherServer.Jobs.ReleaseExpiredCommunitySlugClaims do
  @moduledoc """
  Repairs expired Application Slug Claims after their Application is terminal.

  Business position:

      Client / reviewer
        -> CMS.Communities
        -> ReleaseExpiredSlugClaims
        -> Repo / Oban
  """

  use Oban.Worker, queue: :community_application, max_attempts: 3

  alias GroupherServer.CMS

  @doc """
  Releases expired slug claims whose Application has reached a terminal state.

  This is an Oban callback. It returns `{:ok, :pass}` after the bounded
  maintenance owner reports success and returns an error for Oban retry.

  ## Examples

      perform(%Oban.Job{})
  """
  @impl Oban.Worker

  def perform(_job) do
    case CMS.communities_release_expired_slug_claims(DateTime.utc_now(:second)) do
      {:ok, _count} -> {:ok, :pass}
      {:error, reason} -> {:error, reason}
    end
  end
end
