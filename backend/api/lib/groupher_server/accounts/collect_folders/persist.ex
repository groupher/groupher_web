defmodule GroupherServer.Accounts.CollectFolders.Persist do
  @moduledoc """
  Owns collection-folder and membership persistence primitives.

  The module validates and builds row operations, but never opens a
  transaction. Commands own the transaction around folder, collect and embed
  updates.

      CollectFolders command
          -> folder / ArticleCollect row primitives
          -> committed folder membership
  """

  import GroupherServer.FrontDesk, only: [thread_of: 1]
  import ShortMaps

  alias Ecto.Multi
  alias GroupherServer.{Accounts, CMS, Repo}
  alias Accounts.CollectFolders.ErrorCat
  alias Accounts.Model.{CollectFolder, Embeds, User}
  alias CMS.Model.ArticleCollect
  alias Helper.{Datetime, ORM, T}

  @default_meta Embeds.CollectFolderMeta.default_meta()

  @doc """
  Creates one user-owned collection folder.

  ## Examples

      Accounts.CollectFolders.Persist.create(%{title: "Reading list"}, user)
  """
  @spec create(map(), User.t()) :: T.domain_res(CollectFolder.t())
  def create(%{title: title} = attrs, %User{id: user_id}) do
    case ORM.find_by(CollectFolder, ~m(user_id title)a) do
      {:error, _} ->
        last_updated = Datetime.today() |> Datetime.to_datetime()

        attrs =
          Map.merge(%{user_id: user_id, last_updated: last_updated, meta: @default_meta}, attrs)

        ORM.create(CollectFolder, attrs)

      {:ok, folder} ->
        {:error, ErrorCat.already_exist("#{folder.title} already exists")}
    end
  end

  @doc """
  Updates editable folder fields and its last-updated date.

  ## Examples

      Accounts.CollectFolders.Persist.update(folder_id, %{title: "Read later"})
  """
  @spec update(T.id(), map()) :: T.domain_res(CollectFolder.t())
  def update(folder_id, attrs) do
    with {:ok, folder} <- ORM.find(CollectFolder, folder_id) do
      last_updated = Datetime.today() |> Datetime.to_datetime()
      ORM.update(folder, Map.merge(~m(last_updated)a, attrs))
    end
  end

  @doc """
  Deletes an empty collection folder.

  ## Examples

      Accounts.CollectFolders.Persist.delete(folder_id)
  """
  @spec delete(T.id()) :: T.domain_res(CollectFolder.t())
  def delete(id) do
    with {:ok, folder} <- ORM.find(CollectFolder, id) do
      case Enum.empty?(folder.collects) do
        true -> ORM.find_delete!(CollectFolder, id)
        false -> {:error, ErrorCat.delete_no_empty_collect_folder("#{folder.title} is not empty")}
      end
    end
  end

  @doc """
  Validates ownership and returns the canonical folder for adding an article.

  ## Examples

      Accounts.CollectFolders.Persist.prepare_add(article, folder_id, user)
  """
  @spec prepare_add(struct(), T.id(), User.t()) :: {:ok, map()} | {:error, term()}
  def prepare_add(article, folder_id, %User{} = user) do
    with {:ok, thread} <- thread_of(article),
         {:ok, folder} <- ORM.find(CollectFolder, folder_id),
         {:ok, :pass} <- article_not_in_folder(article, folder.collects),
         true <- user.id == folder.user_id do
      {:ok, %{thread: thread, folder: folder}}
    else
      false -> {:error, ErrorCat.private_collect_folder("folder does not belong to user")}
      error -> error
    end
  end

  @doc """
  Validates ownership and returns the canonical folder for removing an article.

  ## Examples

      Accounts.CollectFolders.Persist.prepare_remove(article, folder_id, user)
  """
  @spec prepare_remove(struct(), T.id(), User.t()) :: {:ok, map()} | {:error, term()}
  def prepare_remove(article, folder_id, %User{} = user) do
    with {:ok, thread} <- thread_of(article),
         {:ok, folder} <- ORM.find(CollectFolder, folder_id),
         true <- user.id == folder.user_id do
      {:ok, %{thread: thread, folder: folder}}
    else
      false -> {:error, ErrorCat.private_collect_folder("folder does not belong to user")}
      error -> error
    end
  end

  @doc """
  Builds the add-membership persistence steps for a caller-owned transaction.

  The ArticleCollect fact must already have been ensured by the command.

  ## Examples

      Accounts.CollectFolders.Persist.add_multi(article_collect, folder, thread)
  """
  @spec add_multi(ArticleCollect.t(), CollectFolder.t(), atom()) :: Ecto.Multi.t()
  def add_multi(%ArticleCollect{} = article_collect, folder, thread) do
    Multi.new()
    |> Multi.run(:add_to_collect_folder, fn _, _ ->
      collects = [article_collect | folder.collects]
      update_folder_meta(thread, collects, folder)
    end)
  end

  @doc """
  Builds the remove-membership persistence steps for a caller-owned transaction.

  ## Examples

      Accounts.CollectFolders.Persist.remove_multi(article_collect, folder, thread)
  """
  @spec remove_multi(ArticleCollect.t(), CollectFolder.t(), atom()) :: Ecto.Multi.t()
  def remove_multi(%ArticleCollect{} = article_collect, folder, thread) do
    Multi.new()
    |> Multi.run(:rm_from_collect_folder, fn _, _ ->
      collects = Enum.reject(folder.collects, &(&1.id == article_collect.id))
      update_folder_meta(thread, collects, folder)
    end)
  end

  defp article_not_in_folder(article, collects) do
    with {:ok, thread} <- thread_of(article),
         {:ok, info} <- CMS.artiment_matcher_match(thread) do
      already_collected =
        Enum.any?(collects, fn collect -> article.id == Map.get(collect, info.foreign_key) end)

      if already_collected do
        {:error, ErrorCat.already_collected_in_folder("already collected in this folder")}
      else
        {:ok, :pass}
      end
    end
  end

  defp update_folder_meta(thread, collects, folder) do
    total_count = length(collects)
    last_updated = Datetime.today() |> Datetime.to_datetime()
    thread_count = Enum.count(collects, &(&1.thread == thread))

    meta =
      folder.meta
      |> Map.merge(%{"has_#{thread}": thread_count > 0})
      |> Map.merge(%{"#{thread}_count": thread_count})

    with {:ok, folder} <- ORM.update_meta(folder, meta) do
      folder
      |> Ecto.Changeset.change(%{total_count: total_count, last_updated: last_updated})
      |> Ecto.Changeset.put_embed(:collects, collects)
      |> Repo.update()
    end
  end
end
