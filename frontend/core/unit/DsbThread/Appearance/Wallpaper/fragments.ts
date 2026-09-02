import { graphql } from '~/graphql/authoring'

export const DashboardWallpaperFields = graphql(`
  fragment DashboardWallpaperFields on DsbWallpaper {
    staticRevision
    light {
      type
      source
      assetPublicRef
      staticAssetPublicRef
      gradient
      pattern
      contentShadow
      effect
      texture
    }
    dark {
      type
      source
      assetPublicRef
      staticAssetPublicRef
      gradient
      pattern
      contentShadow
      effect
      texture
    }
  }
`)
