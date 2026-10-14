defmodule GroupherServer.CMS.Outbox.Workflow.Asset do
  @moduledoc """
  Reliably delivers provider deletion intents for deleted assets.

  Business position:

      committed asset-delete outbox event
        -> Asset.Cleanup worker
        -> provider deletion delivery
  """

  alias GroupherServer.{CMS, Repo}
  alias CMS.Assets.Effects
  alias CMS.Model.CommunityAsset

  def perform(%Oban.Job{args: %{"event_id" => event_id}} = job) do
    case CMS.Outbox.execute(event_id, &delete_provider_object/1) do
      {:ok, _value} ->
        {:ok, :pass}

      {:busy, seconds} ->
        {:snooze, seconds}

      {:error, _reason} when job.attempt >= job.max_attempts ->
        _ = CMS.Outbox.mark_failed(event_id)
        {:ok, :pass}

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp delete_provider_object(event) do
    deliver_provider_object(event.resource_type, event)
  end

  defp deliver_provider_object("community_asset", event) do
    case Repo.get(CommunityAsset, event.resource_id) do
      %CommunityAsset{} = asset -> normalize_delete_result(Effects.deliver_provider_delete(asset))
      nil -> {:ok, :already_deleted}
    end
  end

  defp deliver_provider_object("application_logo_upload", event) do
    normalize_delete_result(Effects.deliver_application_upload_delete(event.data))
  end

  defp deliver_provider_object(resource_type, _event) do
    {:error, {:unsupported_asset_cleanup_resource, resource_type}}
  end

  defp normalize_delete_result({:ok, _result}), do: {:ok, :deleted}
  defp normalize_delete_result({:error, reason}), do: {:error, reason}
end
