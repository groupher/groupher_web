defmodule GroupherServer.CMS.Comments.PaginationTest do
  @moduledoc false

  use GroupherServer.TestMate, async: false

  alias GroupherServer.{CMS, ErrorCat}

  test "returns an offset CommentPage and rejects an explicit branch without revision" do
    {community, article, _attrs, user} = mock_article(:post)

    {:ok, comment} =
      CMS.Comments.create_comment(
        community,
        :post,
        article_inner_id(article, community),
        mock_comment("comment page"),
        user,
        Ecto.UUID.generate()
      )

    assert {:ok,
            %{
              entries: [entry],
              pinned_entries: [],
              page_info: %{api: :offset, page: 1, total_count: 1}
            }} =
             CMS.Comments.page(
               :post,
               article.id,
               community.slug,
               %{sort: :asc_inserted},
               {:offset, %{page: 1, size: 20, config_revision: 0}},
               :replies,
               user
             )

    assert entry.id == comment.id
    assert Ecto.assoc_loaded?(entry.body)
    assert Ecto.assoc_loaded?(entry.author)

    assert {:error, %ErrorCat.Error{reason: :invalid_config_context}} =
             CMS.Comments.page(
               :post,
               article.id,
               community.slug,
               %{},
               {:offset, %{}},
               :replies,
               user
             )
  end

  test "continues a cursor CommentPage after a Dashboard config revision" do
    {community, article, _attrs, user} = mock_article(:post)

    for body <- ["first", "second"] do
      assert {:ok, _comment} =
               CMS.Comments.create_comment(
                 community,
                 :post,
                 article_inner_id(article, community),
                 mock_comment(body),
                 user,
                 Ecto.UUID.generate()
               )
    end

    assert {:ok, dashboard} =
             CMS.Dashboard.update(
               community,
               :pagination,
               %{
                 surface: :comments,
                 expected_revision: 0,
                 config: %{
                   schema_version: 1,
                   api: :cursor,
                   mode: :load_more,
                   default_size: 1,
                   max_size: 20
                 }
               },
               user,
               Ecto.UUID.generate()
             )

    assert dashboard.pagination.comments.revision == 1

    assert {:ok,
            %{
              entries: [first],
              page_info: %{api: :cursor, end_cursor: cursor, has_next_page: true}
            }} =
             CMS.Comments.page(
               :post,
               article.id,
               community.slug,
               %{sort: :asc_inserted},
               {:cursor, %{first: 1, config_revision: 1}},
               :replies,
               user
             )

    assert is_binary(cursor)

    assert {:ok,
            %{
              entries: [second],
              pinned_entries: [],
              page_info: %{api: :cursor, has_next_page: false}
            }} =
             CMS.Comments.page(
               :post,
               article.id,
               community.slug,
               %{sort: :asc_inserted},
               {:cursor, %{first: 1, after: cursor, config_revision: 1}},
               :replies,
               user
             )

    refute first.id == second.id
  end
end
