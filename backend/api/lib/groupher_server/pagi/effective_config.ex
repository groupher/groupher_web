defmodule GroupherServer.Pagi.EffectiveConfig do
  @moduledoc """
  Validated Dashboard pagination product configuration plus its execution config.

  The product layer owns `mode` and `schema_version`; the nested execution config
  is the only value passed across the boundary to `Helper.ORM.Pagi`.

      Pagi.Config -> EffectiveConfig -> ORM execution
  """

  alias Helper.ORM.Pagi.Config

  @enforce_keys [:config, :mode, :schema_version]
  defstruct [:config, :mode, :schema_version]

  @type mode :: :page | :load_more | :infinite_scroll

  @type t :: %__MODULE__{
          config: Config.t(),
          mode: mode(),
          schema_version: pos_integer()
        }
end
