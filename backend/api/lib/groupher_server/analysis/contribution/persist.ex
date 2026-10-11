defmodule GroupherServer.Analysis.Contribution.Persist do
  @moduledoc """
  Owns contribution fact-row and User projection persistence primitives.

  Persist never opens a transaction and never schedules cache work. Workflow
  decides the transaction boundary; Effects handles post-commit delivery.

      contribution subject
          -> daily fact row
          -> User.contributes projection when applicable
  """

  import Ecto.Query, warn: false

  alias GroupherServer.Analysis

  alias GroupherServer.{Accounts, Repo}
  alias Analysis.Contribution.Model.{CommunityContribute, UserContribute}
  alias Accounts.Model.User
  alias Helper.{Datetime, ORM}

  @doc """
  Increments or creates today's user contribution fact.

  ## Examples

      Analysis.Contribution.Persist.record_user(user)
  """
  @spec record_user(User.t()) :: {:ok, UserContribute.t()} | {:error, term()}
  def record_user(%User{id: id}) do
    today = Datetime.today() |> Date.to_iso8601()

    case ORM.find_by(UserContribute, user_id: id, date: today) do
      {:ok, contribute} -> increment(contribute, :user)
      {:error, _} -> ORM.create(UserContribute, %{user_id: id, date: today, count: 1})
    end
  end

  @doc """
  Increments or creates today's community contribution fact.

  ## Examples

      Analysis.Contribution.Persist.record_community(community)
  """
  @spec record_community(struct()) :: {:ok, CommunityContribute.t()} | {:error, term()}
  def record_community(%{id: id}) do
    today = Datetime.today() |> Date.to_iso8601()

    case ORM.find_by(CommunityContribute, community_id: id, date: today) do
      {:ok, contribute} -> increment(contribute, :community)
      {:error, _} -> ORM.create(CommunityContribute, %{community_id: id, date: today, count: 1})
    end
  end

  @doc """
  Updates the embedded User contribution projection.

  ## Examples

      Analysis.Contribution.Persist.update_user_projection(user, digest)
  """
  @spec update_user_projection(User.t(), map()) :: {:ok, User.t()} | {:error, term()}
  def update_user_projection(%User{} = user, digest),
    do: ORM.update_embed(user, :contributes, digest)

  defp increment(contribute, :user) do
    UserContribute
    |> where([c], c.user_id == ^contribute.user_id and c.date == ^contribute.date)
    |> increment_row(contribute)
  end

  defp increment(contribute, :community) do
    CommunityContribute
    |> where([c], c.community_id == ^contribute.community_id and c.date == ^contribute.date)
    |> increment_row(contribute)
  end

  defp increment_row(query, contribute) do
    {1, [count]} = Repo.update_all(from(row in query, select: row.count), inc: [count: 1])
    {:ok, put_in(contribute.count, count)}
  end
end
