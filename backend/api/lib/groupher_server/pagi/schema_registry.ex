defmodule GroupherServer.Pagi.SchemaRegistry do
  @moduledoc """
  The single source of truth for Dashboard pagination product matrices.

  Schema version -> supported API/mode combinations -> normalized config.
  ORM execution never consults this registry.
  """

  @matrices %{
    1 => %{
      offset: [:page],
      cursor: [:load_more, :infinite_scroll]
    }
  }

  @doc """
  Returns the supported Dashboard pagination schema versions.

  ## Examples

      SchemaRegistry.supported_schema_versions()
      #=> [1]
  """
  @spec supported_schema_versions() :: [pos_integer()]
  def supported_schema_versions, do: Map.keys(@matrices) |> Enum.sort()

  @doc "Returns the product matrix for a supported schema version."
  @spec matrix_for(pos_integer()) :: {:ok, map()} | :error
  def matrix_for(version) when is_integer(version) do
    case Map.fetch(@matrices, version) do
      {:ok, matrix} -> {:ok, matrix}
      :error -> :error
    end
  end

  def matrix_for(_version), do: :error

  @doc """
  Checks whether a version/API/mode combination is in the frozen matrix.

  ## Examples

      SchemaRegistry.valid_combination?(1, :cursor, :load_more)
      #=> true
  """
  @spec valid_combination?(pos_integer(), atom(), atom()) :: boolean()
  def valid_combination?(version, api, mode) do
    case matrix_for(version) do
      {:ok, matrix} -> mode in Map.get(matrix, api, [])
      :error -> false
    end
  end
end
