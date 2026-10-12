defmodule GroupherServer.Accounts.CollectFolders.Commands.Remove do
  @moduledoc """
  Owns the collect-folder remove command and its Receipt confirmation.

      Remove command
          -> CMS.Interactions command
          -> Persist
          -> folder membership transaction
          -> CMS collect Confirmation
  """

  alias Ecto.Multi
  alias GroupherServer.{Accounts, CMS, Repo}
  alias Accounts.CollectFolders.{Persist, MembershipConfirmation}
  alias Accounts.Model.User
  alias CMS.Command

  alias Helper.ORM

  @doc """
  Removes an Article from a folder and returns the mutation payload.

  ## Examples

      Accounts.CollectFolders.Commands.Remove.run(article, folder_id, user, command_id)
  """
  @spec run(struct(), term(), User.t(), String.t() | nil) :: {:ok, map()} | {:error, term()}
  def run(article, folder_id, %User{} = user, nil) do
    generated_command_id = Ecto.UUID.generate()

    with {:ok, folder} <- transaction(article, folder_id, user, generated_command_id) do
      {:ok, %{folder: folder, command_id: nil}}
    end
  end

  def run(article, folder_id, %User{} = user, command_id) do
    command = %Command{
      actor: user,
      command_id: command_id,
      operation: :collect_remove,
      target: article,
      params: %{folder_id: folder_id}
    }

    with {:ok, %MembershipConfirmation{data: data}} <-
           GroupherServer.CMS.command_execute(command,
             action: fn context ->
               with {:ok, folder} <- transaction(article, folder_id, user, context.command_id) do
                 confirmation(folder, article, folder_id, :remove)
               end
             end,
             confirmation: MembershipConfirmation
           ),
         {:ok, folder} <- ORM.find(Accounts.Model.CollectFolder, data["folder_id"]) do
      {:ok, %{folder: folder, command_id: command_id}}
    end
  end

  defp transaction(article, folder_id, user, command_id) do
    with {:ok, %{thread: thread, folder: folder}} <-
           Persist.prepare_remove(article, folder_id, user) do
      multi =
        Multi.new()
        |> Multi.run(:remove_article_collect, fn _, _ ->
          with {:ok, article_collect} <-
                 GroupherServer.CMS.interactions_persist_find_collect(article, user) do
            remove_collect(article, user, command_id, article_collect)
          end
        end)
        |> Multi.merge(fn %{remove_article_collect: %{article_collect: article_collect}} ->
          Persist.remove_multi(article_collect, folder, thread)
        end)
        |> Multi.run(
          :detach_article_collect_folder,
          fn _,
             %{
               remove_article_collect: %{article_collect: article_collect, detach?: detach?}
             } ->
            if detach? do
              GroupherServer.CMS.interactions_persist_detach_collect_folder(
                article_collect,
                folder
              )
            else
              {:ok, :pass}
            end
          end
        )

      case Repo.transaction(multi) do
        {:ok, %{rm_from_collect_folder: folder}} -> {:ok, folder}
        {:error, _step, reason, _steps} -> {:error, reason}
      end
    end
  end

  defp remove_collect(article, user, command_id, article_collect) do
    if length(article_collect.collect_folders) <= 1 do
      with {:ok, _canonical} <- CMS.interactions_undo_collect(article, user, command_id) do
        {:ok, %{article_collect: article_collect, detach?: false}}
      end
    else
      {:ok, %{article_collect: article_collect, detach?: true}}
    end
  end

  defp confirmation(folder, article, folder_id, operation) do
    {:ok,
     %MembershipConfirmation{
       data: %{
         "folder_id" => to_string(folder_id),
         "article_id" => to_string(article.id),
         "operation" => Atom.to_string(operation),
         "total_count" => folder.total_count
       }
     }}
  end
end
