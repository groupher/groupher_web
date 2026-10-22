defmodule GroupherServer.Test.CMS.Comments.ReviewSubmissionTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo}
  alias AlertBoard.Model.{Case, ReviewConfig}
  alias CMS.Comments.Commands.Create
  alias CMS.Model.{Comment, CommentLifecycle, CommentReviewRestriction}

  test "human-first Comment creation commits its Case, wait restriction, and current token atomically" do
    {community, article_view, _attrs, user} = mock_article(:post)

    {:ok, configs} = AlertBoard.configs_for_target(community.id, :comment)
    community_config = Enum.find(configs, &(&1.scope_key == "community:#{community.id}"))

    community_config
    |> ReviewConfig.changeset(%{
      publish_mode: :human_first,
      version: community_config.version + 1
    })
    |> Repo.update!()

    assert {:ok, result} =
             Create.create(
               :post,
               %{article_id: article_view.article_id, community: community},
               mock_comment("pending review comment"),
               user,
               Ecto.UUID.generate()
             )

    comment = Repo.preload(result.comment, :body)
    lifecycle = Repo.get_by!(CommentLifecycle, comment_id: comment.id)

    restriction =
      Repo.get_by!(CommentReviewRestriction,
        lifecycle_id: lifecycle.id,
        scope_key: "community:#{community.id}",
        kind: :awaiting_human
      )

    case_record =
      Repo.get_by!(Case,
        target_key: "comment:#{comment.id}",
        scope_key: "community:#{community.id}",
        status: :open
      )

    assert lifecycle.review_epoch == 1
    assert lifecycle.review_content_token =~ ~r/^sha256:[0-9a-f]{64}$/
    assert restriction.content_token == lifecycle.review_content_token
    assert restriction.case_id == case_record.id
    assert case_record.content_token == lifecycle.review_content_token

    scope = CMS.gate_context_scope_comment_for_thread(:post)
    query = CMS.gate_scope(Comment, nil, :read, scope)
    comment_id = comment.id
    refute Repo.exists?(from(row in query, where: row.id == ^comment_id))

    assert {:ok, updated} =
             CMS.Comments.update_comment(
               comment,
               mock_comment("edited comment is checked by the edit policy"),
               comment.body.version,
               user,
               Ecto.UUID.generate()
             )

    updated_lifecycle = Repo.get!(CommentLifecycle, lifecycle.id)
    superseded_case = Repo.get!(Case, case_record.id)
    assert updated_lifecycle.review_epoch == 2
    refute updated_lifecycle.review_content_token == lifecycle.review_content_token
    assert superseded_case.status == :superseded
    assert superseded_case.resolution == "content_superseded"
    assert Repo.preload(updated.comment, :body).body.version == 2
    assert Repo.exists?(from(row in query, where: row.id == ^comment_id))
  end
end
