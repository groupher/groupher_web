import { graphql } from '~/graphql/authoring'

const wallpaperEditor = graphql(`
  query WallpaperEditor($community: String!) {
    community(slug: $community) {
      dashboard {
        wallpaperSettings {
          light {
            settingsSchemaVersion
            type
            source
            customWallpaper {
              type
              assetPublicRef
              config
            }
            renderConfig
          }
          dark {
            settingsSchemaVersion
            type
            source
            customWallpaper {
              type
              assetPublicRef
              config
            }
            renderConfig
          }
        }
        wallpaperHistoryLight: wallpaperHistory(theme: LIGHT) {
          id
          theme
          settings {
            settingsSchemaVersion
            type
            source
            customWallpaper {
              type
              assetPublicRef
              config
            }
            renderConfig
          }
          savedAt
          active
        }
        wallpaperHistoryDark: wallpaperHistory(theme: DARK) {
          id
          theme
          settings {
            settingsSchemaVersion
            type
            source
            customWallpaper {
              type
              assetPublicRef
              config
            }
            renderConfig
          }
          savedAt
          active
        }
      }
    }
  }
`)

const prepareWallpaperUpload = graphql(`
  mutation PrepareWallpaperUpload($community: String!, $input: WallpaperUploadPrepareInput!) {
    prepareWallpaperUpload(community: $community, input: $input) {
      batchRef
      batchCapability
      expiresAt
      uploadIntents {
        capability
        uploadRef
        profile
      }
    }
  }
`)

const publishWallpaper = graphql(`
  mutation PublishWallpaper($community: String!, $input: WallpaperPublishInput!) {
    publishWallpaper(community: $community, input: $input) {
      version
    }
  }
`)

const restoreWallpaperSnapshot = graphql(`
  mutation RestoreWallpaperSnapshot($community: String!, $input: WallpaperRestoreSnapshotInput!) {
    restoreWallpaperSnapshot(community: $community, input: $input) {
      version
    }
  }
`)

export default {
  wallpaperEditor,
  prepareWallpaperUpload,
  publishWallpaper,
  restoreWallpaperSnapshot,
}
