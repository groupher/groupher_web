defmodule Helper.ORM.Pagi.Config do
  @moduledoc """
  The execution-only pagination configuration.

  Dashboard `mode` and `schema_version` deliberately do not belong here. They
  are normalized before a resource query calls `Helper.ORM.pagi/3`.

  Dashboard normalizer -> `%Config{}` -> Pagi execution.
  """

  @enforce_keys [:api, :default_size, :max_size, :revision, :platform_hard_max]
  defstruct [:api, :default_size, :max_size, :revision, :platform_hard_max]

  @type api :: :offset | :cursor

  @type t :: %__MODULE__{
          api: api(),
          default_size: pos_integer(),
          max_size: pos_integer(),
          revision: non_neg_integer(),
          platform_hard_max: pos_integer()
        }

  @execution_keys [:api, :default_size, :max_size, :revision, :platform_hard_max]
  @platform_hard_max 100

  @doc "Returns the server-owned hard maximum enforced at the ORM boundary."
  @spec platform_hard_max() :: pos_integer()
  def platform_hard_max, do: @platform_hard_max

  @doc """
  Returns the frozen platform execution defaults.

  ## Examples

      %Config{api: :offset, default_size: 20} = Config.default()
  """
  @spec default() :: t()
  def default do
    %__MODULE__{
      api: :offset,
      default_size: 20,
      max_size: 100,
      revision: 0,
      platform_hard_max: @platform_hard_max
    }
  end

  @doc """
  Builds and validates an execution configuration from internal fields.

  ## Examples

      Config.new(%{
        api: :cursor,
        default_size: 20,
        max_size: 100,
        revision: 0,
        platform_hard_max: @platform_hard_max
      })
      #=> {:ok, %Config{}}
  """
  @spec new(map()) :: {:ok, t()} | {:error, term()}
  def new(%{} = attrs) do
    with {:ok, :pass} <- validate_keys(attrs),
         {:ok, config} <- build(attrs),
         {:ok, :pass} <- validate(config) do
      {:ok, config}
    end
  end

  def new(_attrs), do: {:error, :invalid_config}

  @doc """
  Validates a config struct without interpreting Dashboard product mode.

  ## Examples

      {:ok, :pass} = Config.validate(Config.default())
  """
  @spec validate(t()) :: {:ok, :pass} | {:error, :invalid_config}
  def validate(%__MODULE__{
        api: api,
        default_size: default_size,
        max_size: max_size,
        revision: revision,
        platform_hard_max: platform_hard_max
      }) do
    if api in [:offset, :cursor] and
         is_integer(default_size) and default_size >= 1 and
         is_integer(max_size) and max_size >= 1 and
         platform_hard_max == @platform_hard_max and
         default_size <= max_size and max_size <= platform_hard_max and
         is_integer(revision) and revision >= 0 do
      {:ok, :pass}
    else
      {:error, :invalid_config}
    end
  end

  def validate(_config), do: {:error, :invalid_config}

  defp validate_keys(attrs) do
    if Enum.sort(Map.keys(attrs)) == Enum.sort(@execution_keys) do
      {:ok, :pass}
    else
      {:error, :invalid_config}
    end
  end

  defp build(attrs) do
    {:ok,
     %__MODULE__{
       api: Map.get(attrs, :api),
       default_size: Map.get(attrs, :default_size),
       max_size: Map.get(attrs, :max_size),
       revision: Map.get(attrs, :revision),
       platform_hard_max: Map.get(attrs, :platform_hard_max)
     }}
  end
end
