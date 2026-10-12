defmodule GroupherServer.Analysis.Contribution.Effects do
  @moduledoc """
  Owns contribution cache scheduling and user cache revalidation.

      committed contribution projection
          -> Effects
          -> cache / FrontDesk delivery
  """

  alias GroupherServer.{CMS, Accounts}

  alias GroupherServer.{Analysis, FrontDesk, Jobs}
  alias Accounts.Model.User
  alias CMS.Model.Community

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
    Jobs.contribution_cache(community.id)
  end

  @doc """
  Reloads a Community and rebuilds its contribution cache for a typed Worker.

  ## Examples

      Effects.refresh_community(community_id)
  """
  def refresh_community(community_id) when is_integer(community_id) do
    with {:ok, community} <- CMS.front_desk_community(community_id, mode: :internal) do
      Analysis.Contribution.get_contributes_then_cache(community)
    end
  end
end
