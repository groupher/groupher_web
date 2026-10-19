defmodule GroupherServer.CMS.DocTree.Commands.MoveSubtreeToDraft do
  @moduledoc """
  Creates Drafts for every published Page in one subtree.

      CMS.DocTree.move_subtree_to_draft
        -> MoveSubtreeToDraft.execute
        -> command support -> DocTree.Publish -> replay result
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.CMS

  alias CMS.DocTree.{CommandReplay, Commands.Support, Publish}
  alias CMS.DocTree.Commands.MoveSubtreeToDraftConfirmation, as: Confirmation

  @pipeline operation: :doc_move_subtree_to_draft,
            confirmation: Confirmation,
            target: :command_target,
            params: :command_params
  receipt_pipeline run_receipt(
                     community,
                     id,
                     user,
                     opts,
                     command_id,
                     command_target,
                     command_params
                   ) do
    gate(fn _target -> CMS.Gate.check_in_transaction(user, :manage_docs, community) end)

    change(fn canonical_community ->
      Publish.move_subtree_to_draft(canonical_community, id, user, opts)
    end)

    confirm(fn result ->
      {:ok, %Confirmation{data: CommandReplay.subtree_confirmation(result)}}
    end)

    present(fn confirmation -> CommandReplay.replay_subtree_confirmation(confirmation) end)
  end

  @pipeline operation: :doc_move_subtree_to_draft_write,
            target: :community,
            params: [:id, :opts]
  direct_pipeline run_direct(community, id, user, opts) do
    gate(fn candidate -> CMS.Gate.check_in_transaction(user, :manage_docs, candidate) end)
    change(fn canonical -> Publish.move_subtree_to_draft(canonical, id, user, opts) end)
  end

  def execute(community, id, user, opts) do
    run_receipt(
      community,
      id,
      user,
      opts,
      Support.option(opts, :command_id),
      {:doc, community.id},
      %{id: id, opts: Support.canonical_args(opts)}
    )
  end

  def execute_direct(community, id, user, opts), do: run_direct(community, id, user, opts)
end
