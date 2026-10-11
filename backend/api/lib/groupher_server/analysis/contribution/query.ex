defmodule GroupherServer.Analysis.Contribution.Query do
  @moduledoc """
  Reads user and community contribution facts and rebuilds cacheable digests.

      contribution facts -> Query -> digest / cache
  """

  import Ecto.Query, warn: false
  import Helper.Utils

  alias GroupherServer.Accounts

  alias GroupherServer.{Analysis, CMS, Repo}
  alias Analysis.Contribution.Model.{CommunityContribute, UserContribute}
  alias CMS.Model.Community
  alias Accounts.Model.User
  alias Helper.{Cache, Datetime, QueryBuilder}

  @community_contribute_days Analysis.Contribution.Config.community_contribute_days()
  @user_contribute_months Analysis.Contribution.Config.user_contribute_months()

  @doc """
  Returns the contribution digest for a user.

  ## Examples

      Analysis.Contribution.Query.list_contributions_digest(user)
  """
  @spec list_contributions_digest(User.t()) :: {:ok, map()}
  def list_contributions_digest(%User{id: id}) do
    UserContribute
    |> where([c], c.user_id == ^id)
    |> QueryBuilder.recent_inserted(months: @user_contribute_months)
    |> select([c], %{date: c.date, count: c.count})
    |> Repo.all()
    |> to_user_digest()
    |> done()
  end

  @spec list_contributions_digest(Community.t()) :: {:ok, list()} | {:error, term()}
  def list_contributions_digest(%Community{id: id}) do
    scope = Cache.get_scope(:community_contributes, id)

    case Cache.get(:common, scope) do
      {:ok, result} -> {:ok, result}
      {:error, _} -> get_contributes_then_cache(%Community{id: id})
    end
  end

  @doc """
  Rebuilds and caches the community contribution digest.

  ## Examples

      Analysis.Contribution.Query.get_contributes_then_cache(community)
  """
  @spec get_contributes_then_cache(Community.t()) :: {:ok, list()} | {:error, term()}
  def get_contributes_then_cache(%Community{id: id}) do
    scope = Cache.get_scope(:community_contributes, id)

    %Community{id: id}
    |> community_records()
    |> to_counts_digest(days: @community_contribute_days)
    |> done_and_cache(:common, scope, expire_min: 10)
  end

  @doc """
  Returns recent community contribution facts for workflow projection updates.

  ## Examples

      Analysis.Contribution.Query.community_records(community)
  """
  @spec community_records(Community.t()) :: list()
  def community_records(%Community{id: id}) do
    CommunityContribute
    |> where([c], c.community_id == ^id)
    |> QueryBuilder.recent_inserted(days: @community_contribute_days)
    |> select([c], %{date: c.date, count: c.count})
    |> Repo.all()
  end

  @doc """
  Converts community contribution facts into the fixed dashboard digest shape.

  ## Examples

      Analysis.Contribution.Query.digest_from_records(records)
  """
  @spec digest_from_records(list()) :: list()
  def digest_from_records(records),
    do: to_counts_digest(records, days: @community_contribute_days)

  defp to_user_digest(data) do
    end_date = Datetime.today()
    start_date = Datetime.today() |> Datetime.shift(months: -6)
    total_count = Enum.reduce(data, 0, &(&1.count + &2))
    %{start_date: start_date, end_date: end_date, total_count: total_count, records: data}
  end

  defp to_counts_digest(record, days: count) do
    case length(record) == @community_contribute_days + 1 do
      true ->
        record
        |> Enum.sort_by(&Datetime.to_date(&1.date), Date)
        |> Enum.map(& &1.count)

      false ->
        today = Datetime.today()
        return_count = abs(count) + 1
        empty_tuple = return_count |> repeat(0) |> List.to_tuple()

        Enum.reduce(record, empty_tuple, fn record, acc ->
          diff = Date.diff(Datetime.to_date(record.date), today)
          put_elem(acc, diff + abs(count), record.count)
        end)
        |> Tuple.to_list()
    end
  end
end
