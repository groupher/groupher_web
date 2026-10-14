defmodule GroupherServer.Accounts.CollectFolders.Commands.Add do
  @moduledoc """
  Owns the collect-folder add command and its Receipt confirmation.

      Add command
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
  Adds an Article to a folder and returns the mutation payload.

  ## Examples

      Accounts.CollectFolders.Commands.Add.run(article, folder_id, user, command_id)
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
      operation: :collect_add,
      target: article,
      params: %{folder_id: folder_id}
    }

    with {:ok, %MembershipConfirmation{data: data}} <-
           GroupherServer.CMS.command_execute(command,
             action: fn context ->
               with {:ok, folder} <- transaction(article, folder_id, user, context.command_id) do
                 confirmation(folder, article, folder_id, :add)
               end
             end,
             confirmation: MembershipConfirmation
           ),
         {:ok, folder} <- ORM.find(Accounts.Model.CollectFolder, data["folder_id"]) do
      {:ok, %{folder: folder, command_id: command_id}}
    end
  end

  defp transaction(article, folder_id, user, command_id) do
    with {:ok, %{thread: thread, folder: folder}} <- Persist.prepare_add(article, folder_id, user) do
      multi =
        Multi.new()
        |> Multi.run(:add_article_collect, fn _, _ ->
          with {:ok, _canonical} <- CMS.interactions_collect(article, user, command_id) do
            GroupherServer.CMS.interactions_persist_find_collect(article, user)
          end
        end)
        |> Multi.merge(fn %{add_article_collect: article_collect} ->
          Persist.add_multi(article_collect, folder, thread)
        end)
        |> Multi.run(
          :attach_article_collect_folder,
          fn _, %{add_article_collect: article_collect, add_to_collect_folder: folder} ->
            GroupherServer.CMS.interactions_persist_attach_collect_folder(article_collect, folder)
          end
        )

      case Repo.transaction(multi) do
        {:ok, %{add_to_collect_folder: folder}} -> {:ok, folder}
        {:error, _step, reason, _steps} -> {:error, reason}
      end
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
