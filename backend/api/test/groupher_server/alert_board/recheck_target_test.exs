defmodule GroupherServer.Test.AlertBoard.RecheckTargetTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{ReviewConfig, RuleSet}
  alias CMS.Articles.Draft.Store
  alias CMS.Model.{Article, ArticleLifecycle, DocBranch, DocLifecycle}
  alias ReviewBot.Model.Check
  alias GroupherServerWeb.Schema

  test "rechecks the current snapshot with the latest scope config and a new generation" do
    {:ok, author} = db_insert(:user)
    {:ok, community} = mock_community(author)
    config = config_for(community.id)
    configure_word_check(config, author)
    config = Repo.get!(ReviewConfig, config.id)

    attrs =
      mock_attrs(:post, %{community_id: community.id})
      |> Map.merge(%{
        title: "Recheck target",
        slug: "recheck-#{System.unique_integer([:positive])}"
      })
      |> Map.put(:body_bag, mock_body_bag(mock_rich_text("A stable published body.")))

    assert {:ok, published} =
             CMS.Articles.create(community, :post, attrs, author,
               command_id: Ecto.UUID.generate()
             )

    article = Repo.get!(Article, published.article_id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)

    first_check =
      Repo.get_by!(Check,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}"
      )

    platform_check = insert_platform_check(article, lifecycle, author)
    queued_community_check = insert_community_check(article, lifecycle, config)
    initial_epoch = lifecycle.review_epoch

    reviewer = grant_review_action(db_insert(:user) |> elem(1), community.slug)
    scope = %{kind: :community, community: community}

    assert {:ok, [%Check{} = recheck]} =
             AlertBoard.recheck(
               %{kind: :article, id: article.id},
               scope,
               reviewer,
               Ecto.UUID.generate()
             )

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    platform_check = Repo.get!(Check, platform_check.id)
    queued_community_check = Repo.get!(Check, queued_community_check.id)
    assert recheck.generation == queued_community_check.generation + 1
    assert recheck.content_token == first_check.content_token
    assert lifecycle.review_epoch == initial_epoch
    assert recheck.human_epoch == initial_epoch
    assert platform_check.state == :queued
    assert queued_community_check.state == :superseded
    assert platform_check.human_epoch == lifecycle.review_epoch

    checks =
      Repo.all(
        from(check in Check,
          where:
            check.target_key == ^"article:#{article.id}" and
              check.scope_key == ^"community:#{community.id}",
          order_by: [asc: check.generation]
        )
      )

    assert Enum.map(checks, & &1.generation) == [1, 2, 3]
  end

  test "rechecks one published Doc branch using only the platform policy" do
    {:ok, user} = db_insert(:user)
    {:ok, community} = db_insert(:community)
    {:ok, author} = CMS.Articles.Persist.ensure_author_exists(user)
    config = doc_config()
    configure_doc_word_check(config, user)

    {:ok, branch} =
      %DocBranch{}
      |> DocBranch.changeset(%{
        community_id: community.id,
        slug: "main",
        title: "Main",
        type: :main,
        status: :active,
        created_by_id: user.id
      })
      |> Repo.insert()

    {:ok, %{article: article, draft: draft}} =
      Store.create(
        community,
        :doc,
        %{
          title: "Rechecked Doc",
          slug: "rechecked-doc-#{System.unique_integer([:positive])}",
          body_bag: mock_body_bag(mock_rich_text("A safe branch body."))
        },
        author,
        branch_id: branch.id
      )

    assert {:ok, _published} =
             CMS.Articles.Publish.Doc.publish(article, branch.id, author,
               expected_draft_version: draft.version,
               expected_lifecycle_version: 1,
               command_id: Ecto.UUID.generate()
             )

    lifecycle = Repo.get_by!(DocLifecycle, article_id: article.id, branch_id: branch.id)
    reviewer = grant_platform_review_action(user)

    command_id = Ecto.UUID.generate()

    assert {:ok,
            %{
              data: %{
                "recheckReviewTarget" => %{
                  "commandId" => ^command_id,
                  "checkIds" => [check_id]
                }
              }
            }} =
             Absinthe.run(
               """
               mutation Recheck($target: ReviewRecheckTargetInput!, $scope: ReviewScopeInput!, $commandId: ID!) {
                 recheckReviewTarget(target: $target, scope: $scope, commandId: $commandId) {
                   commandId
                   checkIds
                 }
               }
               """,
               Schema,
               variables: %{
                 "target" => %{
                   "kind" => "DOC",
                   "docArticleId" => article.id,
                   "docBranchId" => branch.id
                 },
                 "scope" => %{"kind" => "PLATFORM"},
                 "commandId" => command_id
               },
               context: %{cur_user: reviewer}
             )

    check = Repo.get!(Check, check_id)

    assert check.target_key == "doc:#{article.id}:#{branch.id}"
    assert check.scope_key == "platform"
    assert check.content_token == lifecycle.review_content_token
    assert check.trigger == :manual
    assert check.state == :completed
    assert check.result == :pass
  end

  defp config_for(community_id) do
    {:ok, configs} = AlertBoard.configs_for_target(community_id, :article)
    Enum.find(configs, &(&1.scope_key == "community:#{community_id}"))
  end

  defp doc_config do
    {:ok, [config]} = AlertBoard.configs_for_target(nil, :doc)
    config
  end

  defp configure_doc_word_check(config, user) do
    {:ok, ruleset} =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: "platform",
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "blocked-term",
              "kind" => "word",
              "value" => "blocked-term",
              "category" => "policy",
              "action" => "restrict"
            }
          ]
        },
        created_by_id: user.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert()

    config
    |> ReviewConfig.changeset(%{version: config.version + 1, ruleset_id: ruleset.id})
    |> Repo.update!()
  end

  defp configure_word_check(config, author) do
    {:ok, ruleset} =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: config.scope_key,
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "forbidden-term",
              "kind" => "word",
              "value" => "forbidden-term",
              "category" => "policy",
              "action" => "restrict"
            }
          ]
        },
        created_by_id: author.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert()

    config
    |> ReviewConfig.changeset(%{version: config.version + 1, ruleset_id: ruleset.id})
    |> Repo.update!()
  end

  defp insert_platform_check(article, lifecycle, author) do
    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: "platform",
        version: 1,
        rules: %{"items" => []},
        created_by_id: author.id,
        operation_ref: Ecto.UUID.generate()
      })
      |> Repo.insert!()

    %Check{}
    |> Check.changeset(%{
      target_key: "article:#{article.id}",
      scope_key: "platform",
      content_token: lifecycle.review_content_token,
      ruleset_id: ruleset.id,
      config_version: 1,
      mode: :ai_first,
      generation: 1,
      trigger: :submit,
      state: :queued,
      human_epoch: lifecycle.review_epoch,
      payload: %{"text" => %{"body" => "pending"}},
      payload_expires_at: DateTime.add(DateTime.utc_now(:second), 60, :second),
      operation_ref: Ecto.UUID.generate()
    })
    |> Repo.insert!()
  end

  defp insert_community_check(article, lifecycle, config) do
    %Check{}
    |> Check.changeset(%{
      target_key: "article:#{article.id}",
      scope_key: config.scope_key,
      content_token: lifecycle.review_content_token,
      ruleset_id: config.ruleset_id,
      config_version: config.version,
      mode: :ai_first,
      generation: 2,
      trigger: :manual,
      state: :queued,
      human_epoch: lifecycle.review_epoch,
      payload: %{"text" => %{"body" => "pending"}},
      payload_expires_at: DateTime.add(DateTime.utc_now(:second), 60, :second),
      operation_ref: Ecto.UUID.generate()
    })
    |> Repo.insert!()
  end

  defp grant_review_action(user, community_slug) do
    %{
      user
      | cur_passport: %{
          "global" => %{},
          community_slug => %{"cms" => %{"review.decide" => true}}
        }
    }
  end

  defp grant_platform_review_action(user) do
    %{
      user
      | cur_passport: %{
          "global" => %{"review.platform.decide" => true}
        }
    }
  end
end
