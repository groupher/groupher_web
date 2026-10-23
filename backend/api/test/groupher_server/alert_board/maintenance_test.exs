defmodule GroupherServer.Test.AlertBoard.MaintenanceTest do
  @moduledoc false

  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, Repo}
  alias AlertBoard.Model.{Case, Decision, Report}

  setup do
    previous = Application.get_env(:groupher_server, AlertBoard.Config, [])

    Application.put_env(
      :groupher_server,
      AlertBoard.Config,
      Keyword.merge(previous,
        report_details_retention_days: 90,
        decision_notes_retention_days: 365,
        retention_batch_size: 1,
        retention_max_batches: 1,
        retention_snooze_seconds: 1
      )
    )

    on_exit(fn -> Application.put_env(:groupher_server, AlertBoard.Config, previous) end)
    :ok
  end

  test "redacts expired report details in bounded batches and retains the report facts" do
    {:ok, reporter} = db_insert(:user)
    {:ok, expired_target} = db_insert(:user)
    {:ok, current_target} = db_insert(:user)

    {:ok, expired_report} =
      AlertBoard.submit_report(
        %{resource: expired_target},
        "SPAM",
        "Expired detail",
        reporter,
        Ecto.UUID.generate()
      )

    {:ok, current_report} =
      AlertBoard.submit_report(
        %{resource: current_target},
        "OTHER",
        "Recent detail",
        reporter,
        Ecto.UUID.generate()
      )

    old_inserted_at = DateTime.add(DateTime.utc_now(:second), -91, :day)

    Repo.update_all(
      from(report in Report, where: report.id == ^expired_report.id),
      set: [inserted_at: old_inserted_at]
    )

    assert {:ok, %{reports_redacted: 1, more?: false}} =
             AlertBoard.redact_expired_report_details()

    assert is_nil(Repo.get!(Report, expired_report.id).details)
    assert Repo.get!(Report, current_report.id).details == "Recent detail"
    assert Repo.get!(Report, expired_report.id).reason_code == "SPAM"
    assert Repo.get!(Report, expired_report.id).reporter_id == reporter.id
  end

  test "reports when another expired batch remains" do
    {:ok, reporter} = db_insert(:user)

    expired_reports =
      Enum.map(1..2, fn index ->
        {:ok, target} = db_insert(:user)

        {:ok, report} =
          AlertBoard.submit_report(
            %{resource: target},
            "SPAM",
            "Expired detail #{index}",
            reporter,
            Ecto.UUID.generate()
          )

        Repo.update_all(
          from(row in Report, where: row.id == ^report.id),
          set: [inserted_at: DateTime.add(DateTime.utc_now(:second), -91, :day)]
        )

        report
      end)

    assert {:ok, %{reports_redacted: 1, more?: true}} =
             AlertBoard.redact_expired_report_details()

    assert Enum.count(expired_reports, &is_nil(Repo.get!(Report, &1.id).details)) == 1
  end

  test "redacts expired human decision notes while retaining the decision facts" do
    {:ok, reporter} = db_insert(:user)
    {:ok, target} = db_insert(:user)

    {:ok, report} =
      AlertBoard.submit_report(
        %{resource: target},
        "SPAM",
        "Details",
        reporter,
        Ecto.UUID.generate()
      )

    case_record = Repo.get!(Case, report.case_id)

    {:ok, decision} =
      %Decision{}
      |> Decision.changeset(%{
        case_id: case_record.id,
        target_key: case_record.target_key,
        scope_key: case_record.scope_key,
        content_token: case_record.content_token,
        action: :dismiss,
        source: :human,
        actor_id: reporter.id,
        restriction_ids: [],
        reason_code: "reviewed",
        note: "Sensitive moderator note",
        operation_ref: Ecto.UUID.generate(),
        expected_case_version: case_record.version
      })
      |> Repo.insert()

    Repo.update_all(
      from(row in Decision, where: row.id == ^decision.id),
      set: [inserted_at: DateTime.add(DateTime.utc_now(:second), -366, :day)]
    )

    assert {:ok, %{decision_notes_redacted: 1, more?: false}} =
             AlertBoard.redact_expired_decision_notes()

    redacted = Repo.get!(Decision, decision.id)
    assert is_nil(redacted.note)
    assert redacted.action == :dismiss
    assert redacted.actor_id == reporter.id
    assert redacted.reason_code == "reviewed"
  end
end
