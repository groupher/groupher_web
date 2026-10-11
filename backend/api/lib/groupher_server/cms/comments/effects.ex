defmodule GroupherServer.CMS.Comments.Effects do
  @moduledoc """
  Owns durable effect intents emitted by Comment mutations.

  The caller owns the current Command transaction. This module only builds the
  bounded Outbox intent; the Comment cleanup worker performs post-commit
  cache, search, mention, notification, and subscription delivery.

      Comment Command
        -> Comments.Effects
        -> CMS.Outbox
        -> Comment cleanup worker
  """

  alias GroupherServer.{Activity, CMS}

  @doc "Records one Comment effect in the caller-owned transaction."
  @spec enqueue(String.t(), String.t(), term(), Ecto.UUID.t(), map(), keyword()) ::
          {:ok, CMS.Outbox.Event.t()} | {:error, term()}
  def enqueue(event, resource_type, resource_id, command_id, data, opts \\ [])

  def enqueue(event, resource_type, resource_id, command_id, data, opts)
      when is_binary(event) and is_binary(resource_type) and is_binary(command_id) and
             is_map(data) and is_list(opts) do
    %{
      event: event,
      worker: GroupherServer.Jobs.CMSOutboxComment,
      resource_type: resource_type,
      resource_id: resource_id,
      identity: {:command, command_id},
      effect_key: Keyword.get(opts, :effect_key, "default"),
      data: data
    }
    |> CMS.Outbox.send()
  end

  def enqueue(_event, _resource_type, _resource_id, _command_id, _data, _opts),
    do: {:error, :comment_effect_identity_required}

  @doc "Records one Comment activity in the caller-owned transaction."
  def activity(resource, event, opts), do: Activity.log(resource, event, opts)
end
