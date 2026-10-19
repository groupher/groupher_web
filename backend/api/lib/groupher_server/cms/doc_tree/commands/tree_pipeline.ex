defmodule GroupherServer.CMS.DocTree.Commands.TreePipeline do
  @moduledoc """
  Shared declaration for DocTree node mutation pipelines.

      concrete DocTree Command
        -> TreePipeline-generated receipt or direct pipeline
        -> Gate + concrete tree_change callback
        -> TreeConfirmation or direct write result

  Concrete Command modules keep their named persistence callback while this
  macro fixes the common Gate, receipt confirmation, and replay stages. User
  entries call the receipt pipeline. Explicitly named internal entries call a
  separate internal pipeline; no missing actor is promoted to a system actor.
  """

  defmacro __using__(opts) do
    operation = Keyword.fetch!(opts, :operation)
    internal_operation = String.to_atom("#{operation}_internal")

    quote bind_quoted: [operation: operation, internal_operation: internal_operation] do
      alias GroupherServer.CMS
      alias CMS.DocTree.CommandReplay
      alias CMS.DocTree.Commands.{Support, TreeConfirmation}

      use GroupherServer.CommandPipeline,
        adapter: GroupherServer.CMS.CommandPipelineAdapter

      @pipeline operation: operation,
                confirmation: TreeConfirmation,
                target: :command_target,
                params: :command_params
      receipt_pipeline run_tree_receipt(
                         community,
                         target_id,
                         args,
                         actor,
                         command_id,
                         command_target,
                         command_params
                       ) do
        gate(fn _target ->
          CMS.Gate.check_in_transaction(actor, :manage_docs, community)
        end)

        change(fn canonical_community ->
          tree_change(canonical_community, target_id, Support.drop_command_id(args), actor)
        end)

        confirm(fn result ->
          target_key = "#{community.id}:#{target_id}"
          {:ok, %TreeConfirmation{data: CommandReplay.tree_confirmation(result, target_key)}}
        end)

        present(fn confirmation -> CommandReplay.replay_confirmation(confirmation) end)
      end

      @pipeline operation: internal_operation,
                access: :internal,
                target: :community,
                params: [:target_id, :args]
      direct_pipeline run_tree_internal(community, target_id, args, internal_actor) do
        gate(fn candidate ->
          CMS.Gate.check_in_transaction(:operations, :manage_docs, candidate)
        end)

        change(fn canonical_community ->
          tree_change(
            canonical_community,
            target_id,
            Support.drop_command_id(args),
            internal_actor
          )
        end)
      end

      def execute_tree_receipt(community, target_id, args, actor) do
        run_tree_receipt(
          community,
          target_id,
          args,
          actor,
          Support.option(args, :command_id),
          {:doc_tree, community.id},
          %{target_id: target_id, args: Support.canonical_args(args)}
        )
      end

      def execute_tree_internal(community, target_id, args, internal_actor) do
        run_tree_internal(community, target_id, args, internal_actor)
      end
    end
  end
end
