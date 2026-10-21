defmodule GroupherServer.Pagi do
  @moduledoc """
  Public facade for the Dashboard pagination product contract.

  Schema validation remains owned by `Pagi.Config`; the registry is exposed
  through this boundary so callers do not reach organizational internals.

      persisted surface -> Pagi.Config -> EffectiveConfig -> ORM Pagi adapter
  """

  alias __MODULE__.{Config, EffectiveConfig, ErrorCat, Params, SchemaRegistry}

  @doc "Normalizes one offset or cursor input at the API boundary before resource defaults apply."
  @spec from_input(Params.input()) :: {:ok, Params.t() | nil} | {:error, ErrorCat.error()}
  defdelegate from_input(input), to: Params

  @doc "Normalizes one position using the effective resource size default."
  @spec from_input(Params.input(), pos_integer()) ::
          {:ok, Params.t() | nil} | {:error, ErrorCat.error()}
  defdelegate from_input(input, default_size), to: Params

  @doc "Extracts the optional config revision without choosing resource-specific defaults."
  @spec revision(Params.input()) :: non_neg_integer() | nil
  defdelegate revision(input), to: Params

  @doc "Normalizes the optional persisted Dashboard pagination configuration."
  @spec normalize(nil | map()) ::
          {:ok, EffectiveConfig.t()} | {:error, ErrorCat.error()}
  defdelegate normalize(raw), to: Config

  @doc "Returns the server-owned hard maximum for page size."
  @spec platform_hard_max() :: pos_integer()
  defdelegate platform_hard_max(), to: Config

  @doc "Returns supported pagination schema versions."
  @spec supported_schema_versions() :: [pos_integer()]
  defdelegate supported_schema_versions(), to: SchemaRegistry

  @doc "Returns a supported API/mode matrix."
  @spec matrix_for(pos_integer()) :: {:ok, map()} | :error
  defdelegate matrix_for(version), to: SchemaRegistry

  @doc "Checks whether a schema/API/mode combination is supported."
  @spec valid_combination?(pos_integer(), atom(), atom()) :: boolean()
  defdelegate valid_combination?(version, api, mode), to: SchemaRegistry

  @doc "Returns the pagination unsupported-sort error. Facing contexts use this public boundary."
  defdelegate unsupported_sort(), to: ErrorCat

  @doc "Builds the stable invalid-config error for a pagination boundary."
  @spec invalid_config() :: ErrorCat.error()
  defdelegate invalid_config(), to: ErrorCat

  @doc "Builds the stable invalid-config-context error for a pagination boundary."
  @spec invalid_config_context() :: ErrorCat.error()
  defdelegate invalid_config_context(), to: ErrorCat

  @doc "Builds the stable revision-mismatch error for a pagination boundary."
  @spec config_mismatch(map()) :: ErrorCat.error()
  defdelegate config_mismatch(details), to: ErrorCat
end
