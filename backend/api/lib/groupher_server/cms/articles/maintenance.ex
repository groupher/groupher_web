defmodule GroupherServer.CMS.Articles.Maintenance do
  @moduledoc """
  Internal maintenance entry points for Article batch state changes.

      scheduler / operations task
        -> Articles.Maintenance
        -> Archive or Trash direct pipeline
        -> Gate + Lifecycle + persistence

  These entries deliberately bypass the user facade and use the explicit
  operations actor while preserving the same pipeline transaction boundary.
  """

  alias GroupherServer.CMS.Articles.Commands.{Archive, Trash}

  def archive(thread), do: Archive.execute(thread)
  def trash(article, opts \\ []), do: Trash.execute_direct(article, :operations, opts)
end
