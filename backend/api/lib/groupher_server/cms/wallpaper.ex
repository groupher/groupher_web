defmodule GroupherServer.CMS.Wallpaper do
  @moduledoc """
  Product boundary for Wallpaper settings and published images.

  One save owns one theme. Phoenix validates the settings, coordinates the
  Assets Hub Batch, and commits the immutable Snapshot plus the one active
  pointer in a single transaction.

  GraphQL mutation -> Settings codec -> Assets Hub publish -> Snapshot, Images,
  Receipt, and active pointer transaction.
  """

  alias Helper.Utils
  alias GroupherServer.Repo
  alias GroupherServer.Accounts.Model.User
  alias GroupherServer.CMS.Dashboard.Fields, as: DashboardFields

  alias GroupherServer.CMS.Model.{
    Community,
    CommunityAsset,
    CommunityWallpaper,
    WallpaperPublishReceipt,
    WallpaperSnapshot,
    WallpaperSnapshotImage
  }

  alias GroupherServer.CMS.Assets.{Capability, GeneratedBatch}
  alias GroupherServer.CMS.Assets.GeneratedBatch.PublishCapability
  alias GroupherServer.CMS.Wallpaper.{ErrorCat, RequestDigest, Settings}

  import Ecto.Query, only: [from: 2]

  @request_digest_version RequestDigest.active_version()
  @profile_version 1
  @publish_receipt_retention_seconds 30 * 24 * 60 * 60
  @snapshot_delete_grace_seconds 2 * 60 * 60
  @orphan_asset_grace_seconds 30 * 60
  @batch_ttl_seconds 15 * 60
  @database_transaction_timeout_ms 5_000
  @database_lock_timeout_ms 4_000
  @publish_transaction_budget_ms 10_000
  @max_clock_skew_ms 5_000
  @publish_policy_version "v1"
  @publish_signing_key_id "hmac-v1"
  @profiles [:wide, :desktop, :tablet, :phone]
  @profile_specs [
    %{key: :wide, logical_width: 1920, logical_height: 1080, width: 1920, height: 1080},
    %{key: :desktop, logical_width: 1440, logical_height: 900, width: 1440, height: 900},
    %{key: :tablet, logical_width: 1024, logical_height: 1366, width: 1024, height: 1366},
    %{key: :phone, logical_width: 390, logical_height: 844, width: 390, height: 844}
  ]

  defp batch_client,
    do: Application.get_env(:groupher_server, :wallpaper_batch_client, GeneratedBatch)

  @doc "Returns the cross-language Wallpaper profile matrix."
  def profile_specs, do: @profile_specs

  @doc "Reports whether an Assets Hub Batch has already produced a Snapshot."
  def batch_published?(batch_ref) when is_binary(batch_ref) do
    from(snapshot in WallpaperSnapshot,
      where: snapshot.source_batch_ref == ^batch_ref,
      select: snapshot.public_ref,
      limit: 1
    )
    |> Repo.one()
    |> Kernel.!=(nil)
  end

  @doc "Returns the Assets Hub targets for one theme and one internal Snapshot ref."
  def required_image_targets(theme, snapshot_ref)
      when theme in [:light, :dark] and is_binary(snapshot_ref) do
    Enum.map(@profile_specs, fn profile ->
      %{
        height: profile.height,
        mime_type: "image/webp",
        profile: profile.key,
        snapshot_ref: snapshot_ref,
        type: "#{theme}-#{profile.key}",
        width: profile.width
      }
    end)
  end

  @doc "Creates the temporary Assets Hub Batch for the current theme only."
  def prepare_upload(%Community{} = community, input, %User{} = user) when is_map(input) do
    theme = get(input, :theme)
    settings_input = get(input, :settings)
    images = get(input, :images)
    base_version = get(input, :base_version)
    idempotency_key = get(input, :idempotency_key)

    with :ok <- validate_theme(theme),
         {:ok, settings} <- Settings.normalize(settings_input),
         :ok <- validate_publish_metadata(base_version, idempotency_key),
         :ok <- ensure_current_version(community.id, base_version),
         :ok <- ensure_renderable(settings),
         {:ok, snapshot_ref} <- new_snapshot_ref(),
         {:ok, targets} <- validate_image_input(theme, snapshot_ref, images) do
      issued_at = DateTime.utc_now(:second)
      batch_ref = "wbatch_" <> Utils.uid(24)
      expires_at = DateTime.add(issued_at, @batch_ttl_seconds, :second)

      batch_payload = %{
        "capabilityPurpose" => "generated_image_batch",
        "batchRef" => batch_ref,
        "expectedVariants" => Enum.map(targets, &batch_target_wire/1),
        "expiresAt" => DateTime.to_iso8601(expires_at),
        "purpose" => "wallpaper-render",
        "requestDigest" => request_digest_for(community.id, theme, base_version, settings),
        "requestDigestVersion" => @request_digest_version
      }

      with {:ok, upload_intents} <-
             build_upload_intents(community, user, batch_ref, targets, images) do
        {:ok,
         %{
           batch_capability: Capability.sign(batch_payload),
           batch_ref: batch_ref,
           expires_at: expires_at,
           upload_intents: upload_intents
         }}
      end
    end
  end

  @doc "Returns the published image tree used by ordinary pages."
  def wallpaper(community_id) do
    state = Repo.get_by(CommunityWallpaper, community_id: community_id)
    {light, light_source} = published_theme(state && state.active_light_snapshot_ref, :light)
    {dark, dark_source} = published_theme(state && state.active_dark_snapshot_ref, :dark)

    %{
      version: state_version(state),
      light: light,
      dark: dark,
      light_source: light_source,
      dark_source: dark_source
    }
  end

  @doc "Returns complete settings for the editor, using Backend defaults when absent."
  def wallpaper_settings(community_id) do
    state = Repo.get_by(CommunityWallpaper, community_id: community_id)
    defaults = DashboardFields.wallpaper_default()

    %{
      light: settings_for_snapshot(state && state.active_light_snapshot_ref, defaults.light),
      dark: settings_for_snapshot(state && state.active_dark_snapshot_ref, defaults.dark)
    }
  end

  @doc "Returns retained history for the selected theme."
  def wallpaper_history(community_id, theme) when theme in [:light, :dark] do
    state = Repo.get_by(CommunityWallpaper, community_id: community_id)
    active_ref = active_snapshot_ref(state, theme)
    default = DashboardFields.wallpaper_default()[theme]

    from(snapshot in WallpaperSnapshot,
      where:
        snapshot.community_id == ^community_id and snapshot.theme == ^theme and
          is_nil(snapshot.delete_after),
      order_by: [desc: snapshot.history_used_at, desc: snapshot.inserted_at],
      limit: 5
    )
    |> Repo.all()
    |> Enum.filter(&supported_snapshot?/1)
    |> Enum.map(fn snapshot ->
      %{
        active: snapshot.public_ref == active_ref,
        id: snapshot.public_ref,
        saved_at: snapshot.inserted_at,
        settings: snapshot_settings(snapshot, default),
        theme: snapshot.theme
      }
    end)
  end

  @doc "Publishes one current-theme Snapshot, or a canonical NONE Snapshot."
  def publish(%Community{} = community, input, %User{} = user) when is_map(input) do
    assert_lease_policy!()

    theme = get(input, :theme)
    base_version = get(input, :base_version)
    idempotency_key = get(input, :idempotency_key)
    batch_ref = get(input, :batch_ref)

    with :ok <- validate_theme(theme),
         {:ok, settings} <- Settings.normalize(get(input, :settings)),
         :ok <- validate_publish_metadata(base_version, idempotency_key),
         :ok <- validate_batch_requirement(settings, batch_ref) do
      digest = request_digest_for(community.id, theme, base_version, settings)

      case existing_publish_receipt(community.id, idempotency_key, digest) do
        {:ok, response} ->
          {:ok, response}

        {:error, reason} ->
          {:error, reason}

        :miss ->
          publish_once(
            community,
            user,
            theme,
            settings,
            base_version,
            idempotency_key,
            batch_ref,
            digest
          )
      end
    end
  end

  @doc "Restores one retained public Snapshot ID for its original theme."
  def restore_snapshot(%Community{} = community, input, %User{}) when is_map(input) do
    snapshot_id = get(input, :snapshot_id)
    base_version = get(input, :base_version)

    Repo.transaction(fn ->
      state = lock_or_create_wallpaper(community.id)

      if state.version != base_version,
        do: Repo.rollback(ErrorCat.wallpaper_publish_version_conflict())

      snapshot =
        Repo.one(
          from(snapshot in WallpaperSnapshot,
            where:
              snapshot.community_id == ^community.id and snapshot.public_ref == ^snapshot_id and
                is_nil(snapshot.delete_after),
            lock: "FOR UPDATE"
          )
        )

      if is_nil(snapshot), do: Repo.rollback(ErrorCat.wallpaper_snapshot_not_restorable())

      unless supported_snapshot?(snapshot),
        do: Repo.rollback(ErrorCat.wallpaper_snapshot_not_restorable())

      if snapshot.settings["type"] != "none" and
           not complete_profile_manifest?(snapshot_images(snapshot.public_ref)) do
        Repo.rollback(ErrorCat.wallpaper_snapshot_not_restorable())
      end

      now = DateTime.utc_now(:second)
      active_field = active_field(snapshot.theme)

      {:ok, state} =
        state
        |> CommunityWallpaper.changeset(%{
          active_field => snapshot.public_ref,
          version: state.version + 1
        })
        |> Repo.update()

      snapshot
      |> WallpaperSnapshot.changeset(%{activated_at: now, history_used_at: now})
      |> Repo.update!()

      retain_latest_snapshots(community.id, state, now)
      %{version: state.version}
    end)
  end

  @doc "Deletes expired receipts/Snapshots and unreferenced generated assets."
  def reconcile_lifecycle do
    now = DateTime.utc_now(:second)

    receipt_count =
      from(receipt in WallpaperPublishReceipt, where: receipt.expires_at <= ^now)
      |> Repo.delete_all()
      |> elem(0)

    active_refs =
      from(state in CommunityWallpaper,
        select: [state.active_light_snapshot_ref, state.active_dark_snapshot_ref]
      )
      |> Repo.all()
      |> List.flatten()
      |> Enum.reject(&is_nil/1)
      |> MapSet.new()

    snapshots =
      from(snapshot in WallpaperSnapshot,
        where: not is_nil(snapshot.delete_after) and snapshot.delete_after <= ^now
      )
      |> Repo.all()
      |> Enum.reject(&MapSet.member?(active_refs, &1.public_ref))

    Enum.each(snapshots, fn snapshot ->
      community = Repo.get!(Community, snapshot.community_id)
      refs = snapshot_images(snapshot.public_ref) |> Enum.map(& &1.asset_public_ref)
      GroupherServer.CMS.Assets.delete_generated_assets(community, refs)
      Repo.delete!(snapshot)
    end)

    cutoff = DateTime.add(now, -@orphan_asset_grace_seconds, :second)

    orphan_assets =
      from(asset in CommunityAsset,
        left_join: image in WallpaperSnapshotImage,
        on: image.asset_public_ref == asset.public_ref,
        where:
          asset.status == :active and is_nil(asset.deleted_at) and
            like(asset.storage_key, ^"%/wallpaper-generated/%") and asset.inserted_at <= ^cutoff and
            is_nil(image.id),
        select: {asset.community_id, asset.public_ref}
      )
      |> Repo.all()
      |> Enum.group_by(&elem(&1, 0), &elem(&1, 1))

    Enum.each(orphan_assets, fn {community_id, refs} ->
      GroupherServer.CMS.Assets.delete_generated_assets(Repo.get!(Community, community_id), refs)
    end)

    %{
      orphan_assets: orphan_assets |> Map.values() |> List.flatten() |> length(),
      receipts: receipt_count,
      snapshots: length(snapshots)
    }
  end

  defp publish_once(
         community,
         user,
         theme,
         settings,
         base_version,
         idempotency_key,
         batch_ref,
         digest
       ) do
    with {:ok, capability} <-
           prepare_publish_capability(
             community,
             theme,
             batch_ref,
             idempotency_key,
             digest,
             settings
           ),
         :ok <- ensure_publish_lease(capability) do
      case run_publish_transaction(fn ->
             configure_publish_transaction!()
             ensure_publish_lease!(capability)

             publish_transaction(
               community,
               user,
               theme,
               settings,
               base_version,
               idempotency_key,
               batch_ref,
               capability,
               digest
             )
           end) do
        {:ok, response} ->
          {:ok, response}

        {:error, reason} ->
          cleanup_publish_capability(community, batch_ref, capability)
          {:error, reason}
      end
    end
  end

  defp publish_transaction(
         community,
         user,
         theme,
         settings,
         base_version,
         idempotency_key,
         batch_ref,
         capability,
         digest
       ) do
    case Repo.get_by(WallpaperPublishReceipt,
           community_id: community.id,
           idempotency_key: idempotency_key
         ) do
      %WallpaperPublishReceipt{
        request_digest: ^digest,
        request_digest_version: @request_digest_version
      } = receipt ->
        replayed_receipt_response(community.id, receipt.response_payload)

      %WallpaperPublishReceipt{} ->
        Repo.rollback(ErrorCat.wallpaper_publish_idempotency_conflict())

      nil ->
        state = lock_or_create_wallpaper(community.id)

        if state.version != base_version,
          do: Repo.rollback(ErrorCat.wallpaper_publish_version_conflict())

        now = DateTime.utc_now(:second)
        snapshot_ref = (capability && capability.snapshot_ref) || new_snapshot_ref!()

        :ok = Settings.assert_current_version!(settings)

        image_rows =
          capability && snapshot_images_from_manifest(capability.manifest, snapshot_ref)

        attrs = %{
          activated_at: now,
          community_id: community.id,
          created_by_id: to_string(user.id),
          history_used_at: now,
          profile_version: @profile_version,
          public_ref: snapshot_ref,
          settings: settings,
          settings_schema_version: settings["settingsSchemaVersion"],
          source_batch_ref: batch_ref,
          theme: theme
        }

        {:ok, _snapshot} =
          %WallpaperSnapshot{}
          |> WallpaperSnapshot.changeset(attrs)
          |> Repo.insert()

        Enum.each(image_rows || [], fn row ->
          {:ok, _image} =
            %WallpaperSnapshotImage{}
            |> WallpaperSnapshotImage.changeset(row)
            |> Repo.insert()
        end)

        {:ok, state} =
          state
          |> CommunityWallpaper.changeset(%{
            active_field(theme) => snapshot_ref,
            version: state.version + 1
          })
          |> Repo.update()

        retain_latest_snapshots(community.id, state, now)

        response = %{version: state.version}

        receipt_attrs = %{
          community_id: community.id,
          expires_at: DateTime.add(now, @publish_receipt_retention_seconds, :second),
          idempotency_key: idempotency_key,
          request_digest: digest,
          request_digest_version: @request_digest_version,
          response_payload: %{"version" => state.version}
        }

        {:ok, _receipt} =
          %WallpaperPublishReceipt{}
          |> WallpaperPublishReceipt.changeset(receipt_attrs)
          |> Repo.insert()

        response
    end
  end

  defp prepare_publish_capability(community, theme, batch_ref, idempotency_key, digest, settings) do
    if settings["type"] == "none" do
      {:ok, nil}
    else
      case batch_client().claim_for_publish(batch_ref, idempotency_key) do
        {:ok, result} ->
          with {:ok, capability} <- verify_publish_capability(result, batch_ref, digest),
               {:ok, snapshot_ref} <- validate_publish_manifest(capability.manifest, theme) do
            {:ok, Map.put(capability, :snapshot_ref, snapshot_ref)}
          else
            {:error, _reason} = error ->
              cleanup_publish_claim(community, batch_ref, result)
              error
          end

        error ->
          error
      end
    end
  end

  defp verify_publish_capability(result, batch_ref, digest) when is_map(result) do
    token = get(result, :capability)

    with true <- is_binary(token),
         {:ok, payload} <- PublishCapability.verify(token),
         true <- payload.batch_ref == batch_ref,
         true <- payload.request_digest == digest,
         true <- payload.request_digest_version == @request_digest_version,
         true <- payload.policy_version == @publish_policy_version,
         true <- payload.signing_key_id == @publish_signing_key_id,
         true <- payload.manifest_digest == PublishCapability.manifest_digest(payload.manifest) do
      {:ok, %{expires_at: payload.expires_at, manifest: payload.manifest, token: token}}
    else
      _ -> {:error, ErrorCat.wallpaper_publish_capability_invalid()}
    end
  end

  defp verify_publish_capability(_result, _batch_ref, _digest),
    do: {:error, ErrorCat.wallpaper_publish_capability_invalid()}

  defp validate_publish_manifest(manifest, theme) when is_list(manifest) do
    owners = manifest |> Enum.map(&get(&1, :candidate_owner_ref)) |> Enum.uniq()

    with [snapshot_ref] <- owners,
         targets = required_image_targets(theme, snapshot_ref),
         true <- length(manifest) == length(targets),
         true <- Enum.all?(targets, fn target -> valid_manifest_target?(manifest, target) end) do
      {:ok, snapshot_ref}
    else
      _ -> {:error, ErrorCat.wallpaper_publish_manifest_invalid()}
    end
  end

  defp valid_manifest_target?(manifest, target) do
    case Enum.find(manifest, &(get(&1, :variant_key) == target.type)) do
      nil ->
        false

      entry ->
        get(entry, :candidate_owner_ref) == target.snapshot_ref and
          get(entry, :width) == target.width and get(entry, :height) == target.height and
          get(entry, :mime_type) == target.mime_type and
          valid_asset_ref?(get(entry, :asset_public_ref)) and
          valid_string?(get(entry, :checksum)) and valid_string?(get(entry, :storage_key))
    end
  end

  defp snapshot_images_from_manifest(manifest, snapshot_ref) do
    Enum.map(manifest, fn entry ->
      profile = profile_from_target(get(entry, :variant_key))
      if is_nil(profile), do: Repo.rollback(ErrorCat.wallpaper_publish_manifest_invalid())

      %{
        asset_public_ref: get(entry, :asset_public_ref),
        checksum: get(entry, :checksum),
        format: :webp,
        height: get(entry, :height),
        profile: profile,
        wallpaper_snapshot_ref: snapshot_ref,
        width: get(entry, :width)
      }
    end)
  end

  defp profile_from_target(variant_key) when is_binary(variant_key) do
    Enum.find_value(@profiles, fn profile ->
      variant_key in ["light-#{profile}", "dark-#{profile}"] && profile
    end)
  end

  defp profile_from_target(_variant_key), do: nil

  defp validate_image_input(theme, snapshot_ref, images) when is_list(images) do
    targets = required_image_targets(theme, snapshot_ref)

    if length(images) != length(targets) do
      {:error,
       ErrorCat.wallpaper_upload_images_invalid(%{
         actual: length(images),
         expected: length(targets),
         message:
           "Wallpaper images count invalid: expected #{length(targets)}, got #{length(images)}"
       })}
    else
      image_by_profile =
        Map.new(images, fn image -> {normalize_profile(get(image, :profile)), image} end)

      Enum.reduce_while(targets, {:ok, targets}, fn target, acc ->
        image = Map.get(image_by_profile, target.profile)

        case validate_image(image, target) do
          :ok -> {:cont, acc}
          {:error, details} -> {:halt, {:error, ErrorCat.wallpaper_upload_image_invalid(details)}}
        end
      end)
    end
  end

  defp validate_image(image, target) when is_map(image) do
    checks = [
      {:width, target.width, get(image, :width)},
      {:height, target.height, get(image, :height)},
      {:mime_type, target.mime_type, get(image, :mime_type)}
    ]

    case Enum.find(checks, fn {_field, expected, actual} -> expected != actual end) do
      {field, expected, actual} ->
        {:error, image_error_details(target.profile, field, expected, actual)}

      nil ->
        if is_integer(get(image, :size_bytes)) and get(image, :size_bytes) > 0 and
             valid_string?(get(image, :checksum)),
           do: :ok,
           else: {:error, image_error_details(target.profile, :metadata, :valid, image)}
    end
  end

  defp validate_image(_image, target),
    do: {:error, image_error_details(target.profile, :entry, :map, nil)}

  defp image_error_details(profile, field, expected, actual) do
    %{
      actual: actual,
      expected: expected,
      field: field,
      message:
        "Wallpaper image #{profile} has invalid #{field}: expected #{format_detail(expected)}, got #{format_detail(actual)}",
      profile: profile
    }
  end

  defp format_detail(value) when is_binary(value), do: value
  defp format_detail(value), do: inspect(value)

  defp build_upload_intents(community, user, batch_ref, targets, images) do
    image_by_profile =
      Map.new(images, fn image -> {normalize_profile(get(image, :profile)), image} end)

    Enum.reduce_while(targets, {:ok, []}, fn target, {:ok, intents} ->
      image = Map.fetch!(image_by_profile, target.profile)

      file = %{
        batch_ref: batch_ref,
        candidate_owner_ref: target.snapshot_ref,
        checksum_sha256: get(image, :checksum),
        filename: "#{target.type}.webp",
        height: target.height,
        mime_type: target.mime_type,
        size_bytes: get(image, :size_bytes),
        variant_key: target.type,
        width: target.width
      }

      case GroupherServer.CMS.Assets.create_generated_upload_intent(community, file, user) do
        {:ok, intent} -> {:cont, {:ok, [Map.put(intent, :profile, target.profile) | intents]}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
    |> case do
      {:ok, intents} -> {:ok, Enum.reverse(intents)}
      error -> error
    end
  end

  defp batch_target_wire(target) do
    %{
      "candidateOwnerRef" => target.snapshot_ref,
      "height" => target.height,
      "mimeType" => target.mime_type,
      "variantKey" => target.type,
      "width" => target.width
    }
  end

  defp published_theme(nil, _theme), do: {nil, nil}

  defp published_theme(snapshot_ref, theme) do
    case Repo.get_by(WallpaperSnapshot, public_ref: snapshot_ref, theme: theme) do
      %WallpaperSnapshot{settings: %{"type" => "none"}} ->
        {nil, nil}

      %WallpaperSnapshot{settings: settings} = snapshot ->
        images = snapshot_images(snapshot.public_ref)

        static_images =
          if complete_profile_manifest?(images),
            do: Map.new(images, &{&1.profile, static_image(&1)}),
            else: nil

        {static_images, Map.get(settings, "source")}

      _ ->
        {nil, nil}
    end
  end

  defp static_image(image) do
    %{
      height: image.height,
      url:
        "#{GroupherServer.CMS.Assets.Capability.public_endpoint()}/a/#{image.asset_public_ref}/original",
      width: image.width
    }
  end

  defp settings_for_snapshot(nil, default), do: default_settings(default)

  defp settings_for_snapshot(snapshot_ref, default) do
    case Repo.get_by(WallpaperSnapshot, public_ref: snapshot_ref) do
      %WallpaperSnapshot{} = snapshot ->
        snapshot_settings(snapshot, default)

      _ ->
        default_settings(default)
    end
  end

  defp snapshot_settings(
         %WallpaperSnapshot{settings: settings, settings_schema_version: version},
         _default
       ) do
    Settings.to_graphql(settings, version)
  end

  defp supported_snapshot?(%WallpaperSnapshot{
         settings: settings,
         settings_schema_version: version
       }) do
    graphql_settings = Settings.to_graphql(settings, version)
    match?({:ok, _settings}, Settings.normalize(graphql_settings))
  rescue
    ArgumentError -> false
  end

  defp default_settings(default) do
    {:ok, settings} = Settings.default(default)
    Settings.to_graphql(settings)
  end

  defp snapshot_images(snapshot_ref) do
    from(image in WallpaperSnapshotImage,
      where: image.wallpaper_snapshot_ref == ^snapshot_ref,
      order_by: [asc: image.profile]
    )
    |> Repo.all()
  end

  defp complete_profile_manifest?(images) do
    Enum.sort(Enum.map(images, & &1.profile)) == Enum.sort(@profiles) and
      Enum.all?(images, fn image ->
        image.format == :webp and valid_asset_ref?(image.asset_public_ref)
      end)
  end

  defp retain_latest_snapshots(community_id, state, now) do
    active_refs =
      [state.active_light_snapshot_ref, state.active_dark_snapshot_ref] |> Enum.reject(&is_nil/1)

    history_refs =
      from(snapshot in WallpaperSnapshot,
        where: snapshot.community_id == ^community_id and is_nil(snapshot.delete_after),
        order_by: [desc: snapshot.history_used_at, desc: snapshot.inserted_at]
      )
      |> Repo.all()
      |> Enum.filter(&supported_snapshot?/1)
      |> Enum.map(& &1.public_ref)

    keep_refs = (active_refs ++ history_refs) |> Enum.uniq() |> Enum.take(5)

    from(snapshot in WallpaperSnapshot,
      where:
        snapshot.community_id == ^community_id and is_nil(snapshot.delete_after) and
          snapshot.public_ref not in ^keep_refs
    )
    |> Repo.update_all(
      set: [delete_after: DateTime.add(now, @snapshot_delete_grace_seconds, :second)]
    )
  end

  defp lock_or_create_wallpaper(community_id) do
    query =
      from(state in CommunityWallpaper,
        where: state.community_id == ^community_id,
        lock: "FOR UPDATE"
      )

    case Repo.one(query) do
      %CommunityWallpaper{} = state ->
        state

      nil ->
        %CommunityWallpaper{}
        |> CommunityWallpaper.changeset(%{
          community_id: community_id,
          public_ref: "ww_" <> Utils.uid(24),
          version: 0
        })
        |> Repo.insert(on_conflict: :nothing, conflict_target: [:community_id])

        Repo.one!(query)
    end
  end

  defp ensure_current_version(community_id, version) do
    state = Repo.get_by(CommunityWallpaper, community_id: community_id)

    if state_version(state) == version,
      do: :ok,
      else: {:error, ErrorCat.wallpaper_publish_version_conflict()}
  end

  defp validate_publish_metadata(version, key) do
    cond do
      not is_integer(version) or version < 0 ->
        {:error, ErrorCat.wallpaper_publish_base_version_invalid()}

      not is_binary(key) or String.trim(key) == "" ->
        {:error, ErrorCat.wallpaper_publish_idempotency_key_invalid()}

      true ->
        :ok
    end
  end

  defp validate_batch_requirement(%{"type" => "none"}, nil), do: :ok

  defp validate_batch_requirement(%{"type" => "none"}, _),
    do: {:error, ErrorCat.wallpaper_none_publish_must_not_have_batch()}

  defp validate_batch_requirement(_settings, batch_ref)
       when is_binary(batch_ref) and batch_ref != "", do: :ok

  defp validate_batch_requirement(_settings, _),
    do: {:error, ErrorCat.wallpaper_upload_batch_required()}

  defp ensure_renderable(%{"type" => "none"}),
    do: {:error, ErrorCat.wallpaper_upload_images_invalid()}

  defp ensure_renderable(_), do: :ok

  defp validate_theme(theme) when theme in [:light, :dark], do: :ok
  defp validate_theme(_), do: {:error, ErrorCat.wallpaper_settings_invalid()}

  defp normalize_profile(profile) when profile in @profiles, do: profile

  defp normalize_profile(profile) when is_binary(profile) do
    Enum.find(@profiles, &(Atom.to_string(&1) == profile))
  end

  defp normalize_profile(_), do: nil

  defp active_snapshot_ref(nil, _theme), do: nil
  defp active_snapshot_ref(state, theme), do: Map.get(state, active_field(theme))
  defp active_field(:light), do: :active_light_snapshot_ref
  defp active_field(:dark), do: :active_dark_snapshot_ref
  defp state_version(nil), do: 0
  defp state_version(state), do: state.version

  defp new_snapshot_ref, do: {:ok, "wsnap_" <> Utils.uid(24)}
  defp new_snapshot_ref!, do: "wsnap_" <> Utils.uid(24)

  defp existing_publish_receipt(community_id, key, digest) do
    case Repo.get_by(WallpaperPublishReceipt, community_id: community_id, idempotency_key: key) do
      %WallpaperPublishReceipt{
        request_digest: ^digest,
        request_digest_version: @request_digest_version
      } = receipt ->
        {:ok, replayed_receipt_response(community_id, receipt.response_payload)}

      %WallpaperPublishReceipt{} ->
        {:error, ErrorCat.wallpaper_publish_idempotency_conflict()}

      nil ->
        :miss
    end
  end

  defp result_from_payload(%{"version" => version}), do: %{version: version}
  defp result_from_payload(%{version: version}), do: %{version: version}

  defp replayed_receipt_response(community_id, payload) do
    current = Repo.get_by(CommunityWallpaper, community_id: community_id)
    Map.put(result_from_payload(payload), :version, state_version(current))
  end

  defp request_digest_for(community_id, theme, base_version, settings) do
    RequestDigest.digest(%{
      base_version: base_version,
      community_id: community_id,
      request_digest_version: @request_digest_version,
      settings: settings,
      theme: theme
    })
  end

  defp assert_lease_policy! do
    true = @database_lock_timeout_ms < @database_transaction_timeout_ms
    true = @database_transaction_timeout_ms < @publish_transaction_budget_ms
    true = @publish_transaction_budget_ms + @max_clock_skew_ms < @batch_ttl_seconds * 1_000
    :ok
  end

  defp ensure_publish_lease(nil), do: :ok

  defp ensure_publish_lease(%{expires_at: expires_at}) do
    required_ms = @publish_transaction_budget_ms + @max_clock_skew_ms

    if DateTime.diff(expires_at, DateTime.utc_now(), :millisecond) > required_ms,
      do: :ok,
      else: {:error, ErrorCat.wallpaper_publish_lease_too_short()}
  end

  defp ensure_publish_lease!(capability) do
    case ensure_publish_lease(capability) do
      :ok -> :ok
      {:error, reason} -> Repo.rollback(reason)
    end
  end

  defp configure_publish_transaction! do
    Repo.query!("SELECT set_config('statement_timeout', $1, true)", [
      "#{@database_transaction_timeout_ms}ms"
    ])

    Repo.query!("SELECT set_config('lock_timeout', $1, true)", ["#{@database_lock_timeout_ms}ms"])
  end

  defp run_publish_transaction(callback) do
    Repo.transaction(callback, timeout: @database_transaction_timeout_ms)
  rescue
    DBConnection.ConnectionError -> {:error, ErrorCat.wallpaper_publish_transaction_timeout()}
  end

  defp cleanup_publish_claim(_community, batch_ref, result)
       when is_binary(batch_ref) and is_map(result) do
    case get(result, :capability) do
      token when is_binary(token) -> cleanup_batch_claim(batch_ref, token)
      _ -> :ok
    end

    :ok
  end

  defp cleanup_publish_claim(_community, _batch_ref, _result), do: :ok

  defp cleanup_publish_capability(_community, batch_ref, capability)
       when is_binary(batch_ref) and is_map(capability) do
    case get(capability, :token) do
      token when is_binary(token) -> cleanup_batch_claim(batch_ref, token)
      _ -> :ok
    end

    :ok
  end

  defp cleanup_publish_capability(_community, _batch_ref, _capability), do: :ok

  # A publish claim is shared by retries using the same batch reference. Once
  # the database snapshot exists, deleting the claim also deletes the winner's
  # R2 objects. Treat an unavailable publication check as "unknown" and leave
  # the batch for the Durable Object reconciliation alarm instead of deleting
  # data that may already be live.
  defp cleanup_batch_claim(batch_ref, token) do
    case published_batch_status(batch_ref) do
      :published -> :ok
      :not_published -> _ = batch_client().delete_claim(batch_ref, token)
      :unknown -> :ok
    end
  end

  defp published_batch_status(batch_ref) do
    if batch_published?(batch_ref), do: :published, else: :not_published
  rescue
    _ -> :unknown
  end

  defp valid_string?(value), do: is_binary(value) and value != ""
  defp valid_asset_ref?(value), do: valid_string?(value)

  defp get(map, key) when is_map(map) and is_atom(key),
    do: Map.get(map, key) || Map.get(map, Atom.to_string(key))

  defp get(_map, _key), do: nil
end
