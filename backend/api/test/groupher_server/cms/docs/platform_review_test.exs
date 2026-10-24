defmodule GroupherServer.Test.CMS.Docs.PlatformReviewTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{CMS, Repo, ReviewBot}
  alias CMS.Articles.Draft.Store
  alias CMS.Model.{DocBranch, DocBranchVersion, DocPublic, ReviewRequest}

  test "Doc publish queues a platform request for its branch version" do
    {:ok, user} = db_insert(:user)
    {:ok, community} = db_insert(:community)
    {:ok, author} = CMS.Articles.Persist.ensure_author_exists(user)

    assert {:ok, %{system: config, community: nil}} = ReviewBot.configs(nil, :doc)
    assert config.review_mode == :immediate

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
          body_bag: mock_body_bag(mock_rich_text("Doc body"))
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

    public = Repo.get_by!(DocPublic, article_id: article.id, branch_id: branch.id)
    version = Repo.get!(DocBranchVersion, public.branch_version_id)

    request =
      Repo.one!(
        from(request in ReviewRequest,
          where:
            request.target_type == :doc and request.article_id == ^article.id and
              request.branch_id == ^branch.id and is_nil(request.community_id) and
              request.branch_version_id == ^version.id
        )
      )

    assert request.state == :queued
    assert request.policy_snapshot["scope"] == "system"
    assert request.policy_snapshot["review_mode"] == "immediate"
    assert String.contains?(request.payload["text"]["body"], "Doc body")
    assert public.visible
    assert result.public.visible
  end
end
