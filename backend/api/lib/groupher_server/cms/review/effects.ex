defmodule GroupherServer.CMS.Review.Effects do
  @moduledoc """
  Enqueues durable AI review work from a CMS-owned request transaction.

  Business position:

      CMS ReviewRequest -> Review Effects -> Outbox event -> Oban worker
  """

  alias GroupherServer.CMS
  alias CMS.Model.ReviewRequest

  @doc "Writes the request's reliable review event in the caller-owned transaction."
  @spec enqueue_review_request(ReviewRequest.t()) :: {:ok, struct()} | {:error, term()}
  def enqueue_review_request(%ReviewRequest{id: request_id}) do
    CMS.Outbox.send(%{
      event: "cms.review_request",
      worker: GroupherServer.Jobs.CMSReviewRequest,
      resource_type: "review_request",
      resource_id: request_id,
      identity: {:workflow, "review-request:#{request_id}"},
      effect_key: "review-request:#{request_id}",
      data: %{"request_id" => request_id}
    })
  end
end
