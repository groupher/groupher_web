defmodule GroupherServer.CMS.Communities.Effects do
  @moduledoc """
  Owns Community activity and other in-transaction effects.

      Community Command / Lifecycle
        -> Communities.Effects
        -> Activity / context-specific effect owner
  """

  alias GroupherServer.{Activity, CMS}
  alias CMS.Model.Community

  @doc "Records one Community activity in the caller-owned transaction."
  def activity(resource, event, opts), do: Activity.log(resource, event, opts)

  @doc "Records durable analytics provisioning for a newly created Community."
  @spec enqueue_analysis_provision(Community.t(), Ecto.UUID.t()) ::
          {:ok, CMS.Outbox.Event.t()} | {:error, term()}
  def enqueue_analysis_provision(%Community{} = community, command_id) do
    CMS.Outbox.send(%{
      event: "community.analysis_provision",
      worker: GroupherServer.Jobs.CMSOutboxCommunity,
      resource_type: "community",
      resource_id: community.id,
      identity: {:command, command_id},
      effect_key: "analysis_provision",
      data: %{community_id: community.id}
    })
  end
end
