defmodule GroupherServer.Accounts.CollectFolders.Commands.Remove do
  @moduledoc """
  Removes an article from a collection folder through the shared pipeline
  runner, with explicit direct and retry-safe Receipt entries.

      collect remove -> pipeline runner -> CMS Receipt -> Accounts writes
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.CollectFolders.{MembershipConfirmation, Persist}
  alias Accounts.Model.User
  alias Helper.ORM

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  @pipeline operation: :collect_remove,
            access: :open,
            target: :article,
            params: [:folder_id],
            confirmation: MembershipConfirmation

  receipt_pipeline execute_receipt(article, folder_id, user, command_id) do
    change(fn _article ->
      with {:ok, prepared} <- Persist.prepare_remove(article, folder_id, user) do
        apply_remove(prepared, article, user, command_id)
      end
    end)

    confirm(fn folder -> confirmation(folder, article, folder_id, :remove) end)
    present(fn confirmation -> present_confirmation(confirmation, command_id) end)
  end

  @pipeline operation: :collect_remove_direct,
            access: :open,
            target: :article,
            params: [:folder_id]

  direct_pipeline execute_direct(article, folder_id, user) do
    prepare(fn -> prepare_remove(article, folder_id, user, Ecto.UUID.generate()) end)
    change(fn prepared -> apply_remove(prepared, article, user, prepared.command_id) end)
    present(fn folder -> {:ok, %{folder: folder, command_id: nil}} end)
  end

  @doc """
  Runs the non-replayable Accounts facade path.

  ## Examples

      Accounts.CollectFolders.Commands.Remove.run_direct(article, folder_id, user)
  """
  @spec run_direct(struct(), term(), User.t()) :: {:ok, map()} | {:error, term()}
  def run_direct(article, folder_id, %User{} = user),
    do: execute_direct(article, folder_id, user)

  @doc """
  Runs the retry-safe Receipt facade path.

  ## Examples

      Accounts.CollectFolders.Commands.Remove.run_receipt(article, folder_id, user, command_id)
  """
  @spec run_receipt(struct(), term(), User.t(), String.t()) :: {:ok, map()} | {:error, term()}
  def run_receipt(article, folder_id, %User{} = user, command_id),
    do: execute_receipt(article, folder_id, user, command_id)

  defp prepare_remove(article, folder_id, user, command_id) do
    with {:ok, prepared} <- Persist.prepare_remove(article, folder_id, user) do
      {:ok, Map.put(prepared, :command_id, command_id)}
    end
  end

  defp apply_remove(prepared, article, user, command_id) do
    with {:ok, article_collect} <- CMS.interactions_persist_find_collect(article, user),
         {:ok, _canonical} <- maybe_undo_collect(article, user, command_id, article_collect),
         {:ok, folder} <-
           Persist.remove_in_transaction(article_collect, prepared.folder, prepared.thread),
         {:ok, _detached} <- maybe_detach_collect(article_collect, folder) do
      {:ok, folder}
    end
  end

  defp maybe_undo_collect(article, user, command_id, article_collect) do
    if length(article_collect.collect_folders) <= 1 do
      CMS.interactions_undo_collect(article, user, command_id)
    else
      {:ok, :pass}
    end
  end

  defp maybe_detach_collect(article_collect, folder) do
    if length(article_collect.collect_folders) > 1 do
      CMS.interactions_persist_detach_collect_folder(article_collect, folder)
    else
      {:ok, :pass}
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

  defp present_confirmation(%MembershipConfirmation{data: data}, command_id) do
    with {:ok, folder} <- ORM.find(Accounts.Model.CollectFolder, data["folder_id"]) do
      {:ok, %{folder: folder, command_id: command_id}}
    end
  end
end
