defmodule GroupherServer.AlertBoard.Maintenance do
  @moduledoc """
  Owns bounded AlertBoard report-detail and decision-note retention.

      Oban worker -> AlertBoard.Maintenance -> Maintenance.Workflow
  """

  alias __MODULE__.Workflow

  @doc "Redacts details from reports older than the configured retention window."
  @spec redact_expired_report_details() :: {:ok, map()} | {:error, term()}
  defdelegate redact_expired_report_details(), to: Workflow

  @doc "Redacts notes from human decisions older than the configured retention window."
  @spec redact_expired_decision_notes() :: {:ok, map()} | {:error, term()}
  defdelegate redact_expired_decision_notes(), to: Workflow
end
