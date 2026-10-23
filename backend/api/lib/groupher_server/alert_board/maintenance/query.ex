defmodule GroupherServer.AlertBoard.Maintenance.Query do
  @moduledoc """
  Reads whether expired report details remain after a bounded cleanup batch.

      retention cutoff -> Maintenance.Query -> expired report rows
  """

  import Ecto.Query

  alias GroupherServer.Repo
  alias GroupherServer.AlertBoard.Model.Report

  @doc "Checks for report details older than the supplied cutoff."
  @spec expired_report_details?(DateTime.t()) :: boolean()
  def expired_report_details?(cutoff) do
    Repo.exists?(
      from(report in Report,
        where: not is_nil(report.details) and report.inserted_at < ^cutoff
      )
    )
  end
end
