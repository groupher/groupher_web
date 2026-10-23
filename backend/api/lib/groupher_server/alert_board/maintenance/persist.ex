defmodule GroupherServer.AlertBoard.Maintenance.Persist do
  @moduledoc """
  Clears report details in bounded, skip-locked batches.

      Workflow transaction -> locked expired IDs -> Report details cleared
  """

  import Ecto.Query

  alias GroupherServer.Repo
  alias GroupherServer.AlertBoard.Model.Report

  @doc "Clears details from one bounded set of expired reports inside the caller's transaction."
  @spec clear_report_details_batch(DateTime.t(), pos_integer()) :: non_neg_integer()
  def clear_report_details_batch(cutoff, limit) when is_integer(limit) and limit > 0 do
    ids =
      Report
      |> where([report], not is_nil(report.details) and report.inserted_at < ^cutoff)
      |> order_by([report], asc: report.inserted_at, asc: report.id)
      |> limit(^limit)
      |> select([report], report.id)
      |> lock("FOR UPDATE SKIP LOCKED")
      |> Repo.all()

    {cleared, _} =
      Repo.update_all(
        from(report in Report,
          where: report.id in ^ids and not is_nil(report.details) and report.inserted_at < ^cutoff
        ),
        set: [details: nil]
      )

    cleared
  end
end
