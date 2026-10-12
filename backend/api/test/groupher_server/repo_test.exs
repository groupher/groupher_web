defmodule GroupherServer.RepoTest do
  use GroupherServer.DataCase, async: true

  alias GroupherServer.Repo

  describe "transact_result/1" do
    test "unwraps a successful tagged result" do
      assert {:ok, :saved} = Repo.transact_result(fn -> {:ok, :saved} end)
    end

    test "rolls back an error tagged result" do
      assert {:error, :invalid} = Repo.transact_result(fn -> {:error, :invalid} end)
    end

    test "rejects an untagged callback result" do
      assert {:error, {:invalid_transaction_result, :saved}} =
               Repo.transact_result(fn -> :saved end)
    end
  end
end
