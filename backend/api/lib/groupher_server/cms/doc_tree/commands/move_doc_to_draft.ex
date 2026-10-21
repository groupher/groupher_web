defmodule GroupherServer.CMS.DocTree.Commands.MoveDocToDraft do
  @moduledoc """
  Moves one public Docs page back to Draft visibility.

      CMS.DocTree.move_doc_to_draft
        -> MoveDocToDraft.execute
        -> command support -> DocTree.Publish -> Docs editor head
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Publish}
  alias CMS.DocTree.Commands.MoveDocToDraftConfirmation, as: Confirmation

  @pipeline operation: :doc_move_to_draft,
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
    prepare(fn -> Publish.prepare_move_doc_to_draft(community, id, user, opts) end)

    gate(fn %{article: article, branch: branch} = prepared ->
      with {:ok, canonical_community} <-
             CMS.Gate.check_in_transaction(user, :manage_docs, community),
           {:ok, canonical_article} <-
             CMS.Gate.check_in_transaction(user, :edit, article, canonical_community, branch.id) do
        {:ok, %{prepared | community: canonical_community, article: canonical_article}}
      end
    end)

    change(fn prepared -> Publish.move_doc_to_draft_after_gate(prepared) end)

    confirm(fn draft -> {:ok, %Confirmation{data: %{"article_id" => draft.article_id}}} end)

    present(fn %Confirmation{data: %{"article_id" => article_id}} ->
      CMS.Docs.read_editor_head(community, article_id, opts)
    end)
  end

  @pipeline operation: :doc_move_to_draft_write, target: :community, params: [:id, :opts]
  direct_pipeline run_direct(community, id, user, opts) do
    prepare(fn -> Publish.prepare_move_doc_to_draft(community, id, user, opts) end)

    gate(fn %{article: article, branch: branch} = prepared ->
      with {:ok, canonical_community} <-
             CMS.Gate.check_in_transaction(user, :manage_docs, community),
           {:ok, canonical_article} <-
             CMS.Gate.check_in_transaction(user, :edit, article, canonical_community, branch.id) do
        {:ok, %{prepared | community: canonical_community, article: canonical_article}}
      end
    end)

    change(fn prepared -> Publish.move_doc_to_draft_after_gate(prepared) end)
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
