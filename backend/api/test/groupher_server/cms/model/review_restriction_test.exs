defmodule GroupherServer.Test.CMS.Model.ReviewRestrictionTest do
  use ExUnit.Case, async: true
  alias GroupherServer.{CMS}

  alias CMS.Model.ArticleReviewRestriction

  test "restriction end metadata is all present or all absent" do
    base = %{
      lifecycle_id: 1,
      scope_key: "platform",
      cause_key: "submit:1",
      kind: :awaiting_ai,
      content_token: "v1",
      source: :submission,
      created_by_operation_ref: Ecto.UUID.generate(),
      applied_at: DateTime.utc_now()
    }

    assert ArticleReviewRestriction.changeset(%ArticleReviewRestriction{}, base).valid?

    refute ArticleReviewRestriction.changeset(
             %ArticleReviewRestriction{},
             Map.put(base, :ended_at, DateTime.utc_now())
           ).valid?

    ended =
      base
      |> Map.put(:ended_at, DateTime.utc_now())
      |> Map.put(:ended_by_operation_ref, Ecto.UUID.generate())
      |> Map.put(:end_reason, "approved")

    assert ArticleReviewRestriction.changeset(%ArticleReviewRestriction{}, ended).valid?
  end
end
