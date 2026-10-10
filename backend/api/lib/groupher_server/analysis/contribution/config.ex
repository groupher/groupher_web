defmodule GroupherServer.Analysis.Contribution.Config do
  @moduledoc """
  Static configuration contract for contribution analytics.

  Business position:

      Main / Dashboard
        -> GraphQL
        -> Analysis
        -> Config
        -> Repo / analytics provider
  """

  @general_config Application.compile_env(:groupher_server, :general, [])

  @type t :: %__MODULE__{
          community_contribute_days: pos_integer(),
          user_contribute_months: pos_integer()
        }

  defstruct community_contribute_days: Keyword.get(@general_config, :community_contribute_days),
            user_contribute_months: Keyword.get(@general_config, :user_contribute_months)

  @doc """
  Returns the compile-time contribution analytics configuration.

  ## Examples

      Analysis.Contribution.Config.base()
  """
  @spec base() :: t()
  def base, do: %__MODULE__{}

  @doc """
  Returns the contribution window used for community projections.

  ## Examples

      Analysis.Contribution.Config.community_contribute_days()
  """
  @spec community_contribute_days() :: pos_integer()
  def community_contribute_days, do: base().community_contribute_days

  @doc """
  Returns the contribution window used for user projections.

  ## Examples

      Analysis.Contribution.Config.user_contribute_months()
  """
  @spec user_contribute_months() :: pos_integer()
  def user_contribute_months, do: base().user_contribute_months
end
