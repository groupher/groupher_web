defmodule GroupherServerWeb.Resolvers.CMS.ArtimentMentions do
  @moduledoc """
  Adapts mention GraphQL locators to the ArtimentMentions facade.

      GraphQL mention field -> this resolver -> CMS.ArtimentMentions facade
  """

  alias GroupherServer.Pagi
  alias GroupherServer.CMS

  def trashed_article_mentioned_by(item, args, _info) do
    with {:ok, pagi} <- Pagi.from_input(Map.get(args, :pagi)) do
      CMS.artiment_mentions_mentioned_by(item.thread, item.article.id, pagi)
    end
  end

  def trashed_article_mentions(item, args, _info) do
    with {:ok, pagi} <- Pagi.from_input(Map.get(args, :pagi)) do
      CMS.artiment_mentions_mentions(item.thread, item.article.id, pagi)
    end
  end

  def mentions(_root, %{source: source} = args, _info) do
    with {:ok, pagi} <- Pagi.from_input(Map.get(args, :pagi)) do
      CMS.artiment_mentions_mentions(source, pagi)
    end
  end

  def mentioned_by(_root, %{target: target} = args, _info) do
    with {:ok, pagi} <- Pagi.from_input(Map.get(args, :pagi)) do
      CMS.artiment_mentions_mentioned_by(target, pagi)
    end
  end
end
