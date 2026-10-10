defmodule GroupherServer.CMS.DocTree.Effects do
  @moduledoc """
  Owns DocTree activity and post-commit invalidation intents.

      DocTree command/workflow
        -> tree facts and release state
        -> DocTree.Effects intent
        -> Activity / Outbox worker delivery
  """

  alias GroupherServer.{Activity, CMS}
  alias CMS.Model.Community

  @doc "Records one DocTree activity while the caller owns the transaction."
  def activity(resource, event, opts), do: Activity.log(resource, event, opts)

  @doc "Records the community cache invalidation intent for a committed DocTree change."
  def enqueue_invalidation(%Community{} = community, opts) when is_list(opts) do
    with {:ok, identity} <- outbox_identity(opts),
         {:ok, _event} <-
           CMS.Outbox.send(%{
             event: "doc_tree.changed",
             worker: CMS.Outbox.Workers.Community.Cleanup,
             resource_type: "community",
             resource_id: community.id,
             identity: identity,
             effect_key: "doc-tree:#{Keyword.get(opts, :effect_key, "changed")}",
             data: %{community: community.slug, community_id: community.id}
           }) do
      {:ok, :pass}
    end
  end

  defp outbox_identity(opts) do
    case Keyword.get(opts, :causation_id) || Keyword.get(opts, :command_id) do
      command_id when is_binary(command_id) ->
        case Ecto.UUID.cast(command_id) do
          {:ok, command_id} -> {:ok, {:command, command_id}}
          :error -> {:error, :outbox_command_id_required}
        end

      nil ->
        case Keyword.get(opts, :workflow_ref) do
          workflow_ref when is_binary(workflow_ref) and workflow_ref != "" ->
            {:ok, {:workflow, workflow_ref}}

          _ ->
            {:error, :outbox_identity_required}
        end
    end
  end
end
