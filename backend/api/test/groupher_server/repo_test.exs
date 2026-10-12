defmodule GroupherServer.RepoTest do
  use GroupherServer.TestMate

  alias GroupherServer.Repo

  describe "transact_result/1" do
    test "unwraps a successful tagged result" do
      assert {:ok, :saved} = Repo.transact_result(fn -> {:ok, :saved} end)
    end

    test "rolls back an error tagged result" do
      assert {:error, :invalid} =
               Repo.transact_result(fn ->
                 {:ok, user} = db_insert(:user)
                 Process.put(:rolled_back_user_id, user.id)
                 {:error, :invalid}
               end)

      refute Repo.get(User, Process.get(:rolled_back_user_id))
    end

    test "rejects an untagged callback result" do
      assert {:error, {:invalid_transaction_result, :saved}} =
               Repo.transact_result(fn -> :saved end)
    end
  end
end
