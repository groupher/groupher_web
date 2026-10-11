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
        _ = CMS.Outbox.mark_dead(event_id)
        {:ok, :pass}

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp delete_provider_object(event) do
    case event.resource_type do
      "community_asset" ->
        case Repo.get(CommunityAsset, event.resource_id) do
          %CommunityAsset{} = asset ->
            case Effects.deliver_provider_delete(asset) do
              {:ok, _} -> {:ok, :deleted}
              {:error, reason} -> {:error, reason}
            end

          nil ->
            {:ok, :already_deleted}
        end

      "application_logo_upload" ->
        case Effects.deliver_application_upload_delete(event.data) do
          {:ok, _} -> {:ok, :deleted}
          {:error, reason} -> {:error, reason}
        end

      _ ->
        {:error, {:unsupported_asset_cleanup_resource, event.resource_type}}
    end
  end
end
