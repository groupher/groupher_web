defmodule GroupherServer.Accounts.Achievements.Persist do
  @moduledoc """
  Owns achievement row primitives without opening transactions.

      Achievements.Commands -> Persist -> Achievement row
  """

  import ShortMaps

  alias GroupherServer.Accounts

  alias Accounts.Model.Achievement
  alias Helper.ORM

  @doc """
  Ensures the achievement row exists for one user.

  ## Examples

      Accounts.Achievements.Persist.ensure(42)
  """
  @spec ensure(integer()) :: {:ok, Achievement.t()} | {:error, term()}
  def ensure(user_id) do
    ORM.upsert_by(Achievement, ~m(user_id)a, ~m(user_id)a)
  end

  @doc """
  Loads one user's achievement row.

  ## Examples

      Accounts.Achievements.Persist.find(42)
  """
  @spec find(integer()) :: {:ok, Achievement.t()} | {:error, term()}
  def find(user_id), do: ORM.find_by(Achievement, ~m(user_id)a)

  @doc """
  Updates one achievement row with already-computed counters.

  ## Examples

      Accounts.Achievements.Persist.update(achievement, %{reputation: 10})
  """
  @spec update(Achievement.t(), map()) :: {:ok, Achievement.t()} | {:error, term()}
  def update(achievement, attrs), do: ORM.update(achievement, attrs)
end
