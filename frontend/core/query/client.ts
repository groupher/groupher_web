import { activityQueries } from './activity'
import { articleQueries } from './article'
import { commentQueries } from './comment'
import { communityQueries } from './community'
import { dsbQueries } from './dsb'
import { viewerQueries } from './viewer'
import { wallpaperQueries } from './wallpaper'

export const Q = {
  activity: activityQueries,
  article: articleQueries,
  comment: commentQueries,
  community: communityQueries,
  dsb: dsbQueries,
  viewer: viewerQueries,
  wallpaper: wallpaperQueries,
}
