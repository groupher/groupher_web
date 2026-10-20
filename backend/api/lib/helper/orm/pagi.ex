defmodule Helper.ORM.Pagi do
  @moduledoc """
  Shared execution engine for the offset/cursor pagination contract.

  Domain params and order -> validated Flop adapter -> explicit Pagi Page.
  Flop remains private to this module; callers receive no Flop structs or
  metadata.
  """

  alias GroupherServer.Pagi.ErrorCat
  alias Helper.ORM.Pagi.{Config, Count, CursorCodec, Generic, Order, Page, Params}
  alias GroupherServer.Repo

  @default_max_offset_page 10_000
  @telemetry_event [:groupher, :pagi, :run]
  @empty_metrics %{query_count: 0, db_duration: 0, count_duration: 0}

  @doc """
  Executes a validated offset or forward-cursor page.

  ## Examples

      {:ok, order} = Helper.ORM.Pagi.Order.new(%{
        fields: [:inserted_at],
        directions: [:desc],
        cursor_fields: [:inserted_at]
      })

      Helper.ORM.Pagi.run(Ecto.Query.from(item in "items", select: item), nil,
        for: MyApp.Item,
        order: order
      )
      #=> {:ok, %Helper.ORM.Pagi.Page.Offset{}}
  """
  @spec run(Ecto.Queryable.t(), Params.t() | nil, keyword()) ::
          {:ok, Page.t()} | {:error, ErrorCat.error()}
  def run(queryable, params, opts) when is_list(opts) do
    started_at = System.monotonic_time()
    {result, context, metrics} = prepare_and_execute(queryable, params, opts)
    emit_telemetry(result, context, metrics, started_at)
    result
  end

  def run(_queryable, _params, _opts), do: {:error, ErrorCat.invalid_config()}

  @doc """
  Returns the platform default config used by trusted internal synthesis.

  ## Examples

      %Config{api: :offset, default_size: 20} = Helper.ORM.Pagi.default_config()
  """
  @spec default_config() :: Config.t()
  def default_config, do: Config.default()

  defp prepare_and_execute(queryable, params, opts) do
    case execution_config(opts) do
      {:ok, config, config_present} ->
        context = telemetry_context(params, config, config_present, nil, nil, opts)

        prepared =
          with {:ok, order} <- execution_order(opts),
               {:ok, :pass} <- reject_existing_order(queryable),
               {:ok, params} <- normalize_params(params, config, config_present),
               {:ok, schema} <- fetch_schema(opts) do
            {:ok, params, order, schema}
          end

        case prepared do
          {:ok, normalized_params, order, schema} ->
            {result, metrics} = execute(queryable, normalized_params, config, order, schema, opts)

            {result,
             telemetry_context(
               normalized_params,
               config,
               config_present,
               order,
               schema,
               opts
             ), metrics}

          {:error, _reason} = error ->
            {error, context, @empty_metrics}
        end

      {:error, _reason} = error ->
        {error, telemetry_context(params, nil, false, nil, nil, opts), @empty_metrics}
    end
  end

  defp execute(queryable, %Params.Offset{} = params, config, order, schema, opts) do
    if config.api != :offset do
      {{:error, ErrorCat.config_mismatch(%{mismatch: :api})}, @empty_metrics}
    else
      flop_params =
        order
        |> Order.to_flop()
        |> Map.merge(%{page: params.page, page_size: params.size})

      if flop_schema?(schema) do
        {count_result, count_duration} = Count.run_with_metrics(queryable, opts)

        case count_result do
          {:ok, total_count} ->
            flop_opts = flop_options(schema, config, order, opts, :offset)
            flop_opts = Keyword.put(flop_opts, :count, total_count)

            {flop_result, entries_duration} =
              timed_query(fn ->
                Flop.validate_and_run(queryable, flop_params, flop_opts)
              end)

            result = offset_result(flop_result, params, total_count)

            {result,
             %{
               query_count: 2,
               db_duration: count_duration + entries_duration,
               count_duration: count_duration
             }}

          {:error, :count_failed} ->
            {{:error, ErrorCat.count_failed()},
             %{query_count: 1, db_duration: count_duration, count_duration: count_duration}}
        end
      else
        {result, metrics} = Generic.offset_with_metrics(queryable, params, order, opts)

        case result do
          {:ok, page} -> {{:ok, page}, metrics}
          {:error, :count_failed} -> {{:error, ErrorCat.count_failed()}, metrics}
          {:error, :query_failed} -> {{:error, ErrorCat.query_failed()}, metrics}
        end
      end
    end
  end

  defp execute(queryable, %Params.Cursor{} = params, config, order, schema, opts) do
    if config.api != :cursor do
      {{:error, ErrorCat.config_mismatch(%{mismatch: :api})}, @empty_metrics}
    else
      surface = Keyword.get(opts, :surface, "default")

      with {:ok, fingerprint} <- query_fingerprint(opts),
           binding = [surface: surface, order: Order.identity(order), fingerprint: fingerprint],
           {:ok, after_cursor} <- decode_after(params.after, binding, opts) do
        flop_params =
          order
          |> Order.to_flop()
          |> Map.merge(%{first: params.first, after: after_cursor})

        flop_opts = flop_options(schema, config, order, opts, :cursor)

        {flop_result, entries_duration} =
          timed_query(fn ->
            Flop.validate_and_run(queryable, flop_params, flop_opts)
          end)

        result =
          case flop_result do
            {:ok, {entries, meta}} ->
              with {:ok, start_cursor} <- encode_cursor(meta.start_cursor, binding, opts),
                   {:ok, end_cursor} <- encode_cursor(meta.end_cursor, binding, opts) do
                {:ok,
                 %Page.Cursor{
                   entries: entries,
                   start_cursor: start_cursor,
                   end_cursor: end_cursor,
                   has_previous_page: meta.has_previous_page?,
                   has_next_page: meta.has_next_page?
                 }}
              end

            {:error, :query_failed} ->
              {:error, ErrorCat.query_failed()}

            {:error, meta} ->
              {:error, map_flop_error(meta)}
          end

        {result, %{query_count: 1, db_duration: entries_duration, count_duration: 0}}
      else
        {:error, _reason} = error -> {error, @empty_metrics}
      end
    end
  end

  defp offset_result({:ok, {entries, meta}}, params, total_count) do
    {:ok,
     %Page.Offset{
       entries: entries,
       page: meta.current_page || params.page,
       size: meta.page_size || params.size,
       total_count: meta.total_count || total_count,
       total_pages: meta.total_pages || 0,
       has_previous_page: meta.has_previous_page?,
       has_next_page: meta.has_next_page?
     }}
  end

  defp offset_result({:error, :query_failed}, _params, _total_count) do
    {:error, ErrorCat.query_failed()}
  end

  defp offset_result({:error, meta}, _params, _total_count) do
    {:error, map_flop_error(meta)}
  end

  defp timed_query(fun) do
    started_at = System.monotonic_time()

    result =
      try do
        fun.()
      rescue
        _error in [Ecto.QueryError, Postgrex.Error] -> {:error, :query_failed}
      end

    {result, System.monotonic_time() - started_at}
  end

  defp execution_config(opts) do
    case Keyword.fetch(opts, :config) do
      :error ->
        {:ok, Config.default(), false}

      {:ok, %Config{} = config} ->
        with {:ok, :pass} <- validate_execution_api(config.api),
             {:ok, :pass} <- Config.validate(config) do
          {:ok, config, true}
        else
          {:error, :unsupported_api} -> {:error, ErrorCat.unsupported_api()}
          {:error, :invalid_config} -> {:error, ErrorCat.invalid_config()}
        end

      {:ok, _config} ->
        {:error, ErrorCat.invalid_config()}
    end
  end

  defp validate_execution_api(api) when api in [:offset, :cursor], do: {:ok, :pass}

  defp validate_execution_api(api) when is_atom(api) and not is_nil(api),
    do: {:error, :unsupported_api}

  defp validate_execution_api(_api), do: {:error, :invalid_config}

  defp execution_order(opts) do
    case Keyword.get(opts, :order) do
      %Order{} = order ->
        case Order.new(Map.from_struct(order)) do
          {:ok, order} -> {:ok, order}
          {:error, :invalid_order} -> {:error, ErrorCat.unsupported_sort()}
        end

      _order ->
        {:error, ErrorCat.unsupported_sort()}
    end
  end

  defp fetch_schema(opts) do
    case Keyword.get(opts, :for) do
      schema when is_atom(schema) -> {:ok, schema}
      _schema -> {:error, ErrorCat.invalid_config()}
    end
  end

  defp flop_schema?(schema), do: function_exported?(schema, :__flop_schema__, 0)

  defp reject_existing_order(queryable) do
    query = Ecto.Queryable.to_query(queryable)

    if query.order_bys == [] do
      {:ok, :pass}
    else
      raise ArgumentError,
            "Helper.ORM.pagi/3 received a query with ORDER BY; the Pagi.Order descriptor must be the only order owner"
    end
  end

  defp normalize_params(nil, %Config{api: :offset} = config, _config_present) do
    {:ok, %Params.Offset{page: 1, size: config.default_size, config_revision: config.revision}}
  end

  defp normalize_params(nil, %Config{api: :cursor} = config, _config_present) do
    {:ok,
     %Params.Cursor{first: config.default_size, after: nil, config_revision: config.revision}}
  end

  defp normalize_params(%Params.Offset{} = params, config, config_present) do
    with {:ok, :pass} <-
           validate_revision_context(params.config_revision, :offset, config, config_present),
         {:ok, :pass} <- validate_page(params.page),
         {:ok, :pass} <- validate_size(params.size, config.max_size),
         {:ok, :pass} <- validate_deep_offset(params.page) do
      {:ok, params}
    end
  end

  defp normalize_params(%Params.Cursor{} = params, config, config_present) do
    with {:ok, :pass} <-
           validate_revision_context(params.config_revision, :cursor, config, config_present),
         {:ok, :pass} <- validate_cursor_after(params.after),
         {:ok, :pass} <- validate_size(params.first, config.max_size) do
      {:ok, params}
    end
  end

  defp normalize_params(_params, _config, _config_present),
    do: {:error, ErrorCat.invalid_config_context()}

  defp validate_revision_context(revision, api, config, true) do
    cond do
      not is_integer(revision) or revision < 0 ->
        {:error, ErrorCat.invalid_config_context()}

      revision != config.revision ->
        {:error, ErrorCat.config_mismatch(%{mismatch: :revision})}

      api != config.api ->
        {:error, ErrorCat.config_mismatch(%{mismatch: :api})}

      true ->
        {:ok, :pass}
    end
  end

  defp validate_revision_context(revision, api, config, false) do
    cond do
      not is_nil(revision) -> {:error, ErrorCat.invalid_config_context()}
      api != config.api -> {:error, ErrorCat.config_mismatch(%{mismatch: :api})}
      true -> {:ok, :pass}
    end
  end

  defp validate_page(page) when is_integer(page) and page >= 1, do: {:ok, :pass}
  defp validate_page(_page), do: {:error, ErrorCat.page_out_of_range()}

  defp validate_size(size, max_size)
       when is_integer(size) and size >= 1 and size <= max_size,
       do: {:ok, :pass}

  defp validate_size(_size, _max_size), do: {:error, ErrorCat.size_out_of_range()}

  defp validate_deep_offset(page) when page <= @default_max_offset_page, do: {:ok, :pass}
  defp validate_deep_offset(_page), do: {:error, ErrorCat.deep_offset_rejected()}

  defp validate_cursor_after(nil), do: {:ok, :pass}

  defp validate_cursor_after(after_cursor) when is_binary(after_cursor) and after_cursor != "",
    do: {:ok, :pass}

  defp validate_cursor_after(_after_cursor), do: {:error, ErrorCat.invalid_cursor()}

  defp flop_options(schema, config, order, opts, api) do
    pagination_types = if api == :offset, do: [:page], else: [:first]

    [
      for: schema,
      repo: Repo,
      max_limit: config.max_size,
      default_limit: config.default_size,
      pagination_types: pagination_types,
      tiebreaker: false
    ]
    |> maybe_put_cursor_value_func(opts, order)
  end

  defp maybe_put_cursor_value_func(flop_opts, opts, _order) do
    case Keyword.get(opts, :cursor_value_func) do
      function when is_function(function, 2) ->
        Keyword.put(flop_opts, :cursor_value_func, function)

      function when is_function(function, 3) ->
        Keyword.put(flop_opts, :cursor_value_func, function)

      nil ->
        flop_opts

      _function ->
        flop_opts
    end
  end

  defp emit_telemetry(result, context, metrics, started_at) do
    entry_count = entry_count(result)

    :telemetry.execute(
      @telemetry_event,
      %{
        duration: System.monotonic_time() - started_at,
        db_duration: metrics.db_duration,
        count_duration: metrics.count_duration,
        query_count: metrics.query_count,
        entry_count: entry_count,
        result_count: entry_count
      },
      Map.put(context, :result, result_reason(result))
    )
  end

  defp telemetry_context(params, config, config_present, order, schema, opts) do
    %{
      resource: Keyword.get(opts, :resource, schema),
      surface: Keyword.get(opts, :surface, "default"),
      api: if(config, do: config.api, else: params_api(params)),
      mode: Keyword.get(opts, :mode),
      schema_version: Keyword.get(opts, :schema_version),
      config_revision: if(config, do: config.revision, else: nil),
      default_config: not config_present,
      page_size: page_size(params),
      sort: if(order, do: Order.identity(order), else: nil)
    }
  end

  defp params_api(%Params.Offset{}), do: :offset
  defp params_api(%Params.Cursor{}), do: :cursor
  defp params_api(_params), do: nil

  defp page_size(%Params.Offset{size: size}), do: size
  defp page_size(%Params.Cursor{first: first}), do: first
  defp page_size(_params), do: nil

  defp result_reason({:ok, _page}), do: :success
  defp result_reason({:error, %{reason: reason}}), do: reason
  defp result_reason({:error, reason}), do: reason

  defp entry_count({:ok, %{entries: entries}}) when is_list(entries), do: length(entries)
  defp entry_count(_result), do: 0

  defp decode_after(nil, _binding, _opts), do: {:ok, nil}

  defp decode_after(after_cursor, binding, opts) do
    case CursorCodec.decode(
           after_cursor,
           Keyword.merge(opts,
             surface: binding[:surface],
             order: binding[:order],
             fingerprint: binding[:fingerprint]
           )
         ) do
      {:ok, %{cursor: cursor}} -> {:ok, cursor}
      {:error, error} -> {:error, error}
    end
  end

  defp encode_cursor(nil, _binding, _opts), do: {:ok, nil}

  defp encode_cursor(cursor, binding, opts) do
    CursorCodec.encode(
      %{
        cursor: cursor,
        surface: binding[:surface],
        order: binding[:order],
        fingerprint: binding[:fingerprint]
      },
      opts
    )
  end

  defp query_fingerprint(opts) do
    case Keyword.fetch(opts, :query_fingerprint) do
      {:ok, fingerprint} when is_binary(fingerprint) and fingerprint != "" ->
        {:ok, fingerprint}

      _missing_or_invalid ->
        {:error, ErrorCat.invalid_config_context()}
    end
  end

  defp map_flop_error(%Flop.Meta{errors: errors}) do
    keys = if is_map(errors), do: Map.keys(errors), else: Keyword.keys(errors)

    cond do
      :page in keys -> ErrorCat.page_out_of_range()
      :page_size in keys or :first in keys -> ErrorCat.size_out_of_range()
      true -> ErrorCat.unsupported_sort()
    end
  end

  defp map_flop_error(_meta), do: ErrorCat.unsupported_sort()
end
