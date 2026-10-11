defmodule GroupherServer.Analysis.Contribution.Effects do
  @moduledoc """
  Owns contribution cache scheduling and user cache revalidation.

      committed contribution projection
          -> Effects
          -> cache / FrontDesk delivery
  """

  alias GroupherServer.{CMS, Accounts}

  alias GroupherServer.{Analysis, FrontDesk}
  alias Analysis.Contribution.Query
  alias Accounts.Model.User
  alias CMS.Model.Community
  alias Helper.Later

  @doc """
  Revalidates a user's FrontDesk cache after contribution commit.

  ## Examples

      Analysis.Contribution.Effects.revalidate_user(user)
  """
  @spec revalidate_user(User.t()) :: {:ok, :pass}
  def revalidate_user(%User{login: login}) when is_binary(login) do
    FrontDesk.revalidate_user(login)
    {:ok, :pass}
  end

  def revalidate_user(%User{}), do: {:ok, :pass}

  @doc """
  Schedules a rebuild of a community contribution cache after commit.

  ## Examples

      Analysis.Contribution.Effects.cache_community_later(community)
  """
  @spec cache_community_later(Community.t()) :: {:ok, term()}
  def cache_community_later(%Community{} = community) do
    Later.run({Query, :get_contributes_then_cache, [community]})
  end
end
