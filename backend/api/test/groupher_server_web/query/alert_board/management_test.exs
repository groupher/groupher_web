defmodule GroupherServer.Test.Query.AlertBoard.ManagementTest do
  @moduledoc "Verifies GraphQL workboard scope and human decision boundaries."

  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Model.{Case, ReviewConfig}
  alias CMS.Model.Article
  alias GroupherServerWeb.Schema

  test "case list is filtered to the authorized scope and requires review.read" do
    {community, article, _author} = create_pending_article()
    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_actions(reviewer, community.slug, ["review.read"])

    case_id =
      Repo.get_by!(Case,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}"
      ).id

    assert {:ok, %{data: %{"reviewCases" => %{"entries" => [%{"id" => result_id}]}}}} =
             Absinthe.run(
               """
               query Cases($scope: ReviewScopeInput!, $pagi: PagiInput) {
                 reviewCases(scope: $scope, filter: {status: OPEN}, pagi: $pagi) {
                   entries { id targetKey scopeKey }
                 }
               }
               """,
               Schema,
               variables: %{
                 "scope" => %{"kind" => "COMMUNITY", "community" => community.slug},
                 "pagi" => %{"offset" => %{"page" => 1, "size" => 20}}
               },
               context: %{cur_user: reviewer}
             )

    assert result_id == to_string(case_id)

    assert {:ok, %{errors: errors}} =
             Absinthe.run(
               """
               query Cases($scope: ReviewScopeInput!, $pagi: PagiInput) {
                 reviewCases(scope: $scope, filter: {status: OPEN}, pagi: $pagi) {
                   entries { id }
                 }
               }
               """,
               Schema,
               variables: %{
                 "scope" => %{"kind" => "COMMUNITY", "community" => community.slug},
                 "pagi" => %{"offset" => %{"page" => 1, "size" => 20}}
               },
               context: %{cur_user: elem(db_insert(:user), 1)}
             )

    assert errors != []
  end

  test "GraphQL decision returns the committed Decision and replays one command id" do
    {community, article, _author} = create_pending_article()
    case_record = Repo.get_by!(Case, target_key: "article:#{article.id}")
    lifecycle = Repo.get_by!(GroupherServer.CMS.Model.ArticleLifecycle, article_id: article.id)

    restriction =
      Repo.one!(
        from(restriction in GroupherServer.CMS.Model.ArticleReviewRestriction,
          where:
            restriction.lifecycle_id == ^lifecycle.id and
              restriction.scope_key == ^case_record.scope_key and is_nil(restriction.ended_at)
        )
      )

    restriction_ids = [restriction.id]

    {:ok, reviewer} = db_insert(:user)
    reviewer = grant_review_actions(reviewer, community.slug, ["review.decide"])
    command_id = Ecto.UUID.generate()

    mutation =
      """
      mutation Decide($caseId: ID!, $input: ReviewDecisionInput!, $commandId: ID!) {
        decideReviewCase(caseId: $caseId, input: $input, commandId: $commandId) {
          commandId
          reviewDecision { id action }
        }
      }
      """

    variables = %{
      "caseId" => to_string(case_record.id),
      "input" => %{
        "action" => "APPROVE",
        "expectedCaseVersion" => case_record.version,
        "expectedContentToken" => case_record.content_token,
        "restrictionIds" => restriction_ids,
        "reasonCode" => "reviewed",
        "note" => nil
      },
      "commandId" => command_id
    }

    assert {:ok,
            %{
              data: %{
                "decideReviewCase" => %{
                  "commandId" => ^command_id,
                  "reviewDecision" => %{"id" => decision_id, "action" => "APPROVE"}
                }
              }
            }} =
             Absinthe.run(mutation, Schema, variables: variables, context: %{cur_user: reviewer})

    assert {:ok,
            %{
              data: %{
                "decideReviewCase" => %{
                  "commandId" => ^command_id,
                  "reviewDecision" => %{"id" => ^decision_id}
                }
              }
            }} =
             Absinthe.run(mutation, Schema, variables: variables, context: %{cur_user: reviewer})
  end

  test "GraphQL config update enforces scope capability and replays its command id" do
    {:ok, owner} = db_insert(:user)
    {:ok, community} = mock_community(owner)
    {:ok, configs} = AlertBoard.configs_for_target(community.id, :article)
    config = Enum.find(configs, &(&1.scope_key == "community:#{community.id}"))
    command_id = Ecto.UUID.generate()

    mutation =
      """
      mutation UpdateConfig($input: UpdateReviewConfigInput!, $commandId: ID!) {
        updateReviewConfig(input: $input, commandId: $commandId) {
          commandId
          reviewConfig { version publishMode }
        }
      }
      """

    variables = %{
      "input" => %{
        "scope" => %{"kind" => "COMMUNITY", "community" => community.slug},
        "subjectKind" => "ARTICLE",
        "expectedVersion" => config.version,
        "config" => %{
          "publishMode" => "IMMEDIATE",
          "editMode" => "IMMEDIATE",
          "backgroundCheck" => false,
          "rules" => Jason.encode!(%{"items" => []}),
          "prompt" => nil,
          "providerProfile" => nil,
          "requiredModalities" => ["text"]
        }
      },
      "commandId" => command_id
    }

    reviewer = grant_review_actions(owner, community.slug, ["review.configure"])

    for _attempt <- 1..2 do
      assert {:ok,
              %{
                data: %{
                  "updateReviewConfig" => %{
                    "commandId" => ^command_id,
                    "reviewConfig" => %{"version" => version, "publishMode" => "IMMEDIATE"}
                  }
                }
              }} =
               Absinthe.run(mutation, Schema,
                 variables: variables,
                 context: %{cur_user: reviewer}
               )

      assert version == config.version + 1
    end
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
