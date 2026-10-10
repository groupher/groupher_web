defmodule GroupherServer.Accounts.Profiles.Read do
  @moduledoc """
  Owns profile read-side projection refresh, including the existing view counter.

      profile request -> Read -> Persist view touch -> Query projection -> Effects
  """

  alias GroupherServer.Accounts
  alias Accounts.Model.User
  alias Accounts.Profiles.{Effects, Persist, Query}

  @doc """
  Reads and projects a profile while preserving current view-count behavior.

  ## Examples

      Accounts.Profiles.Read.run(user)
  """
  @spec run(User.t()) :: {:ok, User.t()} | {:error, term()}
  def run(%User{} = user) do
    with {:ok, user} <- Persist.increment_views(user),
         {:ok, projected} <- Query.project_user(user),
         {:ok, result} <- Persist.persist_contributes(user, projected) do
      Effects.revalidate_user(result)
      {:ok, result}
    end
  end

  @doc """
  Reads a profile and adds viewer-aware relationship fields.

  ## Examples

      Accounts.Profiles.Read.run(user, viewer)
  """
  @spec run(User.t(), User.t()) :: {:ok, User.t()} | {:error, term()}
  def run(%User{} = user, %User{} = viewer) do
    with {:ok, user} <- run(user),
         {:ok, user} <- Query.project_user(user, viewer) do
      {:ok, user}
    end
  end
end
