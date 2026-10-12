defmodule GroupherServer.Accounts.ProfileViewTracker.DedupeCleanup do
  @moduledoc """
  Removes expired Profile-view dedupe state in bounded batches.

      cleanup cron -> bounded expired-row batches -> telemetry result
  """

  import Ecto.Query

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.ProfileViewTracker.{Config, Model.ProfileViewDedupeState}

  @telemetry_event [:groupher, :accounts, :profile_view_tracker, :dedupe_cleanup]

  @doc "Deletes expired state until drained or a row/time budget is exhausted."
  @spec cleanup_expired() :: map()
  def cleanup_expired do
    started_at = System.monotonic_time(:millisecond)
    result = drain(0, 0, started_at)

    :telemetry.execute(
      @telemetry_event,
      %{
        deleted_rows: result.deleted_rows,
        batch_count: result.batch_count,
        duration_ms: result.duration_ms,
        remaining_expired_rows: result.remaining_expired_rows
      },
      %{budget_exhausted: result.budget_exhausted}
    )

    result
  end

  defp drain(deleted_rows, batch_count, started_at) do
    remaining_budget = Config.cleanup_row_budget() - deleted_rows

    if remaining_budget <= 0 or elapsed_ms(started_at) >= Config.cleanup_time_budget_ms() do
      finish(deleted_rows, batch_count, started_at)
    else
      deleted = delete_batch(min(Config.cleanup_batch_size(), remaining_budget))
      total = deleted_rows + deleted
      batches = if deleted > 0, do: batch_count + 1, else: batch_count

      if deleted == 0 do
        finish(total, batches, started_at)
      else
        drain(total, batches, started_at)
      end
    end
  end

  defp finish(deleted_rows, batch_count, started_at) do
    remaining = remaining_expired_rows()

    %{
      deleted_rows: deleted_rows,
      batch_count: batch_count,
      duration_ms: elapsed_ms(started_at),
      budget_exhausted: remaining > 0,
      remaining_expired_rows: remaining
    }
  end

  defp delete_batch(limit) do
    keys =
      from(state in ProfileViewDedupeState,
        where: state.expires_at <= fragment("clock_timestamp()"),
        order_by: [asc: state.expires_at, asc: state.profile_id],
        limit: ^limit,
        select: {state.profile_id, state.viewer_tracking_key}
      )
      |> Repo.all()

    predicate =
      Enum.reduce(keys, dynamic(false), fn {profile_id, tracking_key}, predicate ->
        dynamic(
          [state],
          ^predicate or
            (state.profile_id == ^profile_id and state.viewer_tracking_key == ^tracking_key)
        )
      end)

    {count, _} =
      Repo.delete_all(
        from(state in ProfileViewDedupeState,
          where: ^predicate,
          where: state.expires_at <= fragment("clock_timestamp()")
        )
      )

    count
  end

  defp remaining_expired_rows do
    Repo.aggregate(
      from(state in ProfileViewDedupeState,
        where: state.expires_at <= fragment("clock_timestamp()")
      ),
      :count
    )
  end

  defp elapsed_ms(started_at), do: System.monotonic_time(:millisecond) - started_at
end
