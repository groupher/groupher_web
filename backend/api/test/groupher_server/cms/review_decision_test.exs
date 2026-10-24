defmodule GroupherServer.Test.CMS.ReviewDecisionTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{CMS, Repo}
  alias CMS.Model.ArticleReviewBlock

  test "human deny and release run as receipt-backed CMS decisions" do
    {community, article, _attrs, _author} = mock_article(:post)
    {:ok, reviewer} = db_insert(:user)

    reviewer = %{
      reviewer
      | cur_passport: %{
          "global" => %{},
          community.slug => %{"cms" => %{"review.decide" => true}}
        }
    }

    target_key = "article:#{article.id}"
    scope_key = "community:#{community.id}"

    assert {:ok, _result} =
             CMS.decide_review_target(
               target_key,
               scope_key,
               :deny,
               reviewer,
               Ecto.UUID.generate()
             )

    assert %ArticleReviewBlock{type: :manual_hold, source: :human} =
             Repo.one!(
               from(restriction in ArticleReviewBlock,
                 where:
                   restriction.article_id == ^article.id and
                     restriction.community_id == ^community.id and
                     restriction.source == :human and is_nil(restriction.resolved_at)
               )
             )

    assert {:ok, _result} =
             CMS.decide_review_target(
               target_key,
               scope_key,
               :release,
               reviewer,
               Ecto.UUID.generate()
             )

    assert Repo.aggregate(
             from(restriction in ArticleReviewBlock,
               where:
                 restriction.article_id == ^article.id and
                   restriction.community_id == ^community.id and restriction.source == :human and
                   is_nil(restriction.resolved_at)
             ),
             :count
           ) == 0
  end
end
