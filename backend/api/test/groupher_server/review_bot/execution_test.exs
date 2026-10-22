defmodule GroupherServer.Test.ReviewBot.ExecutionTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{Case, Decision, RuleSet}

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleLifecycle,
    ArticlePublic,
    ArticleReviewRestriction
  }

  alias ReviewBot.Model.{Attempt, Check}

  test "a queued Check for an old token is superseded before a provider Attempt is created" do
    {community, article_view, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    {:ok, user} = db_insert(:user)

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: "community:#{community.id}",
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "j1",
              "kind" => "judge",
              "value" => "prompt",
              "category" => "risk",
              "action" => "review"
            }
          ]
        },
        provider_profile: "missing-profile",
        created_by_id: user.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    check =
      %Check{}
      |> Check.changeset(%{
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        content_token: "revision:old",
        ruleset_id: ruleset.id,
        config_version: 1,
        mode: :ai_first,
        generation: 1,
        trigger: :submit,
        state: :queued,
        human_epoch: 0,
        payload: %{
          "provider_profile" => "missing-profile",
          "text" => %{"title" => "private", "body" => "body"}
        },
        payload_expires_at: DateTime.add(DateTime.utc_now(:second), 60, :second),
        operation_ref: Ecto.UUID.generate()
      })
      |> Repo.insert!()

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)

    lifecycle
    |> ArticleLifecycle.changeset(%{review_content_token: "revision:new", review_epoch: 1})
    |> Repo.update!()

    assert {:ok, :superseded} = ReviewBot.execute_check(check.id, 1, 3)
    assert Repo.get!(Check, check.id).state == :superseded
    assert Repo.get!(Check, check.id).payload == nil
    assert Repo.aggregate(Attempt, :count) == 0
  end

  test "applying a completed restrictive Check atomically opens a Case and hides its scope" do
    {community, article_view, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    token = "revision:review-result-test"
    operation_ref = Ecto.UUID.generate()
    {:ok, user} = db_insert(:user)

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: "community:#{community.id}",
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "r1",
              "kind" => "word",
              "value" => "badword",
              "category" => "spam",
              "action" => "restrict"
            }
          ]
        },
        created_by_id: user.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    check =
      %Check{}
      |> Check.changeset(%{
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}",
        content_token: token,
        ruleset_id: ruleset.id,
        config_version: 1,
        mode: :immediate,
        generation: 1,
        trigger: :submit,
        state: :completed,
        result: :restrict,
        signals: %{
          "items" => [
            %{"rule_id" => "r1", "action" => "restrict", "verdict" => "hit"}
          ]
        },
        operation_ref: operation_ref
      })
      |> Repo.insert!()

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)

    assert {:ok, :pass} =
             Repo.transaction(fn ->
               locked =
                 ArticleLifecycle
                 |> Ecto.Query.where([row], row.id == ^lifecycle.id)
                 |> Ecto.Query.lock("FOR UPDATE")
                 |> Repo.one!()

               locked
               |> ArticleLifecycle.changeset(%{review_content_token: token, review_epoch: 1})
               |> Repo.update!()

               with {:ok, target} <-
                      CMS.load_review_target_for_update(
                        "article:#{article.id}",
                        "community:#{community.id}"
                      ),
                    {:ok, result} <-
                      ReviewBot.apply_completed_check(%{check | human_epoch: 1}, target) do
                 result
               else
                 {:error, reason} -> Repo.rollback(reason)
               end
             end)

    assert Repo.get_by!(ArticlePublic, article_id: article.id).visible

    refute Repo.get_by!(ArticleBinding,
             article_id: article.id,
             community_id: community.id
           ).visible

    restriction = Repo.get_by!(ArticleReviewRestriction, check_id: check.id)

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}"
      )

    decision = Repo.get_by!(Decision, operation_ref: check.operation_ref)

    assert case_record.status == :open
    assert decision.action == :restrict
    assert decision.case_id == case_record.id
    assert decision.restriction_ids == [restriction.id]

    assert {:ok, :pass} =
             Repo.transaction(fn ->
               with {:ok, target} <-
                      CMS.load_review_target_for_update(
                        "article:#{article.id}",
                        "community:#{community.id}"
                      ),
                    {:ok, result} <-
                      ReviewBot.apply_completed_check(%{check | human_epoch: 1}, target) do
                 result
               else
                 {:error, reason} -> Repo.rollback(reason)
               end
             end)

    assert Repo.aggregate(ArticleReviewRestriction, :count) == 1
    assert Repo.aggregate(Case, :count) == 1
    assert Repo.aggregate(Decision, :count) == 1
  end
end
