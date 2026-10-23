defmodule GroupherServer.Test.CMS.Comments.ReviewRestrictionsTest do
  @moduledoc false
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.CMS

  alias CMS.Model.{CommentLifecycle, CommentReviewRestriction}

  test "only the author can read a Comment under a platform review restriction" do
    {community, article, _article_attrs, author} = mock_article(:post)
    inner_id = article_inner_id(article, community)

    {:ok, comment} =
      CMS.Comments.create_comment(
        community,
        :post,
        inner_id,
        mock_comment("review-restricted comment"),
        author,
        Ecto.UUID.generate()
      )

    path = %{
      article: %{community: community.slug, thread: :post, inner_id: inner_id},
      inner_id: comment.inner_id
    }

    lifecycle = Repo.get_by!(CommentLifecycle, comment_id: comment.id)

    assert {:ok, restriction} =
             Repo.transaction(fn ->
               locked =
                 CommentLifecycle
                 |> where([row], row.id == ^lifecycle.id)
                 |> lock("FOR UPDATE")
                 |> Repo.one()

               case CMS.Comments.Lifecycle.apply_review_restriction(
                      locked,
                      restriction_attrs(lifecycle, "platform", "manual-review")
                    ) do
                 {:ok, restriction} -> restriction
                 {:error, reason} -> Repo.rollback(reason)
               end
             end)

    assert {:ok, loaded} = CMS.FrontDesk.comment(path, author)
    assert loaded.id == comment.id

    {:ok, platform_reader_user} = db_insert(:user)

    platform_reader = %{
      platform_reader_user
      | cur_passport: %{"global" => %{"review.platform.read" => true}}
    }

    assert {:ok, reviewer_loaded} = CMS.FrontDesk.comment(path, platform_reader)
    assert reviewer_loaded.id == comment.id

    {:ok, community_reader_user} = db_insert(:user)

    community_reader = %{
      community_reader_user
      | cur_passport: %{
          "global" => %{},
          community.slug => %{"cms" => %{"review.read" => true}}
        }
    }

    assert {:error, %ErrorCat.Error{reason: :not_exist}} =
             CMS.FrontDesk.comment(path, community_reader)

    assert {:error, %ErrorCat.Error{reason: :not_exist}} =
             CMS.FrontDesk.comment(path)

    assert {:ok, {:ok, :pass}} =
             Repo.transaction(fn ->
               locked =
                 CommentLifecycle
                 |> where([row], row.id == ^lifecycle.id)
                 |> lock("FOR UPDATE")
                 |> Repo.one()

               CMS.Comments.Lifecycle.end_review_restrictions(
                 locked,
                 "platform",
                 [restriction.id],
                 Ecto.UUID.generate(),
                 "review_approved"
               )
             end)

    assert {:ok, _loaded} = CMS.FrontDesk.comment(path)
    assert Repo.get!(CommentReviewRestriction, restriction.id).version == 2
  end

  defp restriction_attrs(lifecycle, scope_key, cause_key) do
    %{
      lifecycle_id: lifecycle.id,
      scope_key: scope_key,
      cause_key: cause_key,
      kind: :manual_hold,
      content_token: Ecto.UUID.generate(),
      source: :human,
      created_by_operation_ref: Ecto.UUID.generate()
    }
  end
end
