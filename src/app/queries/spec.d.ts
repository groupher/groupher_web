import type { TCommunity, TWallpaperData } from '@/spec'

export type TCommunityRes = TGQSSRResult & { community: TCommunity }

export type TSSRQueryOpt = {
  skip?: boolean
  // cache-first is the default
  policy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only'
}

export type TGQSSRResult = {
  error: boolean
  fetching: boolean
  stale: boolean
}

export type TParsedWallpaper = TWallpaperData & {
  initWallpaper: TWallpaperData
}
