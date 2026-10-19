defmodule GroupherServer.Activity.Const do
  @moduledoc """
  Closed protocol vocabulary owned by the Activity context.

  Activity business modules use this module instead of depending on a global
  business-constant catalog. Database migrations keep a frozen DDL snapshot of
  the same values and are checked for parity in tests.

      Activity producer -> Activity.Const -> Event/schema validation
  """

  @sources [:api, :admin, :worker, :scheduler, :maintenance, :operations]
  @actor_types [:user, :system]
  @outcomes [:allowed, :denied]
  @surfaces [:article_log, :community_log]

  @doc """
  Returns the accepted Activity event sources.

  ## Examples

      Activity.Const.source_values()
  """
  @spec source_values() :: [atom()]
  def source_values, do: @sources

  @doc """
  Returns the accepted Activity actor types.

  ## Examples

      Activity.Const.actor_type_values()
  """
  @spec actor_type_values() :: [atom()]
  def actor_type_values, do: @actor_types

  @doc """
  Returns the accepted Activity outcomes.

  ## Examples

      Activity.Const.outcome_values()
  """
  @spec outcome_values() :: [atom()]
  def outcome_values, do: @outcomes

  @doc """
  Returns the public Activity projection surfaces.

  ## Examples

      Activity.Const.surface_values()
  """
  @spec surface_values() :: [atom()]
  def surface_values, do: @surfaces

  @doc """
  Checks whether a value is an accepted Activity source.

  ## Examples

      Activity.Const.valid_source?(:api)
  """
  @spec valid_source?(term()) :: boolean()
  def valid_source?(source), do: source in @sources

  @doc """
  Normalizes the Activity source accepted by keyword/API boundaries.

  ## Examples

      Activity.Const.normalize_source("api")
  """
  @spec normalize_source(term()) :: term()
  def normalize_source(source) when source in @sources, do: source
  def normalize_source("api"), do: :api
  def normalize_source("admin"), do: :admin
  def normalize_source("worker"), do: :worker
  def normalize_source("scheduler"), do: :scheduler
  def normalize_source("maintenance"), do: :maintenance
  def normalize_source("operations"), do: :operations
  def normalize_source(source), do: source

  @doc """
  Checks whether a value is an accepted Activity actor type.

  ## Examples

      Activity.Const.valid_actor_type?(:user)
  """
  @spec valid_actor_type?(term()) :: boolean()
  def valid_actor_type?(actor_type), do: actor_type in @actor_types

  @doc """
  Checks whether a value is an accepted Activity projection surface.

  ## Examples

      Activity.Const.valid_surface?(:community_log)
  """
  @spec valid_surface?(term()) :: boolean()
  def valid_surface?(surface), do: surface in @surfaces
end
