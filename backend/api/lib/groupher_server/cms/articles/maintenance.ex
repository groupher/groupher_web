defmodule GroupherServer.CMS.Articles.Maintenance do
  @moduledoc """
  Internal maintenance entry points for Article batch state changes.

      scheduler / operations task
        -> Articles.Maintenance
        -> Archive or internal Trash pipeline
        -> Gate + Lifecycle + persistence

  These entries deliberately bypass the user facade and use explicit internal
  pipeline contracts while preserving the same transaction boundary.
  """

  alias GroupherServer.CMS
  alias CMS.Articles.Commands.{Archive, Trash}

  @doc "Archives one Article thread through the explicit internal pipeline."
  @spec archive(atom()) :: {:ok, term()} | {:error, term()}
  def archive(thread), do: Archive.execute(thread)

  @doc "Moves one Article into Trash through the explicit internal pipeline."
  @spec trash(map(), keyword()) :: {:ok, term()} | {:error, term()}
  def trash(article, opts \\ []), do: Trash.execute_internal(article, opts)
end
