defmodule GroupherServer.CMS.Model.AssetUpload do
  @moduledoc """
  Durable state for one Assets Hub upload capability and completion callback.

  `upload_ref` is the workflow identity. The row stores only the capability-bound
  facts Phoenix is willing to accept from Assets Hub and the canonical completion
  result needed to replay a response after a callback retry.

      upload intent
        -> asset_uploads pending row
        -> validated completion callback
        -> canonical asset result replay
  """

  use Ecto.Schema

  import Ecto.Changeset

  alias GroupherServer.{Accounts, CMS}

  alias CMS.Model.{Community, CommunityAsset}
  alias Accounts.Model.User
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.cms()
  @states [:pending, :completed, :failed, :expired]

  schema "asset_uploads" do
    field(:upload_ref, :string)
    field(:idempotency_key, :string)
    field(:purpose, :string)
    belongs_to(:community, Community)
    belongs_to(:uploader, User)
    belongs_to(:asset, CommunityAsset)

    field(:asset_public_ref, :string)
    field(:object_key, :string)
    field(:canonical_url, :string)
    field(:declared_filename, :string)
    field(:declared_mime_type, :string)
    field(:declared_size_bytes, :integer)
    field(:declared_asset_type, :string)
    field(:declared_thread, :string)
    field(:declared_checksum_sha256, :string)
    field(:capability_expires_at, :utc_datetime)
    field(:state, Ecto.Enum, values: @states, default: :pending)
    field(:completion, :map, default: %{})
    field(:failure_code, :string)
    field(:failure_message, :string)
    field(:callback_attempts, :integer, default: 0)
    field(:completed_at, :utc_datetime)
    field(:last_callback_at, :utc_datetime)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(upload, attrs) do
    upload
    |> cast(attrs, [
      :upload_ref,
      :idempotency_key,
      :purpose,
      :community_id,
      :uploader_id,
      :asset_id,
      :asset_public_ref,
      :object_key,
      :canonical_url,
      :declared_filename,
      :declared_mime_type,
      :declared_size_bytes,
      :declared_asset_type,
      :declared_thread,
      :declared_checksum_sha256,
      :capability_expires_at,
      :state,
      :completion,
      :failure_code,
      :failure_message,
      :callback_attempts,
      :completed_at,
      :last_callback_at
    ])
    |> validate_required([
      :upload_ref,
      :idempotency_key,
      :purpose,
      :community_id,
      :asset_public_ref,
      :object_key,
      :canonical_url,
      :declared_filename,
      :declared_mime_type,
      :declared_size_bytes,
      :declared_asset_type,
      :declared_thread,
      :capability_expires_at,
      :state,
      :completion,
      :callback_attempts
    ])
    |> validate_inclusion(:state, @states)
    |> validate_number(:declared_size_bytes, greater_than: 0)
    |> validate_number(:callback_attempts, greater_than_or_equal_to: 0)
    |> foreign_key_constraint(:community_id)
    |> foreign_key_constraint(:uploader_id)
    |> foreign_key_constraint(:asset_id)
    |> unique_constraint(:upload_ref)
    |> unique_constraint(:idempotency_key)
    |> unique_constraint(:asset_public_ref)
  end
end
