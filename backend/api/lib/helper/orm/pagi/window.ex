defmodule Helper.ORM.Pagi.Window do
  @moduledoc """
  Executes canonical Pagi over a provider's finite ranked result window.

  The provider callback accepts an absolute offset and size and returns entries and
  an accessible total. Cursor positions are signed and bound to the query and sort.
  SQL resources use Pagi.run/3 and keyset queries instead.

  Business position:

      finite provider rows and query identity
        -> offset/depth validation
        -> bounded provider fetch
        -> offset or signed-cursor page metadata
  """
  alias Helper.ORM.Pagi.{Config, Page, CursorCodec}
  alias GroupherServer.{Pagi}
  alias Pagi.Params
  alias Pagi.ErrorCat, as: PagiErrorCat

  @doc "Runs a finite provider callback after validating the Pagi position and depth limit."
  @spec run(Params.input(), map(), (non_neg_integer(), pos_integer() -> tuple()), keyword()) ::
          tuple()
  def run(input, binding, fetch, opts) do
    with {:ok, maximum} <- max_entries(opts),
         {:ok, params} <- Params.from_input(input),
         {:ok, params} <- Params.validate(params, Config.default(), false),
         {:ok, %{offset: offset, size: size}} <- position(params, binding),
         {:ok, :pass} <- validate_depth(offset, maximum),
         {:ok, %{entries: entries, total: total}} <- fetch.(offset, min(size, maximum - offset)) do
      page(entries, min(total, maximum), params, offset, size, binding)
    end
  end

  defp max_entries(opts) do
    case Keyword.fetch(opts, :max_entries) do
      {:ok, value} when is_integer(value) and value > 0 -> {:ok, value}
      _ -> {:error, PagiErrorCat.invalid_config()}
    end
  end

  defp position(%Params.Offset{page: page, size: size}, _binding) do
    {:ok, %{offset: (page - 1) * size, size: size}}
  end

  defp position(%Params.Cursor{after: nil, first: size}, _binding) do
    {:ok, %{offset: 0, size: size}}
  end

  defp position(%Params.Cursor{after: cursor, first: size}, binding) do
    with {:ok, %{cursor: position}} <- CursorCodec.decode(cursor, Map.to_list(binding)),
         {offset, ""} when offset >= 0 <- Integer.parse(position) do
      {:ok, %{offset: offset, size: size}}
    else
      {:error, _} = error -> error
      _ -> {:error, PagiErrorCat.invalid_cursor()}
    end
  end

  # The provider's configured ranked-result window is finite, even in cursor mode.
  defp validate_depth(offset, maximum) when offset < maximum, do: {:ok, :pass}
  defp validate_depth(_, _), do: {:error, PagiErrorCat.deep_offset_rejected()}

  defp page(entries, total, %Params.Offset{page: page}, _offset, size, _binding) do
    pages = ceil(total / size)

    {:ok,
     %Page.Offset{
       entries: entries,
       page: page,
       size: size,
       total_count: total,
       total_pages: pages,
       has_previous_page: page > 1,
       has_next_page: page < pages
     }}
  end

  defp page(entries, total, %Params.Cursor{}, offset, size, binding) do
    with {:ok, start_cursor} <- cursor(entries, offset, binding),
         {:ok, end_cursor} <- cursor(entries, offset + length(entries), binding) do
      {:ok,
       %Page.Cursor{
         entries: entries,
         start_cursor: start_cursor,
         end_cursor: end_cursor,
         has_previous_page: offset > 0,
         has_next_page: offset + size < total
       }}
    end
  end

  defp cursor([], _offset, _binding), do: {:ok, nil}

  defp cursor(_entries, offset, binding) do
    CursorCodec.encode(Map.put(binding, :cursor, to_string(offset)))
  end
end
