defmodule GroupherServer.CMS.DocTree.Commands.UpdateDraft do
  @moduledoc """
  Updates the Draft content associated with one Docs page.

      CMS.DocTree.update_draft
        -> UpdateDraft.execute
        -> command support -> Persist.update_draft -> DraftResult
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.CMS
  alias CMS.DocTree.{Commands.Support, Persist}
  alias CMS.DocTree.Commands.NodeDraftConfirmation, as: Confirmation
  alias CMS.Model.Article

  @pipeline operation: :doc_update_draft,
            confirmation: Confirmation,
            target: :command_target,
            params: :command_params
  receipt_pipeline run_receipt(
                     community,
                     id,
                     args,
                     user,
                     command_id,
                     command_target,
                     command_params
                   ) do
    gate(fn _target -> CMS.Gate.check_in_transaction(user, :manage_docs, community) end)

    change(fn canonical_community ->
      Persist.update_draft(canonical_community, id, Support.drop_command_id(args), user)
    end)

    confirm(fn draft ->
      {:ok, %Confirmation{data: confirmation_data(draft, Support.option(args, :command_id))}}
    end)

    present(fn confirmation -> present_confirmation(confirmation) end)
  end

  @pipeline operation: :doc_tree_update_draft_write,
            target: :community,
            params: [:id, :args]
  direct_pipeline run_direct(community, id, args, user) do
    gate(fn candidate -> CMS.Gate.check_in_transaction(user, :manage_docs, candidate) end)

    change(fn canonical_community ->
      Persist.update_draft(canonical_community, id, Support.drop_command_id(args), user)
    end)

    present(fn draft ->
      present_confirmation(%Confirmation{
        data: confirmation_data(draft, Support.option(args, :command_id))
      })
    end)
  end

  def execute(community, %Article{thread: :doc} = article, args, user) do
    execute(community, article.id, args, user)
  end

  def execute(community, id, args, user) do
    run_receipt(
      community,
      id,
      args,
      user,
      Support.option(args, :command_id),
      {:doc, community.id},
      %{id: id, opts: Support.canonical_args(args)}
    )
  end

  @doc false
  def execute_direct(community, id, args, user), do: run_direct(community, id, args, user)

  defp present_confirmation(%Confirmation{} = confirmation) do
    CMS.Docs.DraftResult.build(confirmation)
  end

  defp confirmation_data(draft, command_id) do
    %{
      "article_id" => draft.article_id,
      "community_id" => draft.community_id,
      "branch_id" => draft.branch_id,
      "version" => draft.version,
      "title" => draft.title,
      "subtitle" => draft.subtitle,
      "slug" => draft.slug,
      "digest" => draft.digest,
      "content_hash" => draft.content_hash,
      "updated_at" => DateTime.to_iso8601(draft.updated_at),
      "command_id" => command_id
    }
  end
end
