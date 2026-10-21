defmodule GroupherServerWeb.Resolvers.Accounts.Relationships do
  @moduledoc """
  Adapts relationship and collection GraphQL fields to their Accounts owners.

      GraphQL relationship field -> this resolver -> Accounts relationship/collect facade
  """
  alias GroupherServer.Accounts
  alias Helper.ORM.Pagi.Params

  def follow(_root, %{user: user}, %{context: %{cur_user: cur_user}}) do
    Accounts.fans_follow(cur_user, user)
  end

  def undo_follow(_root, %{user: user}, %{context: %{cur_user: cur_user}}) do
    Accounts.fans_undo_follow(cur_user, user)
  end

  def paged_followers(_root, %{user: user} = args, %{context: context}) do
    with {:ok, pagi} <- Params.from_input(Map.get(args, :pagi)) do
      Accounts.fans_paged_followers(
        user,
        Map.get(args, :filter) || %{},
        pagi,
        Map.get(context, :cur_user)
      )
    end
  end

  def paged_followings(_root, %{user: user} = args, %{context: context}) do
    with {:ok, pagi} <- Params.from_input(Map.get(args, :pagi)) do
      Accounts.fans_paged_followings(
        user,
        Map.get(args, :filter) || %{},
        pagi,
        Map.get(context, :cur_user)
      )
    end
  end

  def paged_upvoted_articles(_root, %{user: user} = args, _info) do
    with {:ok, pagi} <- Params.from_input(Map.get(args, :pagi)) do
      Accounts.upvotes_paged_articles(user, Map.get(args, :filter) || %{}, pagi)
    end
  end

  def create_collect_folder(_root, attrs, %{context: %{cur_user: cur_user}}) do
    Accounts.collect_folders_create(attrs, cur_user)
  end

  def update_collect_folder(_root, %{id: id} = attrs, _) do
    Accounts.collect_folders_update(id, attrs)
  end

  def delete_collect_folder(_root, %{id: id}, _) do
    Accounts.collect_folders_delete(id)
  end

  def add_to_collect(_root, %{article: article, folder_id: folder_id} = args, %{
        context: %{cur_user: cur_user}
      }) do
    Accounts.collect_folders_add_result(article, folder_id, cur_user, Map.get(args, :command_id))
  end

  def remove_from_collect(_root, %{article: article, folder_id: folder_id} = args, %{
        context: %{cur_user: cur_user}
      }) do
    Accounts.collect_folders_remove_result(
      article,
      folder_id,
      cur_user,
      Map.get(args, :command_id)
    )
  end

  def paged_collect_folders(_root, %{user: user} = args, %{context: context}) do
    with {:ok, pagi} <- Params.from_input(Map.get(args, :pagi)) do
      Accounts.collect_folders_paged(
        user,
        Map.get(args, :filter) || %{},
        pagi,
        Map.get(context, :cur_user)
      )
    end
  end

  def paged_collected_articles(_root, %{folder_id: folder_id} = args, %{context: context}) do
    with {:ok, pagi} <- Params.from_input(Map.get(args, :pagi)) do
      Accounts.collect_folders_paged_articles(
        folder_id,
        Map.get(args, :filter) || %{},
        pagi,
        Map.get(context, :cur_user)
      )
    end
  end
end
