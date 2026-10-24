defmodule GroupherServer.Test.AlertWall.PersistTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertWall, Repo}
  alias AlertWall.Model.UserReport

  test "add is idempotent and a fresh AI source replaces the opinion as one unit" do
    first_ref = Ecto.UUID.generate()
    second_ref = Ecto.UUID.generate()
    first_source = Ecto.UUID.generate()
    second_source = Ecto.UUID.generate()

    first_attrs =
      item_attrs(
        first_source,
        [%{"type" => "spam", "evidence" => "link", "explanation" => "promotion"}],
        "suspect"
      )

    assert {:ok, {:ok, first}} =
             Repo.transaction(fn -> AlertWall.add_in_transaction(first_attrs, first_ref) end)

    assert {:ok, {:ok, replay}} =
             Repo.transaction(fn -> AlertWall.add_in_transaction(first_attrs, first_ref) end)

    assert replay.id == first.id

    second_attrs = item_attrs(second_source, [], "clear")

    assert {:ok, {:ok, current}} =
             Repo.transaction(fn -> AlertWall.add_in_transaction(second_attrs, second_ref) end)

    assert current.id == first.id
    assert current.ai_source_ref == second_source
    assert current.sus_notes == []
    assert current.summary == "clear"
  end

  test "replaying an add with different intent is rejected" do
    operation_ref = Ecto.UUID.generate()
    attrs = item_attrs(nil, [], "report-only")

    assert {:ok, {:ok, _item}} =
             Repo.transaction(fn -> AlertWall.add_in_transaction(attrs, operation_ref) end)

    assert {:ok, {:error, %{reason: :operation_conflict}}} =
             Repo.transaction(fn ->
               AlertWall.add_in_transaction(%{attrs | summary: "different"}, operation_ref)
             end)
  end

  test "report creation is idempotent and withdrawal updates every linked item projection" do
    {:ok, reporter} = db_insert(:user)
    operation_ref = Ecto.UUID.generate()
    attrs = report_attrs(reporter.id)

    assert {:ok, {:ok, report}} =
             Repo.transaction(fn ->
               AlertWall.submit_report_in_transaction(attrs, operation_ref)
             end)

    assert {:ok, {:ok, replay}} =
             Repo.transaction(fn ->
               AlertWall.submit_report_in_transaction(attrs, operation_ref)
             end)

    assert replay.id == report.id
    assert AlertWall.active_report_count(report.item_id) == 1

    assert {:ok, {:ok, %{report: withdrawn, item_ids: [item_id]}}} =
             Repo.transaction(fn ->
               AlertWall.withdraw_report_in_transaction(report.id, reporter.id)
             end)

    assert withdrawn.withdrawn_at
    assert item_id == report.item_id
    assert AlertWall.active_report_count(item_id) == 0
  end

  test "old reports become outdated while reports on current content can be resolved" do
    {:ok, reporter} = db_insert(:user)
    first_attrs = Map.put(report_attrs(reporter.id), :subject_ref, "published-content-1")
    first_operation = Ecto.UUID.generate()

    assert {:ok, {:ok, old_report}} =
             Repo.transaction(fn ->
               AlertWall.submit_report_in_transaction(first_attrs, first_operation)
             end)

    assert {:ok, {:ok, _item}} =
             Repo.transaction(fn ->
               AlertWall.supersede_in_transaction(
                 old_report.item_id,
                 Ecto.UUID.generate(),
                 :cms
               )
             end)

    outdated = Repo.get!(UserReport, old_report.id)
    assert outdated.outdated_at
    assert is_nil(outdated.resolved_at)
    assert AlertWall.active_report_count(old_report.item_id) == 0

    current_attrs = Map.put(report_attrs(reporter.id), :subject_ref, "published-content-2")

    assert {:ok, {:ok, current_report}} =
             Repo.transaction(fn ->
               AlertWall.submit_report_in_transaction(current_attrs, Ecto.UUID.generate())
             end)

    assert {:ok, {:ok, _item}} =
             Repo.transaction(fn ->
               AlertWall.resolve_in_transaction(
                 current_report.item_id,
                 "reviewed",
                 Ecto.UUID.generate(),
                 nil
               )
             end)

    resolved = Repo.get!(UserReport, current_report.id)
    assert resolved.resolved_at
    assert resolved.resolution == "reviewed"
    assert is_nil(resolved.outdated_at)
  end

  defp item_attrs(ai_source_ref, sus_notes, summary) do
    %{
      owner: :cms,
      target_type: :article,
      target_id: "stable-article",
      community_id: nil,
      subject_ref: "published-subject",
      ai_source_ref: ai_source_ref,
      sus_notes: sus_notes,
      summary: summary
    }
  end

  defp report_attrs(reporter_id) do
    %{
      reporter_id: reporter_id,
      owner: :cms,
      target_type: :article,
      target_id: "report-target",
      community_id: nil,
      subject_ref: "published-subject",
      report_type: "SPAM",
      details: "Please review"
    }
  end
end
