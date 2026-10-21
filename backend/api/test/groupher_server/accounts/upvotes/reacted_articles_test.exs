defmodule GroupherServer.Test.Accounts.ReactedContents do
  @moduledoc false

  use GroupherServer.TestMate

  alias GroupherServer.Accounts
  alias Accounts.Upvotes, as: Accounts

  setup do
    {community, post, _attrs, user} = mock_article(:post)

    {:ok, ~m(community user post)a}
  end

  describe "[user upvoted articles]" do
    test "user can get paged upvoted common articles", ~m(community user post)a do
      {:ok, _} = CMS.Interactions.upvote(post, user, Ecto.UUID.generate())

      filter = %{page: 1, size: 20}

      {:ok, articles} =
        Accounts.paged_articles(
          user,
          Map.drop(filter, [:page, :size]),
          %GroupherServer.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      article_post = articles |> Map.get(:entries) |> List.last()

      assert %Helper.ORM.Pagi.Page.Offset{} = articles
      assert post.id == article_post |> Map.get(:id)
      assert article_inner_id(post, community) == article_post |> Map.get(:inner_id)

      assert article_post.community.slug == community.slug
      refute Map.has_key?(article_post, :upvotes_count)
    end

    test "user can get paged upvoted posts by thread filter", ~m(user post)a do
      {:ok, _} = CMS.Interactions.upvote(post, user, Ecto.UUID.generate())

      filter = %{thread: :post, page: 1, size: 20}

      {:ok, articles} =
        Accounts.paged_articles(
          user,
          Map.drop(filter, [:page, :size]),
          %GroupherServer.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      assert %Helper.ORM.Pagi.Page.Offset{} = articles
      assert post.id == articles |> Map.get(:entries) |> List.last() |> Map.get(:id)
      assert 1 == articles |> Map.get(:total_count)
    end

    test "invalid thread filter returns explicit error", ~m(user post)a do
      {:ok, _} = CMS.Interactions.upvote(post, user, Ecto.UUID.generate())

      filter = %{thread: "INVALID", page: 1, size: 20}

      assert {:error, %ErrorCat.Error{reason: :custom, details: "invalid thread"}} =
               Accounts.paged_articles(
                 user,
                 Map.drop(filter, [:page, :size]),
                 %GroupherServer.Pagi.Params.Offset{page: filter.page, size: filter.size}
               )
    end
  end
end
