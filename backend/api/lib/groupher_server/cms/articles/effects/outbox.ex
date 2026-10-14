defmodule GroupherServer.CMS.Articles.Effects.Outbox do
  @moduledoc """
  Records Article effect intents inside the caller-owned transaction.

  Payloads contain stable resource identity and versioned business data. They
  never persist a module, function, argument tuple, struct, PID, or callback.

      Article Command / Workflow
        -> Effects.Outbox
        -> CMS.Outbox event
  """

  alias GroupherServer.{Activity, CMS}

  @doc "Records one Article effect in the caller-owned transaction."
  def enqueue(event, resource_type, resource_id, identity, data, opts)
      when is_binary(event) and is_binary(resource_type) and is_map(data) and is_list(opts) do
    CMS.Outbox.send(%{
      event: event,
      worker: GroupherServer.Jobs.CMSOutboxArticle,
      resource_type: resource_type,
      resource_id: resource_id,
      identity: identity,
      effect_key: Keyword.get(opts, :effect_key, "default"),
      retry_failed: Keyword.get(opts, :retry_failed, false),
      data: data
    })
  end

  def enqueue(_event, _resource_type, _resource_id, _identity, _data, _opts) do
    {:error, :invalid_article_effect_arguments}
  end

  @doc "Records one Article activity in the caller-owned transaction."
  def activity(resource, event, opts), do: Activity.log(resource, event, opts)
end
