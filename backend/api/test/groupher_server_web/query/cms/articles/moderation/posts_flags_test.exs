defmodule GroupherServer.Test.Query.Flags.PostsFlags do
  @moduledoc false

  use GroupherServer.TestMate
  alias GroupherServer.CMS

  @total_count 35
  @page_size Helper.ORM.Pagi.Config.default().default_size

  setup do
    {:ok, user} = db_insert(:user)
    {:ok, community} = mock_community(user)

    posts =
      Enum.reduce(1..@total_count, [], fn _, acc ->
        {:ok, value} = CMS.Articles.create(community, :post, mock_attrs(:post), user)
        acc ++ [value]
      end)

    post_b = posts |> List.first()
    post_m = posts |> Enum.at(div(@total_count, 2))
    post_e = posts |> List.last()

    guest_conn = simu_conn(:guest)

    {:ok, ~m(guest_conn community user post_b post_m post_e)a}
  end

  describe "[pending posts flags]" do
    test "pending post should not see in paged query",
         ~m(guest_conn community post_m)a do
      variables = %{filter: %{community: community.slug}}
      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)

      assert results["pageInfo"]["totalCount"] == @total_count

      {:ok, _} =
        CMS.Articles.set_illegal(
          post_m.article_id,
          %{
            is_legal: false,
            illegal_reason: ["some-reason"],
            illegal_words: ["some-word"]
          },
          :operations,
          community: community
        )

      post_m = Repo.get!(CMS.Model.Article, post_m.article_id)

      assert post_m.moderation_state == :illegal

      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)
      assert results["pageInfo"]["totalCount"] == @total_count - 1
    end
  end

  describe "[pinned posts flags]" do
    test "if have pinned posts, pinned posts have a separate first-page stream",
         ~m(guest_conn community post_m user)a do
      variables = %{filter: %{community: community.slug}}

      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)

      assert results |> is_valid_pagination?
      assert results["pageInfo"]["size"] == @page_size
      assert results["pageInfo"]["totalCount"] == @total_count

      {:ok, _} = CMS.Articles.pin(community, post_m.article_id, user, Ecto.UUID.generate())

      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)
      entries_first = results["pinnedEntries"] |> List.first()

      assert results["pageInfo"]["totalCount"] == @total_count - 1
      assert entries_first["innerId"] == to_string(article_inner_id(post_m, community))
      assert entries_first["isPinned"] == true
      refute Enum.any?(results["entries"], &(&1["isPinned"] == true))
    end

    test "pinned posts should not appear when page > 1", ~m(guest_conn community user)a do
      variables = %{pagi: %{offset: %{page: 2, size: 20}}, filter: %{}}
      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)
      assert results |> is_valid_pagination?

      random_id = results["entries"] |> Enum.shuffle() |> List.first() |> Map.get("innerId")
      {:ok, post} = read_article(community, :post, random_id)
      {:ok, _} = CMS.Articles.pin(community, post.article_id, user, Ecto.UUID.generate())
      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)

      assert results["pinnedEntries"] == []
      refute Enum.any?(results["entries"], &(&1["isPinned"] == true))
    end

    test "trashed posts do not appear in results, including pinned injection",
         ~m(guest_conn community user)a do
      variables = %{filter: %{community: community.slug}}
      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)

      random_id = results["entries"] |> Enum.shuffle() |> List.first() |> Map.get("innerId")
      {:ok, random_post} = read_article(community, :post, random_id)
      {:ok, _} = CMS.Articles.pin(community, random_post.article_id, user, Ecto.UUID.generate())
      {:ok, _} = CMS.Articles.trash(random_post, user)

      results = guest_conn |> gq_query(S.Article.q(:paged_articles, :post), variables)

      refute results["entries"] |> Enum.any?(&(&1["innerId"] == random_id))
      assert results["pageInfo"]["totalCount"] == @total_count - 1
    end
  end
end
