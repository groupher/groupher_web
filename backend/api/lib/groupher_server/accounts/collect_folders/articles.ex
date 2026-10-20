defmodule GroupherServer.Accounts.CollectFolders.Articles do
  @moduledoc """
  Paginates articles stored inside a collect folder.

  The folder owns binding-scoped entry rows; this module pages those rows first,
  then batch-resolves the public ArticleLite paths for the GraphQL layer.

  Business position:

      Accounts facade -> CollectFolders.Articles -> folder scope -> CMS article reads
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.CollectFolders.ErrorCat
  alias Accounts.Model.{CollectFolder, CollectFolderEntry, User}
  alias CMS.Model.{Article, ArticleBinding, Community}
  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @doc """
  Returns public articles stored inside a collection folder.

  ## Examples

      Accounts.CollectFolders.Articles.paged(folder_id, %{page: 1, size: 20})
  """
  @spec paged(T.id(), map()) :: T.domain_res(T.paged_data())
  def paged(folder_id, filter) do
    with {:ok, folder} <- ORM.find(CollectFolder, folder_id) do
      case folder.private do
        true -> {:error, ErrorCat.private_collect_folder("#{folder.title} is private")}
        false -> do_paged(folder, filter)
      end
    end
  end

  @doc """
  Returns folder articles after applying the viewer's privacy scope.

  ## Examples

      Accounts.CollectFolders.Articles.paged(folder_id, %{page: 1, size: 20}, viewer)
  """
  @spec paged(T.id(), map(), User.t()) :: T.domain_res(T.paged_data())
  def paged(folder_id, filter, %User{id: cur_user_id}) do
    with {:ok, folder} <- ORM.find(CollectFolder, folder_id) do
      is_valid_request = if folder.private, do: folder.user_id == cur_user_id, else: true

      case is_valid_request do
        false -> {:error, ErrorCat.private_collect_folder("#{folder.title} is private")}
        true -> do_paged(folder, filter)
      end
    end
  end

  defp do_paged(folder, filter) do
    page = Map.get(filter, :page, 1)
    size = Map.get(filter, :size, 20)

    query =
      from(entry in CollectFolderEntry,
        join: article in Article,
        on: article.id == entry.article_id,
        join: binding in ArticleBinding,
        on: binding.id == entry.article_binding_id and binding.visible == true,
        join: community in Community,
        on: community.id == binding.community_id,
        where: entry.folder_id == ^folder.id,
        select: %{
          path: %{
            community: community.slug,
            thread: article.thread,
            inner_id: binding.inner_id
          }
        }
      )

    query =
      case Map.get(filter, :thread) do
        thread when is_atom(thread) and not is_nil(thread) ->
          where(query, [entry, article, ...], article.thread == ^thread)

        _ ->
          query
      end

    with {:ok, order} <-
           Order.new(%{
             fields: [:inserted_at, :id],
             directions: [:desc, :desc],
             cursor_fields: [:inserted_at, :id]
           }),
         {:ok, page_result} <-
           ORM.pagi(
             query,
             %Params.Offset{page: page, size: size},
             for: CollectFolderEntry,
             order: order
           ),
         {:ok, entries} <- page_entries(page_result.entries) do
      page_result
      |> Page.to_legacy()
      |> Map.put(:entries, entries)
      |> done()
    end
  end

  defp page_entries(rows) do
    paths = Enum.map(rows, & &1.path)

    with {:ok, lite_rows} <- CMS.articles_lite_paths(paths) do
      rows_by_path =
        Map.new(lite_rows, fn row ->
          {{row.community.slug, row.thread, row.inner_id}, row}
        end)

      {:ok,
       Enum.flat_map(paths, fn path ->
         case Map.get(rows_by_path, {path.community, path.thread, path.inner_id}) do
           nil -> []
           row -> [row]
         end
       end)}
    end
  end
end
