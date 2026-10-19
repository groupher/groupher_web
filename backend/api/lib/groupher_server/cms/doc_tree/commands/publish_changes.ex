defmodule GroupherServer.CMS.DocTree.Commands.PublishChanges do
  @moduledoc """
  Publishes selected Docs changes under an optional stable command id.

      CMS.DocTree.publish_changes
        -> PublishChanges.execute
        -> CMS.Command when command_id exists -> DocTree.Publish
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.CMS
  alias CMS.Command.Receipt.Key, as: CommandKey
  alias CMS.DocTree.{Commands.Support, Publish}
  alias CMS.DocTree.Commands.PublishChangesConfirmation, as: Confirmation

  @pipeline operation: :doc_publish_changes,
            confirmation: Confirmation,
            target: :command_target,
            params: :params
  receipt_pipeline run_receipt(
                     community,
                     params,
                     user,
                     publish_opts,
                     command_id,
                     command_target
                   ) do
    gate(fn _target -> CMS.Gate.check_in_transaction(user, :manage_docs, community) end)

    change(fn canonical_community ->
      Publish.publish_after_gate(
        canonical_community,
        params,
        user,
        Keyword.put(publish_opts, :causation_id, command_id)
      )
    end)

    confirm(fn result ->
      {:ok,
       %Confirmation{
         data: %{
           "release_id" => if(result.release, do: to_string(result.release.id), else: nil),
           "done" => true
         }
       }}
    end)

    present(fn confirmation -> present(confirmation, community, params) end)
  end

  @pipeline operation: :doc_publish_changes_write,
            target: :community,
            params: [:params, :publish_opts]
  direct_pipeline run_direct(community, params, user, publish_opts) do
    gate(fn candidate ->
      CMS.Gate.check_in_transaction(user, :manage_docs, candidate)
    end)

    change(fn canonical_community ->
      Publish.publish_after_gate(canonical_community, params, user, publish_opts)
    end)
  end

  def execute(community, args, user, opts) do
    params = Support.drop_command_id(args)
    publish_opts = Support.drop_command_id(opts)

    with {:ok, command_id} <- CommandKey.validate(Support.option(opts, :command_id)),
         %GroupherServer.Accounts.Model.User{} <- user do
      execute_command(community, params, user, publish_opts, command_id)
    else
      {:error, _reason} = error -> error
      _ -> {:error, :command_actor_required}
    end
  end

  @doc false
  def execute_direct(community, args, %GroupherServer.Accounts.Model.User{} = user, opts) do
    run_direct(community, Support.drop_command_id(args), user, Support.drop_command_id(opts))
  end

  defp execute_command(community, params, user, publish_opts, command_id) do
    run_receipt(
      community,
      params,
      user,
      publish_opts,
      command_id,
      {:doc_branch, community.id}
    )
  end

  defp present(%Confirmation{data: data}, community, args) do
    case Publish.checklist(community, args) do
      {:error, reason} ->
        {:error, reason}

      checklist ->
        {:ok,
         %{
           done: true,
           release: release(data["release_id"]),
           checklist: checklist,
           scope: %{total_count: checklist.total_count}
         }}
    end
  end

  defp release(nil), do: nil

  defp release(release_id) do
    case CMS.Docs.Store.publish_release(release_id) do
      {:ok, release} -> release
      {:error, _reason} -> nil
    end
  end
end
