defmodule GroupherServer.ReviewBot.Maintenance.Workflow do
  @moduledoc false

  import Ecto.Query
  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.Decision
  alias CMS.Model.ArticleReviewRestriction
  alias ReviewBot.Model.{Attempt, Check}

  @batch_size 500
  @max_batches 100

  @doc "Deletes expired Attempts and drops unreferenced Checks in bounded batches."
  def cleanup_expired_records do
    now = DateTime.utc_now(:second)
    attempt_cutoff = DateTime.add(now, -30, :day)
    check_cutoff = DateTime.add(now, -90, :day)

    with {:ok, attempts} <- drain(&delete_attempts(&1, attempt_cutoff)),
         {:ok, checks} <- drain(&prune_checks(&1, check_cutoff)) do
      {:ok, %{attempts_deleted: attempts, checks_pruned: checks}}
    end
  end

  defp drain(batch_fun) do
    Enum.reduce_while(1..@max_batches, {:ok, 0}, fn _, {:ok, total} ->
      case Repo.transaction(fn -> batch_fun.(@batch_size) end) do
        {:ok, count} when count < @batch_size -> {:halt, {:ok, total + count}}
        {:ok, count} -> {:cont, {:ok, total + count}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
  end

  defp delete_attempts(limit, cutoff) do
    ids =
      from(attempt in Attempt,
        where: attempt.started_at < ^cutoff,
        order_by: [asc: attempt.started_at, asc: attempt.id],
        limit: ^limit,
        select: attempt.id,
        lock: "FOR UPDATE SKIP LOCKED"
      )
      |> Repo.all()

    {deleted, _} = Repo.delete_all(from(attempt in Attempt, where: attempt.id in ^ids))
    deleted
  end

  defp prune_checks(limit, cutoff) do
    decisions =
      from(decision in Decision,
        where: not is_nil(decision.check_id),
        select: decision.check_id
      )

    restrictions =
      from(restriction in ArticleReviewRestriction,
        where: not is_nil(restriction.check_id),
        select: restriction.check_id
      )

    attempts = from(attempt in Attempt, select: attempt.check_id)

    ids =
      from(check in Check,
        where:
          check.inserted_at < ^cutoff and
            (not is_nil(check.payload) or not is_nil(check.payload_expires_at) or
               check.signals != ^%{"items" => []} or check.coverage != ^%{} or
               check.id in subquery(decisions) or check.id in subquery(restrictions) or
               check.id not in subquery(attempts)),
        order_by: [asc: check.inserted_at, asc: check.id],
        limit: ^limit,
        select: check.id,
        lock: "FOR UPDATE SKIP LOCKED"
      )
      |> Repo.all()

    if ids == [] do
      0
    else
      Repo.update_all(from(check in Check, where: check.id in ^ids),
        set: [payload: nil, payload_expires_at: nil, signals: %{"items" => []}, coverage: %{}]
      )

      {deleted, _} =
        Repo.delete_all(
          from(check in Check,
            where:
              check.id in ^ids and check.id not in subquery(decisions) and
                check.id not in subquery(restrictions) and check.id not in subquery(attempts)
          )
        )

      deleted
    end
  end
end
