defmodule GroupherServer.CMS.Articles.Effects do
  @moduledoc """
  Owns durable effect intents emitted by Article mutations.

  The caller owns the Article Command or Workflow transaction. This module
  records bounded Outbox intent; external delivery remains in the Article
  cleanup worker and its post-commit adapters.

      Article Command / Workflow
        -> Articles.Effects
        -> CMS.Outbox
        -> Article cleanup worker
  """

  alias GroupherServer.{Activity, CMS}

  @type identity :: {:command | :workflow, String.t()}

  @doc "Records one Article effect in the caller-owned transaction."
  @spec enqueue(String.t(), String.t(), term(), identity(), map(), keyword()) ::
          {:ok, CMS.Outbox.Event.t()} | {:error, term()}
  def enqueue(event, resource_type, resource_id, identity, data, opts \\ [])

  def enqueue(event, resource_type, resource_id, identity, data, opts)
      when is_binary(event) and is_binary(resource_type) and is_map(data) and is_list(opts) do
    CMS.Outbox.send(%{
      event: event,
      worker: GroupherServer.Jobs.CMSOutboxArticle,
      resource_type: resource_type,
      resource_id: resource_id,
      identity: identity,
      effect_key: Keyword.get(opts, :effect_key, "default"),
      data: data
    })
  end

  def enqueue(_event, _resource_type, _resource_id, _identity, _data, _opts),
    do: {:error, :article_effect_identity_required}

  @doc "Records one Article activity in the caller-owned transaction."
  def activity(resource, event, opts), do: Activity.log(resource, event, opts)
end
