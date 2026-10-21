defmodule GroupherServer.Test.Accounts.Fans.Pagi do
  use GroupherServer.TestMate

  alias Helper.ORM.Pagi.{Page, Params}

  test "membership order does not change User cursor identity or page boundaries" do
    {:ok, owner} = db_insert(:user)
    {:ok, other} = db_insert(:user)
    users = for _ <- 1..4, do: elem(db_insert(:user), 1)

    for user <- Enum.reverse(users) do
      {:ok, _} = Accounts.Fans.follow(user, owner)
    end

    assert {:ok, %Page.Offset{entries: expected, total_count: 4}} =
             Accounts.Fans.paged_followers(owner, %{}, %Params.Offset{page: 1, size: 4})

    assert Enum.map(expected, & &1.id) == Enum.sort(Enum.map(users, & &1.id), :desc)

    assert {:ok, %Page.Cursor{entries: first, end_cursor: cursor, has_next_page: true}} =
             Accounts.Fans.paged_followers(owner, %{}, %Params.Cursor{first: 2})

    assert {:ok, %Page.Cursor{entries: last, has_next_page: false}} =
             Accounts.Fans.paged_followers(owner, %{}, %Params.Cursor{first: 2, after: cursor})

    assert Enum.map(first ++ last, & &1.id) == Enum.map(expected, & &1.id)

    assert {:error, _} =
             Accounts.Fans.paged_followers(other, %{}, %Params.Cursor{first: 2, after: cursor})

    assert {:error, _} =
             Accounts.Fans.paged_followings(owner, %{}, %Params.Cursor{first: 2, after: cursor})

    assert {:error, _} =
             Accounts.Fans.paged_followers(owner, %{sort: :asc_inserted}, %Params.Cursor{
               first: 2,
               after: cursor
             })

    assert {:error, _} = Accounts.Fans.paged_followers(owner, %{sort: :most_views}, nil)
  end
end
