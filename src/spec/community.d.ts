import type { TID } from './utils'
import type { TSimpleUse } from './account'

type TMeta = {
  postsCount: number
  docsCount: number
  blogsCount: number
  changelogsCount: number
}

export type TModerator = {
  role: string
  passportItemCount: number
  user: TSimpleUse
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
}

export type TPagedCommunities = {
  entries: TCommunity[]
  totalCount?: number
  pageNumber?: number
  pageSize?: number
}

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
