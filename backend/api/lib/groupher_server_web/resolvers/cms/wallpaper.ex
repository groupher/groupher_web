defmodule GroupherServerWeb.Resolvers.CMS.Wallpaper do
  @moduledoc """
  Adapts wallpaper GraphQL configuration fields to the CMS wallpaper facade.

      GraphQL wallpaper field -> this resolver -> CMS.Wallpaper facade
  """

  alias GroupherServer.Accounts

  alias GroupherServer.CMS
  alias Accounts.Model.User
  alias CMS.Model.Community

  def publish_wallpaper(
        _root,
        %{community: %Community{} = community, input: input},
        %{context: %{cur_user: %User{} = user}}
      ) do
    CMS.wallpaper_publish(community, input, user)
  end

  def prepare_wallpaper_upload(
        _root,
        %{community: %Community{} = community, input: input},
        %{context: %{cur_user: %User{} = user}}
      ) do
    CMS.wallpaper_prepare_upload(community, input, user)
  end

  def restore_wallpaper_snapshot(
        _root,
        %{community: %Community{} = community, input: input},
        %{context: %{cur_user: %User{} = user}}
      ) do
    CMS.wallpaper_restore_snapshot(community, input, user)
  end
end
