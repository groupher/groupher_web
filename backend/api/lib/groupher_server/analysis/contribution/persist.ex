defmodule GroupherServer.Analysis.Contribution.Persist do
  @moduledoc """
  Owns contribution fact-row persistence primitives.

  Persist never opens a transaction and never schedules cache work. Workflow
  decides the transaction boundary; Effects handles post-commit delivery.

      contribution subject
          -> daily fact row
  """

  import Ecto.Query, warn: false

  alias GroupherServer.Analysis

  alias GroupherServer.{Accounts, Repo}
  alias Analysis.Contribution.Model.{CommunityContribute, UserContribute}
  alias Accounts.Model.User
  alias Helper.Datetime

  @doc """
  Increments or creates today's user contribution fact.

  ## Examples

      Analysis.Contribution.Persist.record_user(user)
  """
  @spec record_user(User.t()) :: {:ok, UserContribute.t()} | {:error, term()}
  def record_user(%User{id: id}) do
    upsert_daily(UserContribute, %{user_id: id, date: Datetime.today(), count: 1}, [
      :user_id,
      :date
    ])
  end

  @doc """
  Increments or creates today's community contribution fact.

  ## Examples

      Analysis.Contribution.Persist.record_community(community)
  """
  @spec record_community(struct()) :: {:ok, CommunityContribute.t()} | {:error, term()}
  def record_community(%{id: id}) do
    upsert_daily(
      CommunityContribute,
      %{community_id: id, date: Datetime.today(), count: 1},
      [:community_id, :date]
    )
  end

  defp upsert_daily(schema, attrs, conflict_target) do
    now = DateTime.utc_now() |> DateTime.truncate(:second)

    schema
    |> struct()
    |> schema.changeset(attrs)
    |> Repo.insert(
      on_conflict: [inc: [count: 1], set: [updated_at: now]],
      conflict_target: conflict_target,
      returning: true
    )
  end
end
