defmodule GroupherServer.CMS.Assets.Effects do
  @moduledoc """
  Owns durable provider-delete effect intents for the Assets context.

  Effects are inserted into the caller-owned transaction. This module does not
  load or mutate asset authority, open a transaction, or deliver to the
  provider inline.

      Commands / Workflow
        -> Assets.Persist
        -> Assets.Effects
        -> CMS.Outbox
        -> Asset cleanup worker
  """

  alias GroupherServer.CMS
  alias CMS.Model.{CommunityApplicationLogoUpload, CommunityAsset}

  @type identity :: {:command | :workflow, String.t()}

  @doc "Records a provider-delete intent for a deleted community asset."
  @spec enqueue_provider_delete(CommunityAsset.t(), identity(), keyword()) ::
          {:ok, CMS.Outbox.Event.t()} | {:error, term()}
  def enqueue_provider_delete(%CommunityAsset{} = asset, identity, opts \\ [])
      when is_list(opts) do
    CMS.Outbox.send(%{
      event: "asset.provider_delete",
      worker: GroupherServer.Jobs.CMSOutboxAsset,
      resource_type: "community_asset",
      resource_id: asset.id,
      identity: identity,
      effect_key: Keyword.get(opts, :effect_key, "asset:#{asset.id}"),
      retry_failed: Keyword.get(opts, :retry_failed, false),
      data: %{asset_id: asset.id, public_ref: asset.public_ref}
    })
  end

  @doc "Records a provider-delete intent for an expired application upload."
  @spec enqueue_application_upload_delete(CommunityApplicationLogoUpload.t(), String.t()) ::
          {:ok, CMS.Outbox.Event.t()} | {:error, term()}
  def enqueue_application_upload_delete(upload, workflow_ref)
      when is_map(upload) and is_binary(workflow_ref) and workflow_ref != "" do
    CMS.Outbox.send(%{
      event: "asset.application_upload_provider_delete",
      worker: GroupherServer.Jobs.CMSOutboxAsset,
      resource_type: "application_logo_upload",
      resource_id: upload.id,
      identity: {:workflow, workflow_ref},
      effect_key: "application-upload:#{upload.public_ref}",
      data: %{
        id: upload.id,
        public_ref: upload.public_ref,
        storage: upload.storage,
        storage_key: upload.storage_key
      }
    })
  end

  def enqueue_application_upload_delete(_upload, _workflow_ref) do
    {:error, :asset_workflow_ref_required}
  end

  @doc "Delivers a community-asset provider-delete intent after commit."
  @spec deliver_provider_delete(CommunityAsset.t()) :: {:ok, term()} | {:error, term()}
  def deliver_provider_delete(%CommunityAsset{} = asset) do
    CMS.Assets.Deletion.deliver(asset)
  end

  @doc "Delivers an application-upload provider-delete intent after commit."
  @spec deliver_application_upload_delete(map()) :: {:ok, term()} | {:error, term()}
  def deliver_application_upload_delete(data) when is_map(data) do
    CMS.Assets.Deletion.deliver_application_upload(data)
  end
end
