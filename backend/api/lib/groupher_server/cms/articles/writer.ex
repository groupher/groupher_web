defmodule GroupherServer.CMS.Articles.Writer do
  @moduledoc """
  Compatibility callback for `Jobs.Later` rows persisted before Article Publish was split.

  New code must call `CMS.Articles.Publish.Effects`; this module can be removed after the
  pre-migration queue has drained.

      persisted Jobs.Later callback -> Articles.Writer -> Publish.Effects
  """

  @doc false
  defdelegate notify_admin_new_article(payload),
    to: GroupherServer.CMS.Articles.Publish.Effects
end
