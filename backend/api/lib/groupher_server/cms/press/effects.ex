defmodule GroupherServer.CMS.Press.Effects do
  @moduledoc """
  Records rebuildable Press projection effects inside the config transaction.

      Press config transaction
        -> Press.Effects
        -> CMS Outbox
        -> Press invalidation Worker
  """

  alias GroupherServer.{CMS, Repo}
  alias CMS.Model.Community

  @doc "Records one versioned Press cache-invalidation intent in the caller's transaction."
  @spec enqueue_invalidation(Community.t(), Ecto.UUID.t()) ::
          {:ok, CMS.Outbox.Event.t()} | {:error, term()}
  def enqueue_invalidation(%Community{id: community_id}, command_id)
      when is_integer(community_id) and is_binary(command_id) do
    CMS.Outbox.send(%{
      event: "press.cache_invalidation",
      worker: GroupherServer.Jobs.CMSOutboxPress,
      resource_type: "community",
      resource_id: community_id,
      identity: {:command, command_id},
      contract_version: 1,
      effect_key: "config",
      data: %{}
    })
  end

  @doc "Ensures replay of a completed config Command also has its durable invalidation intent."
  @spec ensure_invalidation(Community.t(), Ecto.UUID.t()) ::
          {:ok, CMS.Outbox.Event.t()} | {:error, term()}
  def ensure_invalidation(%Community{} = community, command_id) do
    if Repo.in_transaction?() do
      enqueue_invalidation(community, command_id)
    else
      Repo.transact_result(fn -> enqueue_invalidation(community, command_id) end)
    end
  end
end
