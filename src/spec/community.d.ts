import type { TPagi, TID } from './utils'
import type { TSimpleUse } from './account'
import type { TWallpaperData } from './wallpaper'

type TMeta = {
  postsCount: number
  docsCount: number
  blogsCount: number
  changelogsCount: number
}

export type TMediaReport = {
  index: number
  favicon: string
  siteName: string
  title: string
  url: string
  editUrl?: string
}

export type TModerator = {
  role: string
  passportItemCount: number
  user: TSimpleUse
}

export type TDashboard = {
  wallpaper?: TWallpaperData
  baseInfo?: {
    title?: string
    bio?: string
    homepage?: string
  }
  mediaReports?: TMediaReport[]
}

export type TCommunity = {
  id?: string
  index?: number
  title?: string
  logo?: string
  slug: string
  subscribersCount?: number
  articlesCount?: number
  viewerHasSubscribed?: boolean
  contributesDigest?: number[]
  moderatorsCount?: number
  desc?: string
  meta?: TMeta
  threads?: TCommunityThread[]
  pending?: number
  moderators?: TModerator[]
  views?: number

  // TODO:
  dashboard?: TDashboard
}

export type TPagedCommunities = {
  entries: TCommunity[]
} & TPagi

export type TTag = {
  id?: string
  index?: number
  slug: string
  title?: string
  layout?: string
  desc?: string
  thread?: string
  color?: string
  group?: string
  community?: TCommunity
}

export type TFilterTag = {
  id?: string
  index?: number
  slug: string
  title?: string
  color?: string
  group?: string
}

// for cool-guide, awesome sort thing
export type TNaviTag = {
  id: string
  index?: number
  slug: string
  title?: string
  color?: string
  group?: string
  //
  icon?: string
  childMenu?: TNaviTag[]
  extra?: string[]
  fixedIcon?: string
  pinNumber?: number
  displayType?: string
}

export type TGroupedTags = {
  [group: string]: TTag[]
}[]

export type TCategory = {
  id: TID
  title: string
  slug: string
  index: number
  // author: T
}
