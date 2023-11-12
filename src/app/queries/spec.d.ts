import type {
  TCommunity,
  TWallpaperData,
  TPagedArticles,
  TTag,
  TDashboardPath,
  TDashboardBaseInfoRoute,
  TDashboardSEORoute,
  TDashboardDocRoute,
  TDashboardBroadcastRoute,
  TDashboardLayoutRoute,
  TDashboardAliasRoute,
  TArticle,
} from '@/spec'

export type TSessionRes = TGQSSRResult & {
  sesstion: {
    theme: {
      curTheme: string
    }
    account: {
      user: TUser
      isValidSession: boolean
    }
  }
}
export type TCommunityRes = TGQSSRResult & { community: TCommunity }
export type TTagsRes = TGQSSRResult & { tags: TTag[] }
export type TPagedPostsRes = TGQSSRResult & { pagedPosts: TPagedArticles }
export type TPostRes = TGQSSRResult & { post: TArticle }
export type TChangelogRes = TGQSSRResult & { changelog: TArticle }
export type TPagedChangelogsRes = TGQSSRResult & { pagedChangelogs: TPagedArticles }

export type TGroupedKanbanPostsRes = TGQSSRResult & {
  groupedKanbanPosts: {
    todo: TPagedArticles
    wip: TPagedArticles
    done: TPagedArticles
  }
}

export type TRequestPolicy = 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only'

export type TSSRQueryOpt = {
  skip?: boolean
  // cache-first is the default
  requestPolicy?: TRequestPolicy
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

export type TDashboardTab = {
  curTab: TDashboardPath
  baseInfoTab?: TDashboardBaseInfoRoute
  seoTab?: TDashboardSEORoute
  docTab?: TDashboardDocRoute
  broadcastTab?: TDashboardBroadcastRoute
  layoutTab?: TDashboardLayoutRoute
  aliasTab?: TDashboardAliasRoute
}
