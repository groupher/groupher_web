defmodule GroupherServer.Test.CMS.Model.ReviewRestrictionTest do
  use ExUnit.Case, async: true
  alias GroupherServer.CMS

  alias CMS.Model.ArticleReviewRestriction

  test "restriction end metadata is all present or all absent" do
    base = %{
      article_id: Ecto.UUID.generate(),
      type: :awaiting_ai,
      source_ref: "submit:1",
      source: :request,
      applied_at: DateTime.utc_now()
    }

    assert ArticleReviewRestriction.changeset(%ArticleReviewRestriction{}, base).valid?

    refute ArticleReviewRestriction.changeset(
             %ArticleReviewRestriction{},
             Map.put(base, :resolved_at, DateTime.utc_now())
           ).valid?

    ended =
      base
      |> Map.put(:resolved_at, DateTime.utc_now())
      |> Map.put(:resolved_by_ref, Ecto.UUID.generate())
      |> Map.put(:resolution, "approved")

    assert ArticleReviewRestriction.changeset(%ArticleReviewRestriction{}, ended).valid?
  end
end
