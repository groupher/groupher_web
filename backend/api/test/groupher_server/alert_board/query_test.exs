defmodule GroupherServer.Test.AlertBoard.QueryTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Model.{Case, ReviewConfig}
  alias CMS.Model.Article

  test "case detail returns a safe summary and actions only for authorized reviewers" do
    {community, article, author} = create_pending_article()

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_actions(reviewer, community.slug, ["review.read", "review.decide"])

    assert {:ok, detail} =
             AlertBoard.get_case(
               %{kind: :community, community: community},
               case_record.id,
               reviewer
             )

    assert detail.safe_summary == "Article review case"
    assert detail.allowed_actions == [:approve, :restrict, :dismiss, :release]
    refute detail.safe_summary =~ "awaits review"

    reader = grant_review_actions(reviewer, community.slug, ["review.read"])

    assert {:ok, reader_detail} =
             AlertBoard.get_case(
               %{kind: :community, community: community},
               case_record.id,
               reader
             )

    assert reader_detail.allowed_actions == []

    author = grant_review_actions(author, community.slug, ["review.read", "review.decide"])

    assert {:ok, author_detail} =
             AlertBoard.get_case(
               %{kind: :community, community: community},
               case_record.id,
               author
             )

    assert author_detail.allowed_actions == []
  end

  test "content review exposes only the current actor's active report id" do
    {community, article, author} = create_pending_article()
    {:ok, reporter} = db_insert(:user)

    assert {:ok, report} =
             AlertBoard.submit_report(
               %{resource: article, community_id: community.id},
               "SPAM",
               "Repeated spam",
               reporter,
               Ecto.UUID.generate()
             )

    target = %{kind: :article, resource: article}
    assert {:ok, reporter_projection} = AlertBoard.content_review(target, community, reporter)
    assert reporter_projection.viewer_report_id == report.id

    assert {:ok, anonymous_projection} = AlertBoard.content_review(target, community, nil)
    assert is_nil(anonymous_projection.viewer_report_id)

    assert {:ok, author_projection} = AlertBoard.content_review(target, community, author)
    assert is_nil(author_projection.viewer_report_id)
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

  defp grant_review_actions(user, community_slug, actions) do
    passport_actions = Map.new(actions, &{&1, true})

    %{
      user
      | cur_passport: %{
          "global" => %{},
          community_slug => %{"cms" => passport_actions}
        }
    }
  end
end
