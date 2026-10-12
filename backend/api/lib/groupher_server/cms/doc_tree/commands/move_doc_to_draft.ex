defmodule GroupherServer.CMS.DocTree.Commands.MoveDocToDraft do
  @moduledoc """
  Moves one public Docs page back to Draft visibility.

      CMS.DocTree.move_doc_to_draft
        -> MoveDocToDraft.execute
        -> command support -> DocTree.Publish -> Docs editor head
  """

  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Publish}
  alias CMS.DocTree.Commands.MoveDocToDraftConfirmation, as: Confirmation

  def execute(community, id, user, opts) do
    execute = fn ->
      with {:ok, draft} <- Publish.move_doc_to_draft(community, id, user, opts) do
        {:ok, %Confirmation{data: %{"article_id" => draft.article_id}}}
      end
    end

    present = fn %Confirmation{data: %{"article_id" => article_id}} ->
      CMS.Docs.read_editor_head(community, article_id, opts)
    end

    if Support.has_option?(opts, :command_id) do
      Support.run_doc_command(
        community,
        id,
        user,
        :doc_move_to_draft,
        opts,
        Confirmation,
        execute,
        present
      )
    else
      Support.run_doc_operation(opts, execute, present)
    end
  end
end
