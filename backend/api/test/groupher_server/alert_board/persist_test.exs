defmodule GroupherServer.Test.AlertBoard.PersistTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertBoard, Repo}
  alias AlertBoard.Model.Case

  test "human-first submission opens one case without requiring a Check" do
    {_community, article_view, _attrs, _author} = mock_article(:post)

    operation_target = %{
      target_key: "article:#{article_view.id}",
      case_attrs: %{article_id: article_view.id}
    }

    open_case = fn ->
      Repo.transact_result(fn ->
        AlertBoard.open_submission_case(operation_target, "platform", "revision:human-first")
      end)
    end

    assert {:ok, %Case{} = case_record} = open_case.()
    assert case_record.status == :open
    assert case_record.content_token == "revision:human-first"
    assert {:ok, %Case{id: repeated_id}} = open_case.()
    assert repeated_id == case_record.id
    assert Repo.aggregate(Case, :count) == 1
  end
end
