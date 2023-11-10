import { TCommunity } from '@/spec'
import type { TGQSSRResult, TParsedWallpaper } from './spec'

export const DEFAULT_OPTION = {
  skip: false,
  policy: 'cache-first',
}

export const commonRes = (result): TGQSSRResult => {
  return {
    fetching: result.fetching,
    error: result.error,
    stale: result.stale,
  }
}

export const parseWallpaper = (community: TCommunity): TParsedWallpaper => {
  const { dashboard } = community
  const { wallpaper } = dashboard

  return {
    ...wallpaper,
    initWallpaper: {
      ...wallpaper,
    },
  }
}
