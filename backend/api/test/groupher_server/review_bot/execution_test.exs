defmodule GroupherServer.Test.ReviewBot.ExecutionTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

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

  test "scheduled recovery expires a queued payload and opens human review without an Attempt" do
    {community, article_view, _attrs, author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    scope_key = "community:#{community.id}"
    token = "revision:expired-#{Ecto.UUID.generate()}"

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: scope_key,
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "judge-1",
              "kind" => "judge",
              "value" => "Review this content",
              "category" => "risk",
              "action" => "review"
            }
          ]
        },
        provider_profile: "missing-profile",
        created_by_id: author.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)

    lifecycle
    |> ArticleLifecycle.changeset(%{review_content_token: token, review_epoch: 1})
    |> Repo.update!()

    waiting =
      %ArticleReviewRestriction{}
      |> ArticleReviewRestriction.changeset(%{
        lifecycle_id: lifecycle.id,
        scope_key: scope_key,
        cause_key: "awaiting_ai:#{token}",
        kind: :awaiting_ai,
        content_token: token,
        source: :submission,
        created_by_operation_ref: Ecto.UUID.generate(),
        applied_at: DateTime.utc_now(:second)
      })
      |> Repo.insert!()

    check =
      %Check{}
      |> Check.changeset(%{
        target_key: "article:#{article.id}",
        scope_key: scope_key,
        content_token: token,
        ruleset_id: ruleset.id,
        config_version: 1,
        mode: :ai_first,
        generation: 1,
        trigger: :submit,
        state: :queued,
        human_epoch: 1,
        payload: %{
          "provider_profile" => "missing-profile",
          "text" => %{"title" => "expired private title", "body" => "expired private body"},
          "rules" => ruleset.rules["items"],
          "required_modalities" => ["text"]
        },
        payload_expires_at: DateTime.add(DateTime.utc_now(:second), -1, :second),
        operation_ref: Ecto.UUID.generate()
      })
      |> Repo.insert!()

    assert {:ok, 1} = ReviewBot.recover_stale_checks()

    expired = Repo.get!(Check, check.id)
    assert expired.state == :failed
    assert expired.result == :review
    assert expired.payload == nil
    assert expired.payload_expires_at == nil
    assert Repo.aggregate(Attempt, :count) == 0
    assert Repo.get!(ArticleReviewRestriction, waiting.id).ended_at

    assert Repo.exists?(
             from(restriction in ArticleReviewRestriction,
               where:
                 restriction.lifecycle_id == ^lifecycle.id and restriction.scope_key == ^scope_key and
                   restriction.kind == :awaiting_human and is_nil(restriction.ended_at)
             )
           )

    assert Repo.get_by!(Case, target_key: "article:#{article.id}", scope_key: scope_key).status ==
             :open
  end

  test "a retry reclaims a running Check and sends terminal AI failure to human review" do
    {community, article, check} = running_ai_check(DateTime.utc_now(:second))

    assert {:ok, :pass} = ReviewBot.execute_check(check.id, 2, 3)

    failed = Repo.get!(Check, check.id)
    assert failed.state == :failed
    assert Repo.get_by!(Attempt, check_id: check.id, number: 1).state == :abandoned
    assert Repo.get_by!(Attempt, check_id: check.id, number: 2).state == :terminal_error

    awaiting_ai = Repo.get_by!(ArticleReviewRestriction, kind: :awaiting_ai)
    assert awaiting_ai.ended_at

    assert Repo.exists?(
             from(restriction in ArticleReviewRestriction,
               where:
                 restriction.lifecycle_id == ^awaiting_ai.lifecycle_id and
                   restriction.scope_key == ^awaiting_ai.scope_key and
                   restriction.kind == :awaiting_human and is_nil(restriction.ended_at)
             )
           )

    assert Repo.get_by!(Case,
             target_key: "article:#{article.id}",
             scope_key: "community:#{community.id}"
           ).status == :open
  end

  test "a retryable provider failure commits retry state before returning to Oban" do
    {_community, _article, check} = running_ai_check(DateTime.utc_now(:second))
    ruleset = Repo.get!(RuleSet, check.ruleset_id)
    Repo.update!(RuleSet.changeset(ruleset, %{provider_profile: "retry-test"}))

    previous_token = System.get_env("REVIEW_BOT_RETRY_TEST_TOKEN")
    previous_config = Application.get_env(:groupher_server, :review_bot)
    System.put_env("REVIEW_BOT_RETRY_TEST_TOKEN", "test-token")

    Application.put_env(:groupher_server, :review_bot,
      profiles: %{
        "retry-test" => %{
          adapter: :judge_http,
          base_url: "https://127.0.0.1:1/v1/responses",
          model: "test-model",
          credential_env: "REVIEW_BOT_RETRY_TEST_TOKEN",
          modalities: [:text]
        }
      }
    )

    on_exit(fn ->
      if previous_token do
        System.put_env("REVIEW_BOT_RETRY_TEST_TOKEN", previous_token)
      else
        System.delete_env("REVIEW_BOT_RETRY_TEST_TOKEN")
      end

      if previous_config do
        Application.put_env(:groupher_server, :review_bot, previous_config)
      else
        Application.delete_env(:groupher_server, :review_bot)
      end
    end)

    assert {:error, %{retryable: true}} = ReviewBot.execute_check(check.id, 2, 3)

    queued = Repo.get!(Check, check.id)
    assert queued.state == :queued
    assert queued.active_attempt == 2
    assert Repo.get_by!(Attempt, check_id: check.id, number: 1).state == :abandoned
    assert Repo.get_by!(Attempt, check_id: check.id, number: 2).state == :retryable_error
    assert {:ok, 0} = ReviewBot.recover_stale_checks()
  end

  test "a retry never sends an expired recovered payload to the provider" do
    {community, article, check} = running_ai_check(DateTime.utc_now(:second))

    check
    |> Check.changeset(%{
      payload_expires_at: DateTime.add(DateTime.utc_now(:second), -1, :second)
    })
    |> Repo.update!()

    assert {:ok, :pass} = ReviewBot.execute_check(check.id, 2, 3)

    expired = Repo.get!(Check, check.id)
    assert expired.state == :failed
    assert expired.result == :review
    assert expired.payload == nil
    assert expired.payload_expires_at == nil

    abandoned_attempt = Repo.get_by!(Attempt, check_id: check.id, number: 1)
    assert abandoned_attempt.state == :abandoned
    assert abandoned_attempt.error_code == "payload_expired"
    assert Repo.get_by(Attempt, check_id: check.id, number: 2) == nil

    assert Repo.get_by!(Case,
             target_key: "article:#{article.id}",
             scope_key: "community:#{community.id}"
           ).status == :open
  end

  test "the scheduled recovery closes an orphaned AI wait with a human-review Case" do
    started_at = DateTime.add(DateTime.utc_now(:second), -300, :second)
    {community, article, check} = running_ai_check(started_at)

    assert {:ok, 1} = ReviewBot.recover_stale_checks()
    assert Repo.get!(Check, check.id).state == :failed
    assert Repo.get_by!(Attempt, check_id: check.id, number: 1).state == :abandoned

    assert Repo.get_by!(Case,
             target_key: "article:#{article.id}",
             scope_key: "community:#{community.id}"
           ).status == :open
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

  test "a passing Check resolves the matching policy Case after releasing its final hold" do
    {community, article_view, _attrs, author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    scope_key = "community:#{community.id}"
    token = "revision:policy-case-resolution"

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: scope_key,
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
        created_by_id: author.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)

    lifecycle
    |> ArticleLifecycle.changeset(%{review_content_token: token, review_epoch: 1})
    |> Repo.update!()

    restrictive =
      insert_completed_check(article, scope_key, ruleset, token, 1, :restrict, [
        %{"rule_id" => "r1", "action" => "restrict", "verdict" => "hit"}
      ])

    assert :ok = apply_completed_check(article, lifecycle.id, restrictive)
    case_record = Repo.get_by!(Case, target_key: "article:#{article.id}", scope_key: scope_key)
    assert case_record.status == :open

    passing =
      insert_completed_check(article, scope_key, ruleset, token, 2, :pass, [
        %{"rule_id" => "r1", "action" => "restrict", "verdict" => "pass"}
      ])

    pending =
      %Check{}
      |> Check.changeset(%{
        target_key: "article:#{article.id}",
        scope_key: scope_key,
        content_token: token,
        ruleset_id: ruleset.id,
        config_version: 1,
        mode: :ai_first,
        generation: 3,
        trigger: :manual,
        state: :queued,
        human_epoch: 1,
        payload: %{"text" => %{"body" => "pending"}},
        payload_expires_at: DateTime.add(DateTime.utc_now(:second), 60, :second),
        operation_ref: Ecto.UUID.generate()
      })
      |> Repo.insert!()

    assert :ok = apply_completed_check(article, lifecycle.id, passing)
    assert Repo.get!(Case, case_record.id).status == :open

    pending =
      pending
      |> Check.changeset(%{
        state: :completed,
        result: :pass,
        signals: %{
          "items" => [%{"rule_id" => "r1", "action" => "restrict", "verdict" => "pass"}]
        },
        payload: nil,
        payload_expires_at: nil
      })
      |> Repo.update!()

    assert :ok = apply_completed_check(article, lifecycle.id, pending)

    assert Repo.get!(Case, case_record.id).status == :resolved
    assert Repo.get_by!(Decision, operation_ref: passing.operation_ref).action == :approve

    assert Repo.exists?(
             from(restriction in ArticleReviewRestriction,
               where: restriction.check_id == ^restrictive.id and not is_nil(restriction.ended_at)
             )
           )
  end

  defp insert_completed_check(article, scope_key, ruleset, token, generation, result, signals) do
    %Check{}
    |> Check.changeset(%{
      target_key: "article:#{article.id}",
      scope_key: scope_key,
      content_token: token,
      ruleset_id: ruleset.id,
      config_version: 1,
      mode: :ai_first,
      generation: generation,
      trigger: :submit,
      state: :completed,
      result: result,
      signals: %{"items" => signals},
      human_epoch: 1,
      operation_ref: Ecto.UUID.generate()
    })
    |> Repo.insert!()
  end

  defp apply_completed_check(article, lifecycle_id, check) do
    Repo.transaction(fn ->
      lifecycle =
        ArticleLifecycle
        |> Ecto.Query.where([row], row.id == ^lifecycle_id)
        |> Ecto.Query.lock("FOR UPDATE")
        |> Repo.one!()

      with {:ok, target} <-
             CMS.load_review_target_for_update("article:#{article.id}", check.scope_key),
           {:ok, :pass} <-
             ReviewBot.apply_completed_check(check, Map.put(target, :lifecycle, lifecycle)) do
        :ok
      else
        {:error, reason} -> Repo.rollback(reason)
      end
    end)
    |> case do
      {:ok, :ok} -> :ok
      other -> other
    end
  end

  defp running_ai_check(started_at) do
    {community, article_view, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    {:ok, user} = db_insert(:user)
    token = "revision:orphaned-#{Ecto.UUID.generate()}"
    operation_ref = Ecto.UUID.generate()
    scope_key = "community:#{community.id}"

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: scope_key,
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "judge-1",
              "kind" => "judge",
              "value" => "Review this content",
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

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)

    lifecycle
    |> ArticleLifecycle.changeset(%{review_content_token: token, review_epoch: 1})
    |> Repo.update!()

    %ArticleReviewRestriction{}
    |> ArticleReviewRestriction.changeset(%{
      lifecycle_id: lifecycle.id,
      scope_key: scope_key,
      cause_key: "awaiting_ai:#{token}",
      kind: :awaiting_ai,
      content_token: token,
      source: :submission,
      created_by_operation_ref: Ecto.UUID.generate(),
      applied_at: DateTime.utc_now(:second)
    })
    |> Repo.insert!()

    check =
      %Check{}
      |> Check.changeset(%{
        target_key: "article:#{article.id}",
        scope_key: scope_key,
        content_token: token,
        ruleset_id: ruleset.id,
        config_version: 1,
        mode: :ai_first,
        generation: 1,
        trigger: :submit,
        state: :running,
        active_attempt: 1,
        human_epoch: 1,
        payload: %{
          "provider_profile" => "missing-profile",
          "text" => %{"title" => "private title", "body" => "private body"},
          "rules" => ruleset.rules["items"],
          "required_modalities" => ["text"]
        },
        payload_expires_at: DateTime.add(DateTime.utc_now(:second), 60, :second),
        operation_ref: operation_ref
      })
      |> Repo.insert!()

    %Attempt{}
    |> Attempt.changeset(%{
      check_id: check.id,
      number: 1,
      state: :running,
      started_at: started_at,
      provider_profile: "missing-profile",
      request_id: Ecto.UUID.generate()
    })
    |> Repo.insert!()

    {community, article, check}
  end
end
