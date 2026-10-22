defmodule GroupherServer.Test.AlertBoard.DecideCaseTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Model.{Case, Decision, ReviewConfig, RuleSet}
  alias CMS.Model.Article
  alias CMS.Model.ArticleReviewRestriction
  alias GroupherServer.ReviewBot
  alias ReviewBot.Model.{Attempt, Check}

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

  test "human approval supersedes an in-flight model check" do
    {community, article, _author} = create_pending_article()
    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_action(reviewer, community.slug, "review.decide")

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    restriction = Repo.get_by!(ArticleReviewRestriction, case_id: case_record.id)
    {check, attempt} = running_check(case_record)

    assert {:ok, %Decision{action: :approve}} =
             AlertBoard.decide_case(
               case_record.id,
               %{
                 expected_case_version: case_record.version,
                 expected_content_token: case_record.content_token,
                 action: :approve,
                 restriction_ids: [restriction.id],
                 reason_code: "verified",
                 note: "Human decision supersedes queued AI"
               },
               reviewer,
               Ecto.UUID.generate()
             )

    assert Repo.get!(Check, check.id).state == :superseded
    assert Repo.get!(Check, check.id).payload == nil
    assert Repo.get!(Attempt, attempt.id).state == :abandoned
  end

  test "restrict replaces an awaiting-human wait with a releasable manual hold" do
    {community, article, _author} = create_pending_article()
    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_action(reviewer, community.slug, "review.decide")

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    waiting = Repo.get_by!(ArticleReviewRestriction, case_id: case_record.id)

    assert {:ok, %Decision{action: :restrict, restriction_ids: ids}} =
             AlertBoard.decide_case(
               case_record.id,
               %{
                 expected_case_version: case_record.version,
                 expected_content_token: case_record.content_token,
                 action: :restrict,
                 restriction_ids: [],
                 reason_code: "policy_violation",
                 note: "Keep this content restricted"
               },
               reviewer,
               Ecto.UUID.generate()
             )

    ended_wait = Repo.get!(ArticleReviewRestriction, waiting.id)
    assert ended_wait.ended_at
    assert ended_wait.end_reason == "human_restriction_decided"

    manual_hold =
      Repo.one!(
        from(row in ArticleReviewRestriction,
          where: row.kind == :manual_hold and is_nil(row.ended_at)
        )
      )

    assert manual_hold.case_id == case_record.id
    assert manual_hold.id in ids
    assert waiting.id in ids
    restricted_case = Repo.get!(Case, case_record.id)
    assert restricted_case.status == :open

    assert {:ok, %Decision{action: :release}} =
             AlertBoard.decide_case(
               restricted_case.id,
               %{
                 expected_case_version: restricted_case.version,
                 expected_content_token: restricted_case.content_token,
                 action: :release,
                 restriction_ids: [manual_hold.id],
                 reason_code: "restriction_lifted",
                 note: "Manual hold can now be lifted"
               },
               reviewer,
               Ecto.UUID.generate()
             )

    assert Repo.get!(ArticleReviewRestriction, manual_hold.id).ended_at
    assert Repo.get!(Case, case_record.id).status == :resolved
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

  test "reviewers cannot dismiss a case while a policy restriction remains active" do
    {community, article, _author} = create_pending_article()
    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_action(reviewer, community.slug, "review.decide")

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    restriction = Repo.get_by!(ArticleReviewRestriction, case_id: case_record.id)
    Repo.update!(Ecto.Changeset.change(restriction, kind: :rule_hit, source: :policy))

    assert {:error, _reason} =
             AlertBoard.decide_case(
               case_record.id,
               %{
                 expected_case_version: case_record.version,
                 expected_content_token: case_record.content_token,
                 action: :dismiss,
                 restriction_ids: [],
                 reason_code: "not_a_report",
                 note: "The policy hold still needs review"
               },
               reviewer,
               Ecto.UUID.generate()
             )

    assert Repo.get!(Case, case_record.id).status == :open
    assert is_nil(Repo.get!(ArticleReviewRestriction, restriction.id).ended_at)
  end

  test "platform reviewer cannot decide a report against their own account" do
    {:ok, account} = db_insert(:user)
    {:ok, reporter} = db_insert(:user)

    assert {:ok, _report} =
             AlertBoard.submit_report(
               %{resource: account},
               "SPAM",
               "Report for self-review guard",
               reporter,
               Ecto.UUID.generate()
             )

    case_record = Repo.get_by!(Case, target_key: "user:#{account.id}", status: :open)

    platform_reviewer = %{
      account
      | cur_passport: %{"global" => %{"review.platform.decide" => true}}
    }

    assert {:error, _reason} =
             AlertBoard.decide_case(
               case_record.id,
               %{
                 expected_case_version: case_record.version,
                 expected_content_token: case_record.content_token,
                 action: :dismiss,
                 restriction_ids: [],
                 reason_code: "not_a_report",
                 note: "Must not decide own account report"
               },
               platform_reviewer,
               Ecto.UUID.generate()
             )
  end

  test "release decisions can clear an active policy rule hit from older content" do
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
      Repo.get_by!(ArticleReviewRestriction,
        case_id: case_record.id,
        kind: :awaiting_human
      )

    restriction =
      restriction
      |> ArticleReviewRestriction.changeset(%{
        kind: :rule_hit,
        source: :policy,
        content_token: "older-content-token",
        cause_key: "rule:word-1"
      })
      |> Repo.update!()

    attrs = %{
      expected_case_version: case_record.version,
      expected_content_token: case_record.content_token,
      action: :release,
      restriction_ids: [restriction.id],
      reason_code: "rule_no_longer_applies",
      note: "Reviewed the edited content"
    }

    assert {:ok, %Decision{action: :release} = decision} =
             AlertBoard.decide_case(case_record.id, attrs, reviewer, Ecto.UUID.generate())

    ended = Repo.get!(ArticleReviewRestriction, restriction.id)
    assert ended.ended_at
    assert ended.end_reason == "released"
    assert decision.restriction_ids == [restriction.id]
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

  defp running_check(%Case{} = case_record) do
    {:ok, user} = db_insert(:user)
    scope_key = case_record.scope_key

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: scope_key,
        version: 1,
        rules: %{"items" => []},
        created_by_id: user.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    check =
      %Check{}
      |> Check.changeset(%{
        target_key: case_record.target_key,
        scope_key: scope_key,
        content_token: case_record.content_token,
        ruleset_id: ruleset.id,
        config_version: 1,
        mode: :human_first,
        generation: 1,
        trigger: :submit,
        state: :running,
        active_attempt: 1,
        human_epoch: 1,
        payload: %{"text" => %{"title" => "queued", "body" => "check"}},
        payload_expires_at: DateTime.add(DateTime.utc_now(:second), 60, :second),
        operation_ref: Ecto.UUID.generate()
      })
      |> Repo.insert!()

    attempt =
      %Attempt{}
      |> Attempt.changeset(%{
        check_id: check.id,
        number: 1,
        state: :running,
        started_at: DateTime.utc_now(:second),
        provider_profile: "test",
        request_id: Ecto.UUID.generate()
      })
      |> Repo.insert!()

    {check, attempt}
  end
end
