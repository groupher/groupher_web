import { gql } from 'urql/core'

const updateDashboardWallpaper = gql`
  mutation (
    $community: String!
    $wallpaper: String
    $wallpaperType: String
    $direction: String
    $customColorValue: String
    $bgSize: String
    $uploadBgImage: String
    $hasPattern: Boolean
    $hasBlur: Boolean
    $hasShadow: Boolean
  ) {
    updateDashboardWallpaper(
      community: $community
      wallpaper: $wallpaper
      wallpaperType: $wallpaperType
      direction: $direction
      customColorValue: $customColorValue
      bgSize: $bgSize
      uploadBgImage: $uploadBgImage
      hasPattern: $hasPattern
      hasBlur: $hasBlur
      hasShadow: $hasShadow
    ) {
      slug
      dashboard {
        wallpaper {
          wallpaperType
          wallpaper
          direction
          customColorValue
          bgSize
          uploadBgImage
          hasPattern
          hasBlur
          hasShadow
        }
      }
    }
  }
`

const schema = {
  updateDashboardWallpaper,
}

export default schema
