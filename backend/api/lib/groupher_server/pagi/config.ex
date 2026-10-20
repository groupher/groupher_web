defmodule GroupherServer.Pagi.Config do
  @moduledoc """
  Normalizes a Dashboard pagination surface config.

  Missing surface -> platform default; persisted surface -> strict key,
  version, type, matrix, and size validation -> EffectiveConfig.
  """

  alias GroupherServer.Pagi.{EffectiveConfig, ErrorCat, SchemaRegistry}
  alias Helper.ORM.Pagi.Config

  @allowed_keys [:api, :mode, :default_size, :max_size, :revision, :schema_version]
  @doc "Returns the server-owned hard maximum for a Dashboard page size."
  @spec platform_hard_max() :: pos_integer()
  def platform_hard_max, do: Config.platform_hard_max()

  @doc """
  Normalizes a missing or persisted Dashboard surface config.

  ## Examples

      config = %{api: :offset, mode: :page, schema_version: 1, revision: 0}
      match?({:ok, %EffectiveConfig{}}, Config.normalize(config))
      #=> true
  """
  @spec normalize(nil | map()) :: {:ok, EffectiveConfig.t()} | {:error, ErrorCat.error()}
  def normalize(nil), do: {:ok, default()}

  def normalize(%{} = raw) do
    with {:ok, attrs} <- canonicalize_keys(raw),
         {:ok, :pass} <- validate_schema_version(attrs),
         {:ok, :pass} <- validate_required(attrs),
         {:ok, api} <- normalize_api(Map.fetch!(attrs, :api)),
         {:ok, mode} <- normalize_mode(Map.fetch!(attrs, :mode)),
         {:ok, :pass} <- validate_combination(attrs.schema_version, api, mode),
         {:ok, default_size} <- normalize_size(attrs, :default_size, 20),
         {:ok, max_size} <- normalize_size(attrs, :max_size, Config.platform_hard_max()),
         {:ok, :pass} <- validate_sizes(default_size, max_size),
         {:ok, config} <-
           Config.new(%{
             api: api,
             default_size: default_size,
             max_size: max_size,
             revision: attrs.revision,
             platform_hard_max: Config.platform_hard_max()
           }) do
      {:ok, %EffectiveConfig{config: config, mode: mode, schema_version: attrs.schema_version}}
    else
      {:error, :invalid_config} -> {:error, ErrorCat.invalid_config()}
      {:error, :unsupported_api} -> {:error, ErrorCat.unsupported_api()}
      :error -> {:error, ErrorCat.invalid_config()}
    end
  end

  def normalize(_raw), do: {:error, ErrorCat.invalid_config()}

  @doc """
  Returns the frozen offset/page platform default.

  ## Examples

      %EffectiveConfig{mode: :page} = Config.default()
  """
  @spec default() :: EffectiveConfig.t()
  def default do
    {:ok, config} =
      Config.new(
        Map.put(
          Map.from_struct(Config.default()),
          :platform_hard_max,
          Config.platform_hard_max()
        )
      )

    %EffectiveConfig{config: config, mode: :page, schema_version: 1}
  end

  defp canonicalize_keys(raw) do
    Enum.reduce_while(raw, {:ok, %{}}, fn {key, value}, {:ok, acc} ->
      case canonical_key(key) do
        {:ok, canonical} when not is_map_key(acc, canonical) ->
          {:cont, {:ok, Map.put(acc, canonical, value)}}

        _ ->
          {:halt, {:error, :invalid_config}}
      end
    end)
  end

  defp canonical_key(key) when key in @allowed_keys, do: {:ok, key}

  defp canonical_key(key) when is_binary(key) do
    case Enum.find(@allowed_keys, &(Atom.to_string(&1) == key)) do
      nil -> :error
      atom -> {:ok, atom}
    end
  end

  defp canonical_key(_key), do: :error

  defp validate_schema_version(%{schema_version: version})
       when is_integer(version) and version > 0 do
    if version in SchemaRegistry.supported_schema_versions(),
      do: {:ok, :pass},
      else: {:error, :invalid_config}
  end

  defp validate_schema_version(_attrs), do: {:error, :invalid_config}

  defp validate_required(attrs) do
    required = [:schema_version, :api, :mode, :revision]

    if Enum.all?(required, &(Map.has_key?(attrs, &1) and not is_nil(Map.get(attrs, &1)))) do
      {:ok, :pass}
    else
      {:error, :invalid_config}
    end
  end

  defp normalize_api(api) when api in [:offset, :cursor], do: {:ok, api}

  defp normalize_api(api) when api in ["offset", "cursor"],
    do: {:ok, String.to_existing_atom(api)}

  defp normalize_api(api) when is_atom(api), do: {:error, :unsupported_api}
  defp normalize_api(_api), do: {:error, :invalid_config}

  defp normalize_mode(mode) when mode in [:page, :load_more, :infinite_scroll], do: {:ok, mode}

  defp normalize_mode(mode) when mode in ["page", "load_more", "infinite_scroll"],
    do: {:ok, String.to_existing_atom(mode)}

  defp normalize_mode(_mode), do: {:error, :invalid_config}

  defp validate_combination(version, api, mode) do
    if SchemaRegistry.valid_combination?(version, api, mode),
      do: {:ok, :pass},
      else: {:error, :invalid_config}
  end

  defp normalize_size(attrs, key, fallback) do
    case Map.get(attrs, key, fallback) do
      nil -> {:ok, fallback}
      value when is_integer(value) and value >= 1 -> {:ok, value}
      _value -> {:error, :invalid_config}
    end
  end

  defp validate_sizes(default_size, max_size) do
    if default_size <= max_size and max_size <= Config.platform_hard_max(),
      do: {:ok, :pass},
      else: {:error, :invalid_config}
  end
end
