defmodule GroupherServer.Test.AlertBoard.ReportsTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Authorization
  alias AlertBoard.Model.{Case, Report, ReviewConfig, RuleSet}
  alias CMS.Model.{Article, ArticleLifecycle, ArticleReviewRestriction}

  test "report submit is receipt-safe and one active fact is allowed per reporter" do
    {:ok, reporter} = db_insert(:user)
    {:ok, target} = db_insert(:user)
    first_command = Ecto.UUID.generate()

    assert {:ok, %Report{} = report} =
             AlertBoard.submit_report(
               %{resource: target},
               "SPAM",
               "Repeated spam",
               reporter,
               first_command
             )

    assert {:ok, %Report{id: same_id}} =
             AlertBoard.submit_report(
               %{resource: target},
               "SPAM",
               "Repeated spam",
               reporter,
               first_command
             )

    assert same_id == report.id
    assert report.scope_key == "platform"
    assert report.target_key == "user:#{target.id}"

    assert Repo.aggregate(
             from(case_record in Case,
               where: case_record.target_key == ^report.target_key and case_record.status == :open
             ),
             :count
           ) == 1

    assert {:error, _reason} =
             AlertBoard.submit_report(
               %{resource: target},
               "SPAM",
               "Repeated spam",
               reporter,
               Ecto.UUID.generate()
             )
  end

  test "self reports are rejected and only the reporting actor may withdraw" do
    {:ok, actor} = db_insert(:user)

    assert {:error, _reason} =
             AlertBoard.submit_report(
               %{resource: actor},
               "SPAM",
               nil,
               actor,
               Ecto.UUID.generate()
             )

    {:ok, target} = db_insert(:user)

    {:ok, report} =
      AlertBoard.submit_report(
        %{resource: target},
        "OTHER",
        "Please investigate",
        actor,
        Ecto.UUID.generate()
      )

    {:ok, other_actor} = db_insert(:user)

    assert {:error, _reason} =
             AlertBoard.withdraw_report(report.id, other_actor, Ecto.UUID.generate())

    assert {:ok, %Report{withdrawn_at: %DateTime{}} = withdrawn} =
             AlertBoard.withdraw_report(report.id, actor, Ecto.UUID.generate())

    assert {:ok, %Report{id: id, withdrawn_at: %DateTime{}}} =
             AlertBoard.withdraw_report(report.id, actor, Ecto.UUID.generate())

    assert id == withdrawn.id

    assert {:ok, nil} =
             AlertBoard.viewer_report(
               %{target_key: report.target_key, scope_key: report.scope_key},
               actor
             )

    assert {:ok, %Report{withdrawn_at: nil}} =
             AlertBoard.submit_report(
               %{resource: target},
               "SPAM",
               nil,
               actor,
               Ecto.UUID.generate()
             )
  end

  test "withdrawing the final report resolves a case after its policy hold cleared" do
    {community, published, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, published.article_id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    {:ok, reporter} = db_insert(:user)

    assert {:ok, report} =
             AlertBoard.submit_report(
               %{resource: article, community_id: community.id},
               "SPAM",
               "Please review this post",
               reporter,
               Ecto.UUID.generate()
             )

    case_record = Repo.get!(Case, report.case_id)
    operation_ref = Ecto.UUID.generate()

    restriction =
      %ArticleReviewRestriction{}
      |> ArticleReviewRestriction.changeset(%{
        lifecycle_id: lifecycle.id,
        scope_key: report.scope_key,
        cause_key: "withdraw-final-report",
        kind: :rule_hit,
        content_token: report.content_token,
        source: :policy,
        case_id: case_record.id,
        created_by_operation_ref: operation_ref,
        applied_at: DateTime.utc_now(:second)
      })
      |> Repo.insert!()

    restriction
    |> ArticleReviewRestriction.changeset(%{
      ended_at: DateTime.utc_now(:second),
      ended_by_operation_ref: Ecto.UUID.generate(),
      end_reason: "review_approved"
    })
    |> Repo.update!()

    assert {:ok, :kept_open} = AlertBoard.resolve_policy_case(case_record)
    assert Repo.get!(Case, case_record.id).status == :open

    assert {:ok, %Report{withdrawn_at: %DateTime{}}} =
             AlertBoard.withdraw_report(report.id, reporter, Ecto.UUID.generate())

    resolved_case = Repo.get!(Case, case_record.id)
    assert resolved_case.status == :resolved
    assert resolved_case.resolution == "reports_withdrawn"
  end

  test "Article and Comment authors cannot report their own content" do
    {community, published, _attrs, author} = mock_article(:post)
    article = Repo.get!(Article, published.article_id)

    assert {:error, _reason} =
             AlertBoard.submit_report(
               %{resource: article, community_id: community.id},
               "SPAM",
               "Author cannot report own Article",
               author,
               Ecto.UUID.generate()
             )

    assert {:ok, comment} =
             CMS.Comments.create_comment(
               community,
               :post,
               article_inner_id(published, community),
               mock_comment("Own comment report guard"),
               author,
               Ecto.UUID.generate()
             )

    assert {:error, _reason} =
             AlertBoard.submit_report(
               %{resource: comment},
               "SPAM",
               "Author cannot report own Comment",
               author,
               Ecto.UUID.generate()
             )
  end

  test "my reports returns only the current actor's active facts without resolving targets" do
    {:ok, reporter} = db_insert(:user)
    {:ok, other_reporter} = db_insert(:user)
    {:ok, target} = db_insert(:user)

    {:ok, own_report} =
      AlertBoard.submit_report(
        %{resource: target},
        "OTHER",
        "Please investigate",
        reporter,
        Ecto.UUID.generate()
      )

    {:ok, _other_report} =
      AlertBoard.submit_report(
        %{resource: target},
        "OTHER",
        "Another report",
        other_reporter,
        Ecto.UUID.generate()
      )

    assert {:ok, %{entries: [entry]}} = AlertBoard.my_reports(nil, reporter)
    assert entry.id == own_report.id
    assert {:error, _reason} = AlertBoard.my_reports(nil, nil)
  end

  test "config updates pin immutable rules and use optimistic version plus receipt replay" do
    {:ok, actor} = db_insert(:user)
    {:ok, community} = mock_community(actor)

    actor = %{
      actor
      | cur_passport: %{
          "global" => %{},
          community.slug => %{"cms" => %{"review.configure" => true}}
        }
    }

    scope = %{kind: :community, community: community}
    assert {:ok, :pass} = Authorization.authorize(scope, "review.configure", actor)
    {:ok, current} = AlertBoard.Query.review_config(scope, :article, actor)
    command_id = Ecto.UUID.generate()

    attrs = %{
      publish_mode: :immediate,
      edit_mode: :immediate,
      background_check: false,
      rules: %{
        "items" => [
          %{
            "id" => "spam-word",
            "kind" => "word",
            "value" => "spam phrase",
            "category" => "spam",
            "action" => "restrict"
          }
        ]
      },
      prompt: nil,
      provider_profile: nil,
      required_modalities: ["text"]
    }

    image_required_attrs = %{attrs | required_modalities: ["text", "image"]}

    assert {:error, _reason} =
             AlertBoard.update_config(
               scope,
               :article,
               current.version,
               image_required_attrs,
               actor,
               Ecto.UUID.generate()
             )

    disabled_judge_attrs = %{
      image_required_attrs
      | rules: %{
          "items" => [
            %{
              "id" => "image-judge",
              "kind" => "judge",
              "value" => "review image content",
              "category" => "safety",
              "action" => "review"
            }
          ]
        }
    }

    assert {:error, _reason} =
             AlertBoard.update_config(
               scope,
               :article,
               current.version,
               disabled_judge_attrs,
               actor,
               Ecto.UUID.generate()
             )

    assert {:ok, %ReviewConfig{version: 2, ruleset_id: ruleset_id}} =
             AlertBoard.update_config(scope, :article, current.version, attrs, actor, command_id)

    assert {:ok, %ReviewConfig{version: 2, ruleset_id: ^ruleset_id}} =
             AlertBoard.update_config(scope, :article, current.version, attrs, actor, command_id)

    assert %RuleSet{version: 1, rules: %{"items" => [%{"id" => "spam-word"}]}} =
             Repo.get!(RuleSet, ruleset_id)

    assert {:error, _reason} =
             AlertBoard.update_config(
               scope,
               :article,
               current.version,
               attrs,
               actor,
               Ecto.UUID.generate()
             )
  end
end
