defmodule Helper.ORM.Pagi.Params do
  @moduledoc """
  Transport-neutral, already-normalized pagination parameters.

  GraphQL or a domain adapter -> one of the two Params structs -> Pagi engine.

      transport input -> Params.Offset or Params.Cursor -> ORM Pagi engine
  """

  defmodule Offset do
    @moduledoc """
    Forward offset pagination parameters.

        page input -> Params.Offset -> ORM Pagi engine
    """

    @enforce_keys [:page, :size]
    defstruct [:page, :size, :config_revision]

    @type t :: %__MODULE__{
            page: pos_integer(),
            size: pos_integer(),
            config_revision: non_neg_integer() | nil
          }
  end

  defmodule Cursor do
    @moduledoc """
    Forward cursor pagination parameters.

        cursor input -> Params.Cursor -> ORM Pagi engine
    """

    @enforce_keys [:first]
    defstruct [:first, :after, :config_revision]

    @type t :: %__MODULE__{
            first: pos_integer(),
            after: String.t() | nil,
            config_revision: non_neg_integer() | nil
          }
  end

  @type t :: Offset.t() | Cursor.t()

  @type input :: t() | %{offset: map()} | %{cursor: map()} | nil

  @doc "Normalizes canonical pagination input using the resource's effective size default."
  @spec from_input(input(), pos_integer()) :: {:ok, t() | nil} | {:error, term()}
  def from_input(input, default_size \\ 20)
  def from_input(nil, _default_size), do: {:ok, nil}
  def from_input(%Offset{} = params, _default_size), do: {:ok, params}
  def from_input(%Cursor{} = params, _default_size), do: {:ok, params}

  def from_input(%{offset: offset} = input, default_size)
      when is_map(offset) and map_size(input) == 1 do
    if Map.keys(offset) -- [:page, :size, :config_revision] == [] do
      {:ok,
       %Offset{
         page: Map.get(offset, :page, 1),
         size: Map.get(offset, :size, default_size),
         config_revision: Map.get(offset, :config_revision)
       }}
    else
      {:error, GroupherServer.Pagi.ErrorCat.invalid_config_context()}
    end
  end

  def from_input(%{cursor: cursor} = input, default_size)
      when is_map(cursor) and map_size(input) == 1 do
    if Map.keys(cursor) -- [:first, :after, :config_revision] == [] do
      {:ok,
       %Cursor{
         first: Map.get(cursor, :first, default_size),
         after: Map.get(cursor, :after),
         config_revision: Map.get(cursor, :config_revision)
       }}
    else
      {:error, GroupherServer.Pagi.ErrorCat.invalid_config_context()}
    end
  end

  def from_input(_input, _default_size) do
    {:error, GroupherServer.Pagi.ErrorCat.invalid_config_context()}
  end

  @doc "Extracts the requested config revision before resolving resource defaults."
  def revision(%Offset{config_revision: revision}), do: revision
  def revision(%Cursor{config_revision: revision}), do: revision
  def revision(%{offset: input}) when is_map(input), do: Map.get(input, :config_revision)
  def revision(%{cursor: input}) when is_map(input), do: Map.get(input, :config_revision)
  def revision(_input), do: nil
  alias GroupherServer.Pagi.ErrorCat
  alias Helper.ORM.Pagi.Config
  @default_max_offset_page 10_000

  @doc "Validates position, size, depth and effective revision for every Pagi execution backend."
  @spec validate(t() | nil, Config.t(), boolean()) :: {:ok, t()} | {:error, term()}
  def validate(nil, %Config{api: :offset} = config, _config_present) do
    {:ok, %Offset{page: 1, size: config.default_size, config_revision: config.revision}}
  end

  def validate(nil, %Config{api: :cursor} = config, _config_present) do
    {:ok, %Cursor{first: config.default_size, after: nil, config_revision: config.revision}}
  end

  def validate(%Offset{} = params, config, config_present) do
    with {:ok, :pass} <-
           validate_revision_context(params.config_revision, :offset, config, config_present),
         {:ok, :pass} <- validate_page(params.page),
         {:ok, :pass} <- validate_size(params.size, config.max_size),
         {:ok, :pass} <- validate_deep_offset(params.page) do
      {:ok, params}
    end
  end

  def validate(%Cursor{} = params, config, config_present) do
    with {:ok, :pass} <-
           validate_revision_context(params.config_revision, :cursor, config, config_present),
         {:ok, :pass} <- validate_cursor_after(params.after),
         {:ok, :pass} <- validate_size(params.first, config.max_size) do
      {:ok, params}
    end
  end

  def validate(_params, _config, _config_present) do
    {:error, ErrorCat.invalid_config_context()}
  end

  defp validate_revision_context(revision, _api, config, true) do
    cond do
      not is_integer(revision) or revision < 0 ->
        {:error, ErrorCat.invalid_config_context()}

      revision != config.revision ->
        {:error, ErrorCat.config_mismatch(%{mismatch: :revision})}

      true ->
        {:ok, :pass}
    end
  end

  defp validate_revision_context(revision, _api, _config, false) do
    cond do
      not is_nil(revision) -> {:error, ErrorCat.invalid_config_context()}
      true -> {:ok, :pass}
    end
  end

  defp validate_page(page) when is_integer(page) and page >= 1, do: {:ok, :pass}
  defp validate_page(_page), do: {:error, ErrorCat.page_out_of_range()}

  defp validate_size(size, max_size)
       when is_integer(size) and size >= 1 and size <= max_size do
    {:ok, :pass}
  end

  defp validate_size(_size, _max_size), do: {:error, ErrorCat.size_out_of_range()}

  defp validate_deep_offset(page) when page <= @default_max_offset_page, do: {:ok, :pass}
  defp validate_deep_offset(_page), do: {:error, ErrorCat.deep_offset_rejected()}

  defp validate_cursor_after(nil), do: {:ok, :pass}

  defp validate_cursor_after(after_cursor) when is_binary(after_cursor) and after_cursor != "" do
    {:ok, :pass}
  end

  defp validate_cursor_after(_after_cursor), do: {:error, ErrorCat.invalid_cursor()}
end
