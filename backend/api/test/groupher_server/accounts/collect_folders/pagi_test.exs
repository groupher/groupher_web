defmodule GroupherServer.Test.Accounts.CollectFolders.Pagi do
  use GroupherServer.TestMate

  alias Accounts.CollectFolders
  alias Helper.ORM.Pagi.{Page}
  alias GroupherServer.{Pagi}
  alias Pagi.Params

  test "folder entry cursors follow collection order and recheck privacy" do
    {:ok, user} = db_insert(:user)
    {:ok, stranger} = db_insert(:user)
    {:ok, folder} = CollectFolders.create(%{title: "cursor collection", private: true}, user)
    {:ok, other} = CollectFolders.create(%{title: "other"}, user)
    posts = for _ <- 1..4, do: elem(db_insert(:post), 1)
    for post <- Enum.reverse(posts), do: CollectFolders.add(post, folder.id, user)

    assert {:ok, %Page.Offset{entries: expected, total_count: 4}} =
             CollectFolders.paged_articles(
               folder.id,
               %{},
               %Params.Offset{page: 1, size: 100},
               user
             )

    assert {:ok, %Page.Cursor{entries: first, end_cursor: cursor}} =
             CollectFolders.paged_articles(folder.id, %{}, %Params.Cursor{first: 2}, user)

    assert {:ok, %Page.Cursor{entries: rest, has_next_page: false}} =
             CollectFolders.paged_articles(
               folder.id,
               %{},
               %Params.Cursor{first: 100, after: cursor},
               user
             )

    assert Enum.map(first ++ rest, &{&1.community.slug, &1.thread, &1.inner_id}) ==
             Enum.map(expected, &{&1.community.slug, &1.thread, &1.inner_id})

    assert {:error, _} =
             CollectFolders.paged_articles(
               folder.id,
               %{},
               %Params.Cursor{first: 2, after: cursor},
               stranger
             )

    assert {:error, _} =
             CollectFolders.paged_articles(
               other.id,
               %{},
               %Params.Cursor{first: 2, after: cursor},
               user
             )

    for post <- posts, do: CMS.Interactions.upvote(post, user, Ecto.UUID.generate())

    assert {:ok, %Page.Offset{entries: expected}} =
             Accounts.Upvotes.paged_articles(user, %{}, %Params.Offset{page: 1, size: 100})

    assert {:ok, %Page.Cursor{entries: first, end_cursor: cursor}} =
             Accounts.Upvotes.paged_articles(user, %{}, %Params.Cursor{first: 2})

    assert {:ok, %Page.Cursor{entries: rest, has_next_page: false}} =
             Accounts.Upvotes.paged_articles(user, %{}, %Params.Cursor{first: 100, after: cursor})

    assert Enum.map(first ++ rest, &{&1.community.slug, &1.thread, &1.inner_id}) ==
             Enum.map(expected, &{&1.community.slug, &1.thread, &1.inner_id})
  end
end
