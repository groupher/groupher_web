defmodule GroupherServer.Test.CMS.Comments.QueryList do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{CMS, Jobs}
  alias CMS.Model.ArticleStats

  test "participant projection repair never changes a successful read result" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])

    assert {:ok, _comment} =
             CMS.Comments.create_comment(
               community,
               :post,
               article_inner_id(post, community),
               mock_comment(),
               actor,
               Ecto.UUID.generate()
             )

    stats = Repo.get_by!(ArticleStats, article_id: post.article_id, thread: :post)

    assert {:ok, _stats} =
             stats
             |> Ecto.Changeset.change(comments_participants_count: 99)
             |> Repo.update()

    assert {:ok, page} =
             CMS.Comments.paged_comments_participants(
               :post,
               post.id,
               %GroupherServer.Pagi.Params.Offset{page: 1, size: 20}
             )

    assert page.total_count == 1
    assert [%{id: actor_id}] = page.entries
    assert actor_id == actor.id

    assert Repo.get_by!(ArticleStats,
             article_id: post.article_id,
             thread: :post
           ).comments_participants_count == 99

    assert {:ok, :pass} =
             Jobs.Comments.perform(%Oban.Job{
               args: %{
                 "type" => "reconcile_comments_participants",
                 "version" => 1,
                 "payload" => %{
                   "thread" => "post",
                   "article_id" => post.id,
                   "total_count" => page.total_count
                 }
               }
             })

    assert Repo.get_by!(ArticleStats,
             article_id: post.article_id,
             thread: :post
           ).comments_participants_count == 1
  end
end
