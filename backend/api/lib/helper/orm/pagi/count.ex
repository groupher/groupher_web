defmodule Helper.ORM.Pagi.Count do
  @moduledoc """
  Offset count adapter owned by Pagi.

  The adapter deliberately receives a count base separately from the entries
  query. Resource queries can provide a distinct identity/count query later;
  the default removes list-only clauses and counts the filtered base.

      Pagi offset execution -> Count adapter -> Repo aggregate
  """

  import Ecto.Query

  alias GroupherServer.Repo

  @doc """
  Counts an offset base without inheriting list order or pagination clauses.

  A resource may pass `count_query_mode: :scalar` when its entry identity is a
  distinct binding or grouped projection and the count query already selects
  one scalar. The adapter still owns execution and normalizes query failures.

  ## Examples

      query = from(item in "items", select: item)
      Count.run(query)

  """
  @spec run(Ecto.Queryable.t(), keyword()) :: {:ok, non_neg_integer()} | {:error, :count_failed}
  def run(queryable, opts \\ []) do
    count_query = Keyword.get(opts, :count_query, queryable)

    if Keyword.get(opts, :count_query_mode) == :scalar do
      scalar(count_query)
    else
      count_query
      |> Ecto.Queryable.to_query()
      |> exclude(:order_by)
      |> exclude(:limit)
      |> exclude(:offset)
      |> exclude(:preload)
      |> exclude(:select)
      |> aggregate(opts)
    end
  rescue
    _error in [Ecto.QueryError, Postgrex.Error] ->
      {:error, :count_failed}
  end

  @doc "Runs a count and returns its monotonic duration for Pagi telemetry."
  @spec run_with_metrics(Ecto.Queryable.t(), keyword()) ::
          {{:ok, non_neg_integer()} | {:error, :count_failed}, non_neg_integer()}
  def run_with_metrics(queryable, opts \\ []) do
    started_at = System.monotonic_time()
    result = run(queryable, opts)
    {result, System.monotonic_time() - started_at}
  end

  defp scalar(queryable) when is_function(queryable, 0) do
    queryable.()
    |> Ecto.Queryable.to_query()
    |> Repo.one()
    |> normalize_scalar()
  end

  defp scalar(_queryable), do: {:error, :count_failed}

  defp normalize_scalar(value) when is_integer(value) and value >= 0, do: {:ok, value}
  defp normalize_scalar(_value), do: {:error, :count_failed}

  defp aggregate(query, opts) do
    case Keyword.get(opts, :count_field) do
      nil ->
        {:ok, Repo.aggregate(query, :count)}

      field when is_atom(field) and not is_nil(field) ->
        {:ok, Repo.aggregate(query, :count, field)}

      _field ->
        {:error, :count_failed}
    end
  end
end
