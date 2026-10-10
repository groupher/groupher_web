defmodule GroupherServer.Analysis.Contribution do
  @moduledoc """
  Public facade for rebuildable user and community contribution analytics.

  Query, persistence, cache delivery and transaction orchestration are kept in
  their dedicated owners below this facade.

      Application caller
          -> Analysis.Contribution
          -> Query / Workflow
          -> contribution facts and projections
  """

  alias __MODULE__.{Query, Workflow}

  @doc """
  Records contribution facts for a user or community subject.

  ## Examples

      Analysis.Contribution.make_contribution(user)
  """
  @spec make_contribution(struct()) :: {:ok, struct()} | {:error, term()}
  defdelegate make_contribution(subject), to: Workflow

  @doc """
  Returns the recent contribution digest for a user or community.

  ## Examples

      Analysis.Contribution.list_contributions_digest(user)
  """
  @spec list_contributions_digest(struct()) :: {:ok, term()} | {:error, term()}
  defdelegate list_contributions_digest(subject), to: Query

  @doc """
  Rebuilds and caches one community contribution digest.

  ## Examples

      Analysis.Contribution.get_contributes_then_cache(community)
  """
  @spec get_contributes_then_cache(struct()) :: {:ok, term()} | {:error, term()}
  defdelegate get_contributes_then_cache(community), to: Query
end
