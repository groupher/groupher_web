import type { TCommunity, TWallpaperData, TPagedArticles, TTag } from '@/spec'

export type TCommunityRes = TGQSSRResult & { community: TCommunity }
export type TTagsRes = TGQSSRResult & { tags: TTag[] }
export type TPagedPostsRes = TGQSSRResult & { pagedPosts: TPagedArticles }
export type TPagedChangelogsRes = TGQSSRResult & { pagedChangelogs: TPagedArticles }

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

export type TTagsFilter = {
  community?: string
  thread?: string
}

export type TArticlesFIlter = {
  page?: number
  size?: number
  community?: string
}
