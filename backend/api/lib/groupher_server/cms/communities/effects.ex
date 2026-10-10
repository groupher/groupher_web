defmodule GroupherServer.CMS.Communities.Effects do
  @moduledoc """
  Owns Community activity and other in-transaction effects.

      Community Command / Lifecycle
        -> Communities.Effects
        -> Activity / context-specific effect owner
  """

  alias GroupherServer.Activity

  @doc "Records one Community activity in the caller-owned transaction."
  def activity(resource, event, opts), do: Activity.log(resource, event, opts)
end
