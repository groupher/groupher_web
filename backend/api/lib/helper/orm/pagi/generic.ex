defmodule Helper.ORM.Pagi.Generic do
  @moduledoc """
  Executes the shared offset contract for schemas not yet backed by Flop metadata.

  This is a narrow migration adapter for legacy Ecto schemas. It still keeps
  params, order ownership, count execution, and output shape inside Pagi; a
  resource can later add Flop.Schema metadata without changing its caller.

      domain query -> Pagi.Generic -> Page.Offset
  """

  import Ecto.Query

  alias GroupherServer.Repo
  alias Helper.ORM.Pagi.{Config, Count, Order, Page, Params}

  @doc """
  Executes one offset page for a schema without Flop metadata.

  ## Examples

      iex> Helper.ORM.Pagi.Generic.offset(query, %Params.Offset{page: 1, size: 20}, config, order, [])
      {:ok, %Page.Offset{}}

  This adapter is intentionally offset-only; cursor resources must use the
  shared Flop-backed execution path so their predicate and cursor contract stay
  in one place.
  """
  @spec offset(Ecto.Queryable.t(), Params.Offset.t(), Config.t(), Order.t(), keyword()) ::
          {:ok, Page.Offset.t()} | {:error, :count_failed | :query_failed}
  def offset(queryable, %Params.Offset{} = params, %Config{}, %Order{} = order, opts) do
    {result, _metrics} = offset_with_metrics(queryable, params, order, opts)
    result
  end

  @doc """
  Runs the offset page and returns the result together with query metrics.

  ## Examples

      Helper.ORM.Pagi.Generic.offset_with_metrics(query, params, order, [])
      #=> {{:ok, %Page.Offset{}}, %{query_count: 2}}
  """
  @spec offset_with_metrics(Ecto.Queryable.t(), Params.Offset.t(), Order.t(), keyword()) ::
          {{:ok, Page.Offset.t()} | {:error, :count_failed | :query_failed},
           %{query_count: pos_integer(), db_duration: integer(), count_duration: integer()}}
  def offset_with_metrics(queryable, %Params.Offset{} = params, %Order{} = order, opts) do
    {count_result, count_duration} = Count.run_with_metrics(queryable, opts)

    with {:ok, total_count} <- count_result do
      total_pages = ceil_div(total_count, params.size)
      page = params.page

      case run_entries(queryable, params, order) do
        {{:ok, entries}, entries_duration} ->
          result =
            {:ok,
             %Page.Offset{
               entries: entries,
               page: page,
               size: params.size,
               total_count: total_count,
               total_pages: total_pages,
               has_previous_page: page > 1,
               has_next_page: page * params.size < total_count
             }}

          {result,
           %{
             query_count: 2,
             db_duration: count_duration + entries_duration,
             count_duration: count_duration
           }}

        {{:error, :query_failed}, entries_duration} ->
          {{:error, :query_failed},
           %{
             query_count: 2,
             db_duration: count_duration + entries_duration,
             count_duration: count_duration
           }}
      end
    else
      {:error, :count_failed} ->
        {{:error, :count_failed},
         %{query_count: 1, db_duration: count_duration, count_duration: count_duration}}
    end
  end

  defp run_entries(queryable, params, order) do
    started_at = System.monotonic_time()

    result =
      try do
        entries =
          queryable
          |> exclude(:order_by)
          |> order_by(^order_terms(order))
          |> limit(^params.size)
          |> offset(^((params.page - 1) * params.size))
          |> Repo.all()

        {:ok, entries}
      rescue
        _error in [Ecto.QueryError, Postgrex.Error] -> {:error, :query_failed}
      end

    {result, System.monotonic_time() - started_at}
  end

  defp order_terms(%Order{fields: fields, directions: directions}) do
    Enum.zip(directions, fields)
  end

  defp ceil_div(0, _size), do: 0
  defp ceil_div(total_count, size), do: div(total_count + size - 1, size)
end
