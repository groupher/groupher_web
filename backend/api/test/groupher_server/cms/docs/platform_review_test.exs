defmodule GroupherServer.Test.CMS.Docs.PlatformReviewTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{ReviewConfig, RuleSet}
  alias CMS.Articles.Draft.Store

  alias CMS.Model.{
    ArticleBinding,
    DocBranch,
    DocLifecycle,
    DocPublic,
    DocReviewRestriction
  }

  alias ReviewBot.Model.Check

  test "platform Doc word policy restricts only the published branch" do
    {:ok, user} = db_insert(:user)
    {:ok, community} = db_insert(:community)
    {:ok, author} = CMS.Articles.Persist.ensure_author_exists(user)

    config =
      case AlertBoard.configs_for_target(nil, :doc) do
        {:ok, [config]} -> config
      end

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: "platform",
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "blocked-word",
              "kind" => "word",
              "value" => "blocked phrase",
              "category" => "policy",
              "action" => "restrict"
            }
          ]
        },
        created_by_id: user.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    config
    |> ReviewConfig.changeset(%{
      ruleset_id: ruleset.id,
      version: config.version + 1
    })
    |> Repo.update!()

    branch =
      %DocBranch{}
      |> DocBranch.changeset(%{
        community_id: community.id,
        slug: "main",
        title: "Main",
        type: :main,
        status: :active,
        created_by_id: user.id
      })
      |> Repo.insert!()

    {:ok, %{article: article, draft: draft}} =
      Store.create(
        community,
        :doc,
        %{
          title: "Platform reviewed Doc",
          slug: "platform-reviewed-#{System.unique_integer([:positive])}",
          body_bag: mock_body_bag(mock_rich_text("Contains a blocked phrase."))
        },
        author,
        branch_id: branch.id
      )

    assert {:ok, result} =
             CMS.Articles.Publish.Doc.publish(article, branch.id, author,
               expected_draft_version: draft.version,
               expected_lifecycle_version: 1,
               command_id: Ecto.UUID.generate()
             )

    lifecycle = Repo.get_by!(DocLifecycle, article_id: article.id, branch_id: branch.id)

    assert %Check{state: :completed, result: :restrict} =
             Repo.get_by!(Check,
               target_key: "doc:#{article.id}:#{branch.id}",
               scope_key: "platform",
               content_token: lifecycle.review_content_token
             )

    assert %DocReviewRestriction{kind: :rule_hit} =
             Repo.get_by!(DocReviewRestriction,
               lifecycle_id: lifecycle.id,
               scope_key: "platform"
             )

    refute Repo.get_by!(DocPublic, article_id: article.id, branch_id: branch.id).visible

    refute Repo.get_by!(ArticleBinding, article_id: article.id, community_id: community.id).visible

    refute result.public.visible
  end
end
