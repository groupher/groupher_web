defmodule GroupherServer.Test.CMS.Articles.ReviewSubmissionTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Model.{Case, ReviewConfig, RuleSet}
  alias CMS.Model.{Article, ArticleBinding, ArticleLifecycle, ArticleReviewRestriction}
  alias GroupherServer.ReviewBot
  alias ReviewBot.Model.Check

  test "human-first first publication commits its Case and restriction with the public revision" do
    {:ok, user} = db_insert(:user)
    {:ok, community} = mock_community(user)
    {:ok, configs} = AlertBoard.configs_for_target(community.id, :article)
    community_config = Enum.find(configs, &(&1.scope_key == "community:#{community.id}"))

    community_config
    |> ReviewConfig.changeset(%{
      publish_mode: :human_first,
      version: community_config.version + 1
    })
    |> Repo.update!()

    attrs =
      mock_attrs(:post, %{community_id: community.id})
      |> Map.merge(%{
        title: "Human first submission",
        slug: "human-first-#{System.unique_integer([:positive])}"
      })
      |> Map.put(:body_bag, mock_body_bag(mock_rich_text("This Article awaits review.")))

    assert {:ok, published} =
             CMS.Articles.create(community, :post, attrs, user, command_id: Ecto.UUID.generate())

    article_id = published.article_id
    article = Repo.get!(Article, article_id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article_id)

    restriction =
      Repo.get_by!(ArticleReviewRestriction,
        lifecycle_id: lifecycle.id,
        scope_key: "community:#{community.id}",
        kind: :awaiting_human
      )

    case_record =
      Repo.get_by!(Case,
        target_key: "article:#{article_id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    assert lifecycle.review_epoch == 1
    assert restriction.content_token == lifecycle.review_content_token
    assert case_record.content_token == lifecycle.review_content_token

    query = CMS.gate_scope(Article, nil, :read, CMS.gate_context_scope_article_public(:post))
    refute Repo.exists?(from(row in query, where: row.id == ^article.id))

    assert {:ok, updated} =
             CMS.Articles.update(
               published,
               %{
                 title: "Edited under the immediate edit policy",
                 expected_version: published.version
               },
               user,
               Ecto.UUID.generate()
             )

    updated_lifecycle = Repo.get!(ArticleLifecycle, lifecycle.id)
    superseded_case = Repo.get!(Case, case_record.id)
    assert updated_lifecycle.review_epoch == 2
    refute updated_lifecycle.review_content_token == lifecycle.review_content_token
    assert superseded_case.status == :superseded
    assert Repo.exists?(from(row in query, where: row.id == ^article.id))
    assert updated.title == "Edited under the immediate edit policy"
  end

  test "mirroring applies destination policy and later edits recheck every bound Community" do
    {source, published, _attrs, user} = mock_article(:post)
    {:ok, destination} = mock_community(user)
    set_test_provider_profile()
    {:ok, configs} = AlertBoard.configs_for_target(destination.id, :article)
    destination_config = Enum.find(configs, &(&1.scope_key == "community:#{destination.id}"))

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: "community:#{destination.id}",
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "judge-1",
              "kind" => "judge",
              "value" => "review",
              "category" => "risk",
              "action" => "restrict"
            }
          ]
        },
        provider_profile: "review-submission-test",
        created_by_id: user.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    destination_config
    |> ReviewConfig.changeset(%{
      publish_mode: :human_first,
      edit_mode: :ai_first,
      ruleset_id: ruleset.id,
      background_check: true,
      version: destination_config.version + 1
    })
    |> Repo.update!()

    user = grant_binding_actions(user, [source, destination])

    assert {:ok, _mirrored} =
             CMS.Articles.mirror(
               destination,
               published.article_id,
               [],
               user,
               source,
               Ecto.UUID.generate()
             )

    article_id = published.article_id
    original_lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article_id)
    initial_scope = "community:#{destination.id}"

    assert Repo.get_by!(ArticleReviewRestriction,
             lifecycle_id: original_lifecycle.id,
             scope_key: initial_scope,
             content_token: original_lifecycle.review_content_token,
             kind: :awaiting_human
           ).ended_at == nil

    assert Repo.get_by!(ArticleBinding, article_id: article_id, community_id: destination.id).visible ==
             false

    assert {:ok, updated} =
             CMS.Articles.update(
               published,
               %{
                 title: "Edit reviewed in each binding",
                 expected_version: published.version
               },
               user,
               Ecto.UUID.generate()
             )

    updated_lifecycle = Repo.get!(ArticleLifecycle, original_lifecycle.id)
    assert updated_lifecycle.review_content_token != original_lifecycle.review_content_token

    assert Repo.get_by!(Case,
             target_key: "article:#{article_id}",
             scope_key: initial_scope,
             content_token: original_lifecycle.review_content_token
           ).status == :superseded

    assert Repo.get_by!(Check,
             target_key: "article:#{article_id}",
             scope_key: initial_scope,
             content_token: updated_lifecycle.review_content_token,
             state: :queued
           )

    assert Repo.get_by!(ArticleReviewRestriction,
             lifecycle_id: updated_lifecycle.id,
             scope_key: initial_scope,
             content_token: updated_lifecycle.review_content_token,
             kind: :awaiting_ai
           ).ended_at == nil

    assert updated.title == "Edit reviewed in each binding"
  end

  test "moving an Article ends its source scope and applies destination review policy" do
    {source, published, _attrs, user} = mock_article(:post)
    {:ok, destination} = mock_community(user)
    {:ok, configs} = AlertBoard.configs_for_target(destination.id, :article)
    destination_config = Enum.find(configs, &(&1.scope_key == "community:#{destination.id}"))

    destination_config
    |> ReviewConfig.changeset(%{
      publish_mode: :human_first,
      version: destination_config.version + 1
    })
    |> Repo.update!()

    user = grant_binding_actions(user, [source, destination])
    article = Repo.get!(Article, published.article_id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    source_scope = "community:#{source.id}"

    {:ok, source_hold} =
      Repo.transact_result(fn ->
        with {:ok, locked} <- CMS.Articles.Lifecycle.lock(article),
             {:ok, restriction} <-
               CMS.Articles.Lifecycle.apply_review_restriction(locked, %{
                 lifecycle_id: lifecycle.id,
                 scope_key: source_scope,
                 cause_key: "move-test:source",
                 kind: :manual_hold,
                 content_token: lifecycle.review_content_token,
                 source: :human,
                 created_by_operation_ref: Ecto.UUID.generate()
               }) do
          {:ok, restriction}
        end
      end)

    assert {:ok, _moved} =
             CMS.Articles.move(
               source,
               destination,
               article.id,
               [],
               user,
               Ecto.UUID.generate()
             )

    assert Repo.get!(ArticleReviewRestriction, source_hold.id).end_reason == "binding_removed"
    assert Repo.get_by(ArticleBinding, article_id: article.id, community_id: source.id) == nil

    destination_scope = "community:#{destination.id}"

    assert Repo.get_by!(ArticleReviewRestriction,
             lifecycle_id: lifecycle.id,
             scope_key: destination_scope,
             content_token: lifecycle.review_content_token,
             kind: :awaiting_human
           ).ended_at == nil

    refute Repo.get_by!(ArticleBinding, article_id: article.id, community_id: destination.id).visible
  end

  defp grant_binding_actions(user, communities) do
    grants =
      Enum.into(communities, %{}, fn community ->
        {community.slug,
         %{"cms" => %{"post.pin" => true, "post.edit" => true, "post.mirror" => true}}}
      end)

    global = %{
      "post.community.mirror" => true,
      "post.community.move" => true
    }

    Map.put(user, :cur_passport, Map.merge(%{"global" => global}, grants))
  end

  defp set_test_provider_profile do
    previous_token = System.get_env("REVIEW_SUBMISSION_TEST_TOKEN")
    previous_config = Application.get_env(:groupher_server, :review_bot)
    System.put_env("REVIEW_SUBMISSION_TEST_TOKEN", "test-token")

    Application.put_env(:groupher_server, :review_bot,
      profiles: %{
        "review-submission-test" => %{
          adapter: :judge_http,
          base_url: "https://judge.example.test",
          model: "test",
          credential_env: "REVIEW_SUBMISSION_TEST_TOKEN",
          modalities: [:text]
        }
      }
    )

    on_exit(fn ->
      if is_nil(previous_token) do
        System.delete_env("REVIEW_SUBMISSION_TEST_TOKEN")
      else
        System.put_env("REVIEW_SUBMISSION_TEST_TOKEN", previous_token)
      end

      if is_nil(previous_config) do
        Application.delete_env(:groupher_server, :review_bot)
      else
        Application.put_env(:groupher_server, :review_bot, previous_config)
      end
    end)
  end
end
