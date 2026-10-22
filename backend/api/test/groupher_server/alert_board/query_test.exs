defmodule GroupherServer.Test.AlertBoard.QueryTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{Case, ReviewConfig, RuleSet}
  alias CMS.Model.{Article, ArticleLifecycle, ArticleReviewRestriction}
  alias ReviewBot.Model.Check

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
    assert detail.allowed_actions == [:approve, :restrict]
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

  test "content review exposes only the current actor's active report id in this scope" do
    {community, article, author} = create_pending_article()
    {:ok, reporter} = db_insert(:user)
    {:ok, other_community} = mock_community(author)

    assert {:ok, report} =
             AlertBoard.submit_report(
               %{resource: article, community_id: community.id},
               "SPAM",
               "Repeated spam",
               reporter,
               Ecto.UUID.generate()
             )

    assert {:ok, other_scope_report} =
             AlertBoard.submit_report(
               %{resource: article, community_id: other_community.id},
               "SPAM",
               "Repeated spam in another community",
               reporter,
               Ecto.UUID.generate()
             )

    target = %{kind: :article, resource: article}
    assert {:ok, reporter_projection} = AlertBoard.content_review(target, community, reporter)
    assert reporter_projection.viewer_report_id == report.id

    assert {:ok, other_scope_projection} =
             AlertBoard.content_review(target, other_community, reporter)

    assert other_scope_projection.viewer_report_id == other_scope_report.id
    refute other_scope_projection.viewer_report_id == reporter_projection.viewer_report_id

    assert {:ok, anonymous_projection} = AlertBoard.content_review(target, community, nil)
    assert is_nil(anonymous_projection.viewer_report_id)

    assert {:ok, author_projection} = AlertBoard.content_review(target, community, author)
    assert is_nil(author_projection.viewer_report_id)
  end

  test "report-only cases do not advertise approval or release" do
    {community, published, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, published.article_id)
    {:ok, reporter} = db_insert(:user)
    reviewer = db_insert(:user) |> elem(1)
    reviewer = grant_review_actions(reviewer, community.slug, ["review.read", "review.decide"])

    assert {:ok, report} =
             AlertBoard.submit_report(
               %{resource: article, community_id: community.id},
               "SPAM",
               "Please investigate this post",
               reporter,
               Ecto.UUID.generate()
             )

    case_record = Repo.get!(Case, report.case_id)

    assert {:ok, detail} =
             AlertBoard.get_case(
               %{kind: :community, community: community},
               case_record.id,
               reviewer
             )

    assert detail.active_restrictions == []
    assert detail.allowed_actions == [:restrict, :dismiss]
    refute :approve in detail.allowed_actions
    refute :release in detail.allowed_actions
  end

  test "policy-restricted cases do not advertise dismissal" do
    {community, article, _author} = create_pending_article()

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    restriction = Repo.get_by!(ArticleReviewRestriction, case_id: case_record.id)
    Repo.update!(Ecto.Changeset.change(restriction, kind: :rule_hit, source: :policy))

    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_actions(reviewer, community.slug, ["review.read", "review.decide"])

    assert {:ok, detail} =
             AlertBoard.get_case(
               %{kind: :community, community: community},
               case_record.id,
               reviewer
             )

    assert :release in detail.allowed_actions
    refute :dismiss in detail.allowed_actions
  end

  test "reported count is derived from active AlertBoard reports against the account" do
    {:ok, account} = db_insert(:user)
    {:ok, reporter} = db_insert(:user)

    assert {:ok, _report} =
             AlertBoard.submit_report(
               %{resource: account},
               "SPAM",
               "Account report",
               reporter,
               Ecto.UUID.generate()
             )

    assert {:ok, 1} = AlertBoard.reported_count(account.id)

    assert {:ok, %{entries: [report]}} = AlertBoard.my_reports(nil, reporter)

    assert {:ok, _withdrawn} =
             AlertBoard.withdraw_report(report.id, reporter, Ecto.UUID.generate())

    assert {:ok, 0} = AlertBoard.reported_count(account.id)
  end

  test "content review preserves stale restrictions and ignores superseded or resolved failures" do
    {community, article, author} = create_pending_article()
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    reviewer = db_insert(:user) |> elem(1)

    assert {:ok, _report} =
             AlertBoard.submit_report(
               %{resource: article, community_id: community.id},
               "SPAM",
               "Please review this content",
               reviewer,
               Ecto.UUID.generate()
             )

    ruleset = insert_ruleset(community.id, author)
    target_key = "article:#{article.id}"
    scope_key = "community:#{community.id}"

    insert_check(target_key, scope_key, lifecycle.review_content_token, ruleset, 1, :failed)

    assert {:ok, failed_projection} =
             AlertBoard.content_review(%{kind: :article, resource: article}, community, author)

    assert failed_projection.check_unavailable

    insert_check(target_key, scope_key, lifecycle.review_content_token, ruleset, 2, :completed)

    assert {:ok, recovered_projection} =
             AlertBoard.content_review(%{kind: :article, resource: article}, community, author)

    refute recovered_projection.check_unavailable

    {:ok, _restriction} =
      %ArticleReviewRestriction{}
      |> ArticleReviewRestriction.changeset(%{
        lifecycle_id: lifecycle.id,
        scope_key: scope_key,
        cause_key: "retained-manual-hold",
        kind: :manual_hold,
        content_token: "older-token",
        source: :human,
        created_by_operation_ref: Ecto.UUID.generate(),
        applied_at: DateTime.utc_now(:second)
      })
      |> Repo.insert()

    assert {:ok, restricted_projection} =
             AlertBoard.content_review(%{kind: :article, resource: article}, community, author)

    assert restricted_projection.status == :restricted
    assert "manual_hold" in restricted_projection.reason_codes

    insert_check(target_key, scope_key, lifecycle.review_content_token, ruleset, 3, :failed)

    case_record = Repo.get_by!(Case, target_key: target_key, scope_key: scope_key, status: :open)

    case_record
    |> Case.changeset(%{status: :resolved, resolved_at: DateTime.utc_now(:second)})
    |> Repo.update!()

    assert {:ok, resolved_projection} =
             AlertBoard.content_review(%{kind: :article, resource: article}, community, author)

    refute resolved_projection.check_unavailable
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

  defp insert_ruleset(community_id, author) do
    %RuleSet{}
    |> RuleSet.changeset(%{
      scope_key: "community:#{community_id}",
      version: 1,
      rules: %{"items" => []},
      created_by_id: author.id,
      operation_ref: Ecto.UUID.generate()
    })
    |> Repo.insert!()
  end

  defp insert_check(target_key, scope_key, content_token, ruleset, generation, state) do
    %Check{}
    |> Check.changeset(%{
      target_key: target_key,
      scope_key: scope_key,
      content_token: content_token,
      ruleset_id: ruleset.id,
      config_version: 1,
      mode: :immediate,
      generation: generation,
      trigger: :submit,
      state: state,
      result: if(state == :completed, do: :pass),
      human_epoch: 0,
      operation_ref: Ecto.UUID.generate()
    })
    |> Repo.insert!()
  end
end
