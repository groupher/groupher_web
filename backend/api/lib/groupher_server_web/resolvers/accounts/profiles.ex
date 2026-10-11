defmodule GroupherServerWeb.Resolvers.Accounts.Profiles do
  @moduledoc """
  Adapts profile GraphQL fields to public Accounts profile use cases.

      GraphQL profile field -> this resolver -> Accounts profile facade
  """
  import ShortMaps
  alias GroupherServer.Accounts

  def me(_root, _args, %{context: %{cur_user: cur_user}}) do
    {:ok, cur_user}
  end

  def me(_root, _args, _info) do
    {:ok, nil}
  end

  def user(_root, %{user: user}, %{context: %{cur_user: cur_user}}) do
    Accounts.profiles_read_user(user, cur_user)
  end

  def user(_root, %{user: user}, _info) do
    Accounts.profiles_read_user(user)
  end

  def user(_root, _args, _info) do
    {:error, GroupherServer.Accounts.profiles_error_cat_account_login("need user login name")}
  end

  def paged_users(_root, ~m(filter)a, %{context: %{cur_user: cur_user}}) do
    Accounts.profiles_paged_users(filter, cur_user)
  end

  def paged_users(_root, ~m(filter)a, _info) do
    Accounts.profiles_paged_users(filter)
  end

  def update_profile(_root, args, %{context: %{cur_user: cur_user}}) do
    profile =
      if Map.has_key?(args, :profile) do
        args.profile
      else
        %{}
      end

    profile =
      if Map.has_key?(args, :social) do
        Map.merge(profile, %{social: args.social})
      else
        profile
      end

    Accounts.profiles_update_profile(cur_user, profile)
  end

  def paged_published_articles(
        _root,
        %{user: user, filter: filter, thread: thread},
        %{context: context}
      ) do
    Accounts.publish_paged_articles(user, thread, filter, Map.get(context, :cur_user))
  end

  def paged_published_articles(_root, ~m(filter thread)a, %{context: %{cur_user: cur_user}}) do
    Accounts.publish_paged_articles(cur_user, thread, filter, cur_user)
  end

  def paged_published_comments(
        _root,
        %{user: user, filter: filter, thread: thread},
        %{context: context}
      ) do
    Accounts.publish_paged_comments(user, thread, filter, Map.get(context, :cur_user))
  end

  def paged_published_comments(_root, %{user: user, filter: filter}, %{context: context}) do
    Accounts.publish_paged_comments(user, filter, Map.get(context, :cur_user))
  end

  def moderatorable_communities(_root, %{user: user, filter: filter}, _info) do
    Accounts.achievements_paged_moderatorable_communities(user, filter)
  end

  def moderatorable_communities(_root, ~m(filter)a, %{context: %{cur_user: cur_user}}) do
    Accounts.achievements_paged_moderatorable_communities(cur_user, filter)
  end

  def subscribed_communities(_root, %{user: user, filter: filter}, _info) do
    Accounts.profiles_subscribed_communities(user, filter)
  end

  def subscribed_communities(_root, %{filter: filter}, _info) do
    Accounts.profiles_default_subscribed_communities(filter)
  end

  def search_users(_root, %{name: name}, _info) do
    Accounts.search_user(name)
  end
end
