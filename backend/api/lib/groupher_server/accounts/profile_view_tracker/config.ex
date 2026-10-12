defmodule GroupherServer.Accounts.ProfileViewTracker.Config do
  @moduledoc """
  Runtime limits for Profile view deduplication and cleanup.

      ProfileViewTracker runtime -> Config -> validated window and cleanup budgets
  """

  @doc "Returns the sliding dedupe window for one counted actor type."
  @spec dedupe_window_seconds(:human | :agent) :: pos_integer()
  def dedupe_window_seconds(actor_type) when actor_type in [:human, :agent] do
    key = String.to_atom("#{actor_type}_dedupe_window_seconds")
    positive_runtime(key, 600)
  end

  @doc "Returns the cleanup safety margin after the business window."
  @spec cleanup_safety_margin_seconds() :: pos_integer()
  def cleanup_safety_margin_seconds do
    positive_runtime(:cleanup_safety_margin_seconds, 86_400)
  end

  @doc "Returns the complete dedupe-state lifetime."
  @spec dedupe_state_ttl_seconds(:human | :agent) :: pos_integer()
  def dedupe_state_ttl_seconds(actor_type) do
    dedupe_window_seconds(actor_type) + cleanup_safety_margin_seconds()
  end

  @doc "Returns the maximum rows deleted per cleanup batch."
  @spec cleanup_batch_size() :: pos_integer()
  def cleanup_batch_size, do: positive_runtime(:cleanup_batch_size, 500)

  @doc "Returns the maximum rows deleted per cleanup run."
  @spec cleanup_row_budget() :: pos_integer()
  def cleanup_row_budget, do: positive_runtime(:cleanup_row_budget, 50_000)

  @doc "Returns the wall-clock budget for one cleanup run."
  @spec cleanup_time_budget_ms() :: pos_integer()
  def cleanup_time_budget_ms, do: positive_runtime(:cleanup_time_budget_ms, 25_000)

  defp positive_runtime(name, default) do
    value = Application.get_env(:groupher_server, __MODULE__, []) |> Keyword.get(name, default)

    if is_integer(value) and value > 0 do
      value
    else
      raise ArgumentError, "#{name} must be a positive integer, got: #{inspect(value)}"
    end
  end
end
