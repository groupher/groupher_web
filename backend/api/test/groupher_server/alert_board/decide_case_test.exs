defmodule GroupherServer.Test.AlertBoard.DecideCaseTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Model.{Case, Decision, ReviewConfig}
  alias CMS.Model.Article
  alias CMS.Model.ArticleReviewRestriction

  test "approval ends selected restrictions and records one receipt-backed decision" do
    {community, article, _author} = create_pending_article()
    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_action(reviewer, community.slug, "review.decide")

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    restriction =
      Repo.one!(
        from(row in ArticleReviewRestriction,
          where:
            row.case_id == ^case_record.id and row.kind == :awaiting_human and
              is_nil(row.ended_at)
        )
      )

    command_id = Ecto.UUID.generate()

    attrs = %{
      expected_case_version: case_record.version,
      expected_content_token: case_record.content_token,
      action: :approve,
      restriction_ids: [restriction.id],
      reason_code: "verified",
      note: "Reviewed and approved"
    }

    assert {:ok, %Decision{action: :approve, actor_id: reviewer_id} = decision} =
             AlertBoard.decide_case(case_record.id, attrs, reviewer, command_id)

    assert reviewer_id == reviewer.id
    assert decision.case_id == case_record.id

    assert {:ok, %Decision{id: decision_id}} =
             AlertBoard.decide_case(case_record.id, attrs, reviewer, command_id)

    assert decision_id == decision.id
    assert Repo.get!(Case, case_record.id).status == :resolved
    assert Repo.get!(ArticleReviewRestriction, restriction.id).ended_at
  end

  test "reviewers cannot decide their own Article and stale case versions are rejected" do
    {community, article, author} = create_pending_article()
    author = grant_review_action(author, community.slug, "review.decide")

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    attrs = %{
      expected_case_version: case_record.version,
      expected_content_token: case_record.content_token,
      action: :dismiss,
      restriction_ids: [],
      reason_code: "not_a_report",
      note: nil
    }

    assert {:error, _reason} =
             AlertBoard.decide_case(case_record.id, attrs, author, Ecto.UUID.generate())

    reviewer = db_insert(:user) |> elem(1) |> grant_review_action(community.slug, "review.decide")

    assert {:error, _reason} =
             AlertBoard.decide_case(
               case_record.id,
               %{attrs | expected_case_version: case_record.version + 1},
               reviewer,
               Ecto.UUID.generate()
             )
  end

  defp grant_review_action(user, community_slug, action) do
    %{
      user
      | cur_passport: %{
          "global" => %{},
          community_slug => %{"cms" => %{action => true}}
        }
    }
  end

  defp create_pending_article do
    {:ok, author} = db_insert(:user)
    {:ok, community} = mock_community(author)
    {:ok, configs} = AlertBoard.configs_for_target(community.id, :article)
    config = Enum.find(configs, &(&1.scope_key == "community:#{community.id}"))

    config
    |> ReviewConfig.changeset(%{publish_mode: :human_first, version: config.version + 1})
    |> Repo.update!()

    attrs =
      mock_attrs(:post, %{community_id: community.id})
      |> Map.merge(%{
        title: "Pending review",
        slug: "pending-#{System.unique_integer([:positive])}"
      })
      |> Map.put(:body_bag, mock_body_bag(mock_rich_text("This Article awaits review.")))

    {:ok, published} =
      CMS.Articles.create(community, :post, attrs, author, command_id: Ecto.UUID.generate())

    {community, Repo.get!(Article, published.article_id), author}
  end
end
