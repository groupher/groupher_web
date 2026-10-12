defmodule GroupherServer.CMS.Wallpaper.Persist do
  @moduledoc """
  Owns Wallpaper row primitives inside a caller-owned transaction.

  Command and Workflow own admission, command identity, provider capability,
  retention policy, and transaction orchestration. This module only locks and
  writes the canonical Wallpaper rows.

      Wallpaper Command / Workflow
        -> Wallpaper.Persist
        -> Snapshot and active-pointer rows
  """

  import Ecto.Query, only: [from: 2]

  alias GroupherServer.{CMS, Repo}

  alias CMS.Model.{
    CommunityWallpaper,
    WallpaperPublishReceipt,
    WallpaperSnapshot,
    WallpaperSnapshotImage
  }

  @doc "Locks or creates the one active Wallpaper state row for a Community."
  def lock_or_create_wallpaper(community_id) when is_integer(community_id) do
    query =
      from(state in CommunityWallpaper,
        where: state.community_id == ^community_id,
        lock: "FOR UPDATE"
      )

    case Repo.one(query) do
      %CommunityWallpaper{} = state ->
        {:ok, state}

      nil ->
        %CommunityWallpaper{}
        |> CommunityWallpaper.changeset(%{
          community_id: community_id,
          public_ref: "ww_" <> Helper.Utils.uid(24),
          version: 0
        })
        |> Repo.insert(on_conflict: :nothing, conflict_target: [:community_id])

        {:ok, Repo.one!(query)}
    end
  end

  @doc "Returns one publish recovery row for a Community and command identity."
  def get_publish_receipt(community_id, command_id) do
    Repo.get_by(WallpaperPublishReceipt, community_id: community_id, command_id: command_id)
  end

  @doc "Locks one retained Snapshot belonging to a Community."
  def lock_snapshot(community_id, snapshot_id) do
    Repo.one(
      from(snapshot in WallpaperSnapshot,
        where:
          snapshot.community_id == ^community_id and snapshot.public_ref == ^snapshot_id and
            is_nil(snapshot.delete_after),
        lock: "FOR UPDATE"
      )
    )
  end

  @doc "Inserts an immutable Wallpaper Snapshot row."
  def insert_snapshot(attrs) when is_map(attrs) do
    %WallpaperSnapshot{}
    |> WallpaperSnapshot.changeset(attrs)
    |> Repo.insert()
  end

  @doc "Inserts one generated image row belonging to a Snapshot."
  def insert_snapshot_image(attrs) when is_map(attrs) do
    %WallpaperSnapshotImage{}
    |> WallpaperSnapshotImage.changeset(attrs)
    |> Repo.insert()
  end

  @doc "Updates the active Wallpaper pointer and version."
  def update_state(%CommunityWallpaper{} = state, attrs) when is_map(attrs) do
    state
    |> CommunityWallpaper.changeset(attrs)
    |> Repo.update()
  end

  @doc "Marks one Snapshot as activated or used in history."
  def update_snapshot(%WallpaperSnapshot{} = snapshot, attrs) when is_map(attrs) do
    snapshot
    |> WallpaperSnapshot.changeset(attrs)
    |> Repo.update()
  end

  @doc "Inserts the domain recovery record for a successful Wallpaper publish."
  def insert_publish_receipt(attrs) when is_map(attrs) do
    %WallpaperPublishReceipt{}
    |> WallpaperPublishReceipt.changeset(attrs)
    |> Repo.insert()
  end
end
