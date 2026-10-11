defmodule GroupherServer.CMS.Communities.Subscriptions do
  @moduledoc """
  Internal facade for Community subscription state.

      caller -> GroupherServer.CMS.Communities.Subscriptions -> result
  """

  alias __MODULE__.{Query, Setup}

  defdelegate subscribed?(community, user), to: Query
  defdelegate setup_subscribe(community, user), to: Setup, as: :subscribe
  defdelegate setup_unsubscribe(community, user), to: Setup, as: :unsubscribe
end
