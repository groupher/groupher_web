defmodule GroupherServer.Test.Query.Accounts.Search do
  @moduledoc false

  use GroupherServer.TestMate

  setup do
    guest_conn = simu_conn(:guest)

    {:ok, _community} = db_insert(:user, %{nickname: "react"})
    {:ok, _community} = db_insert(:user, %{nickname: "php"})
    {:ok, _community} = db_insert(:user, %{nickname: "每日妹子"})
    {:ok, _community} = db_insert(:user, %{nickname: "javascript"})
    {:ok, _community} = db_insert(:user, %{nickname: "java"})

    {:ok, ~m(guest_conn)a}
  end

  describe "[cms search post query]" do
    @query S.Account.q(:search_users)
    test "search user by full nickname returns bounded User suggestions", ~m(guest_conn)a do
      variables = %{name: "react"}
      results = guest_conn |> gq_query(@query, variables)

      assert length(results) == 1
      assert results |> Enum.any?(&(&1["nickname"] == "react"))

      variables = %{name: "java"}
      results = guest_conn |> gq_query(@query, variables)

      assert length(results) == 2
      assert results |> Enum.any?(&(&1["nickname"] == "java"))
      assert results |> Enum.any?(&(&1["nickname"] == "javascript"))
    end

    test "search non-exist user returns an empty list", ~m(guest_conn)a do
      variables = %{name: "non-exist"}
      results = guest_conn |> gq_query(@query, variables)

      assert length(results) == 0
      assert results == []
    end

    test "search user by login should work", ~m(guest_conn)a do
      {:ok, _user} = db_insert(:user, %{login: "admin_login_1", nickname: "dashboard user"})

      variables = %{name: "admin_login"}
      results = guest_conn |> gq_query(@query, variables)

      assert length(results) == 1
      assert results |> Enum.any?(&(&1["nickname"] == "dashboard user"))
    end
  end
end
