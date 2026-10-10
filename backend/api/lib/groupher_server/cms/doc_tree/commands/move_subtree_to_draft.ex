defmodule GroupherServer.CMS.DocTree.Commands.MoveSubtreeToDraft do
  @moduledoc """
  Creates Drafts for every published Page in one subtree.

      CMS.DocTree.move_subtree_to_draft
        -> MoveSubtreeToDraft.execute
        -> command support -> DocTree.Publish -> replay result
  """

  alias GroupherServer.CMS.DocTree.{CommandReplay, Commands.Support, Publish}
  alias GroupherServer.CMS.DocTree.Commands.MoveSubtreeToDraftConfirmation, as: Confirmation

  def execute(community, id, user, opts) do
    execute = fn ->
      with {:ok, result} <- Publish.move_subtree_to_draft(community, id, user, opts) do
        {:ok, %Confirmation{data: CommandReplay.subtree_confirmation(result)}}
      end
    end

    if Support.has_option?(opts, :command_id) do
      Support.run_doc_command(
        community,
        id,
        user,
        :doc_move_subtree_to_draft,
        opts,
        Confirmation,
        execute,
        &CommandReplay.replay_subtree_confirmation/1
      )
    else
      Support.run_doc_operation(opts, execute, &CommandReplay.replay_subtree_confirmation/1)
    end
  end
end
