defmodule GroupherServer.Test.CMS.Articles.ReviewSubmissionTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Model.{Case, ReviewConfig}
  alias CMS.Model.{Article, ArticleLifecycle, ArticleReviewRestriction}

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
end
