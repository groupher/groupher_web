defmodule GroupherServer.Analysis.Maintenance do
  @moduledoc """
  Public facade for rebuildable Analysis retention and operational metrics.

      Oban worker -> Analysis.Maintenance -> Query / Workflow
  """

  alias __MODULE__.{Query, Workflow}

  @doc """
  Returns bounded raw-event backlog and delay metrics.

  ## Examples

      Analysis.Maintenance.metrics()
  """
  @spec metrics() :: map()
  defdelegate metrics(), to: Query

  @doc """
  Deletes bounded batches of expired raw events and hourly projections.

  ## Examples

      Analysis.Maintenance.delete_expired()
  """
  @spec delete_expired() :: map()
  defdelegate delete_expired(), to: Workflow
end
