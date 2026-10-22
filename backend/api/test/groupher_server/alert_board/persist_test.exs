defmodule GroupherServer.Test.AlertBoard.PersistTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertBoard, Repo}
  alias AlertBoard.Model.{Case, Report}

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

  test "a passing policy result leaves its Case open while an active report remains" do
    {_community, article_view, _attrs, author} = mock_article(:post)
    target_key = "article:#{article_view.id}"
    scope_key = "platform"
    content_token = "revision:reported-policy-case"

    target = %{target_key: target_key, case_attrs: %{article_id: article_view.id}}

    assert {:ok, case_record} =
             Repo.transact_result(fn ->
               AlertBoard.open_submission_case(target, scope_key, content_token)
             end)

    %Report{}
    |> Report.changeset(%{
      target_key: target_key,
      article_id: article_view.id,
      scope_key: scope_key,
      content_token: content_token,
      reporter_id: author.id,
      case_id: case_record.id,
      reason_code: "SPAM",
      operation_ref: Ecto.UUID.generate()
    })
    |> Repo.insert!()

    assert {:ok, :kept_open} =
             Repo.transact_result(fn ->
               AlertBoard.resolve_policy_case(case_record)
             end)

    assert Repo.get!(Case, case_record.id).status == :open
  end
end
