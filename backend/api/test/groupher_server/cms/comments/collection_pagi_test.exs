defmodule GroupherServer.Test.CMS.Comments.CollectionPagi do
  use GroupherServer.TestMate

  alias Helper.ORM.Pagi.{Page, Params}

  test "published and participant cursors agree with offset and bind their collection" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])
    authors = [actor | for(_ <- 1..3, do: elem(db_insert(:user), 1))]

    for author <- authors do
      {:ok, _} =
        CMS.Comments.create_comment(
          community,
          :post,
          article_inner_id(post, community),
          mock_comment(),
          author,
          Ecto.UUID.generate()
        )
    end

    assert {:ok, %Page.Offset{entries: expected, total_count: 4}} =
             CMS.Comments.paged_comments_participants(:post, post.id, %Params.Offset{
               page: 1,
               size: 100
             })

    assert {:ok, %Page.Cursor{entries: first, end_cursor: cursor}} =
             CMS.Comments.paged_comments_participants(:post, post.id, %Params.Cursor{first: 2})

    assert {:ok, %Page.Cursor{entries: rest, has_next_page: false}} =
             CMS.Comments.paged_comments_participants(:post, post.id, %Params.Cursor{
               first: 100,
               after: cursor
             })

    assert Enum.map(first ++ rest, & &1.id) == Enum.map(expected, & &1.id)

    assert {:error, _} =
             CMS.Comments.paged_published_comments(
               actor,
               nil,
               %{},
               %Params.Cursor{first: 2, after: cursor},
               nil
             )

    assert {:ok, %Page.Cursor{entries: [%{author_id: author_id}], has_next_page: false}} =
             CMS.Comments.paged_published_comments(actor, nil, %{}, %Params.Cursor{first: 2}, nil)

    assert author_id == actor.id
  end
end
