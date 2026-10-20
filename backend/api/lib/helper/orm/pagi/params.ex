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
end
