defmodule GroupherServer.AlertBoard.Maintenance.Query do
  @moduledoc """
  Reads whether expired report details or decision notes remain after bounded cleanup.

      retention cutoff -> Maintenance.Query -> expired report rows
  """

  import Ecto.Query

  alias GroupherServer.{AlertBoard, Repo}
  alias AlertBoard.Model.{Decision, Report}

  @doc "Checks for report details older than the supplied cutoff."
  @spec expired_report_details?(DateTime.t()) :: boolean()
  def expired_report_details?(cutoff) do
    Repo.exists?(
      from(report in Report,
        where: not is_nil(report.details) and report.inserted_at < ^cutoff
      )
    )
  end

  @doc "Checks for human decision notes older than the supplied cutoff."
  @spec expired_decision_notes?(DateTime.t()) :: boolean()
  def expired_decision_notes?(cutoff) do
    Repo.exists?(
      from(decision in Decision,
        where:
          decision.source == :human and not is_nil(decision.note) and
            decision.inserted_at < ^cutoff
      )
    )
  end
end
