defmodule GroupherServerWeb.Resolvers.CMS.Press do
  @moduledoc """
  Adapts Press configuration and publication fields to the CMS Press facade.

      GraphQL Press field -> this resolver -> CMS.Press facade
  """

  alias GroupherServer.CMS

  def press_config(_root, %{community: community}, _info) do
    CMS.press_config(community)
  end

  def update_press_config(
        _root,
        %{input: %{community: community} = input, command_id: command_id},
        %{
          context: %{cur_user: actor}
        }
      ) do
    input = Map.delete(input, :community)

    with {:ok, config} <- CMS.press_update_config(community, input, actor, command_id) do
      {:ok, %{config: config}}
    end
  end

  def press_article(_root, %{article: article_path}, _info) do
    with {:ok, article_path} <- CMS.parse_article_path(article_path) do
      CMS.press_article(article_path)
    end
  end

  def press_community_rss_feed(_root, %{community: community, input: input}, _info) do
    CMS.press_community_rss_feed(community, input)
  end

  def press_thread_rss_feed(
        _root,
        %{community: community, thread: thread, input: input},
        _info
      ) do
    CMS.press_thread_rss_feed(community, thread, input)
  end

  def press_site_manifest(_root, %{community: community}, _info) do
    CMS.press_site_manifest(community)
  end
end
