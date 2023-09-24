import type { TCommunity, TTag } from '.'
import type { TUser, TAccount, TSimpleUser } from './account'
import type { TID } from './utils'
import type { TEmotion } from './emotion'

export type TCopyright = 'cc' | 'approve' | 'forbid'

export type TArticleMeta = {
  thread?: string
  citingCount?: number
  isCommentLocked?: boolean
  isEdited?: boolean
  lastActiveAt?: string
  latestUpvotedUsers?: TUser[]
  isLegal?: boolean
  illegalReason?: string[]
  illegalWords?: string[]
}

export type TDocument = {
  bodyHtml?: string
  body?: string
}

export type TViewingInfo = {
  community: string
  id: TID
}

type TBaseArticle = {
  id?: TID
  innerId?: TID
  title?: string
  digest?: string
  body?: string
  views?: number
  copyRight?: string
  isQuestion?: boolean
  isPinned?: boolean
  author?: TAccount
  upvotesCount?: number
  originalCommunity?: TCommunity
  originalCommunitySlug?: string
  communities?: TCommunity[]
  commentsParticipants?: TUser[]
  commentsParticipantsCount?: number
  insertedAt?: string
  updatedAt?: string
  viewerHasViewed?: boolean
  viewerHasCollected?: boolean
  viewerHasUpvoted?: boolean
  commentsCount?: number
  articleTags?: TTag[]
  meta?: TArticleMeta
  document?: TDocument
  linkAddr?: string
  isArchived?: boolean
  archivedAt?: string
  activeAt?: string

  cat?: TArticleCat
  state?: TArticleState

  // for dashboard cmd tmp check state
  _checked?: boolean
}

export type TPost = TBaseArticle & {
  digest?: string
}

export type TChangelog = TBaseArticle & {
  digest?: string
}

export type TTechStack = {
  title?: string
  logo: string
  slug: string
  category?: string
}
type TCity = {
  title: string
  logo?: string
  link: string
  desc?: string
}

export type TSocialInfo = { platform: string; link: string }

export type TTechCommunities = {
  lang?: TCommunity[]
  framework?: TCommunity[]
  database?: TCommunity[]
  devOps?: TCommunity[]
  design?: TCommunity[]
}

export type TArticle = TPost
export type TArticleEntries = TPost[] | TChangelog[]

type TPagi = {
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export type TPagedArticles = {
  entries: TArticleEntries
} & TPagi

export type TComment = {
  id: string
  thread?: string
  isPinned?: boolean
  floor?: number
  bodyHtml?: string
  insertedAt?: string
  updatedAt?: string
  author?: TUser
  repliesCount?: number
  replies?: TComment[]
  replyTo?: TComment
  replyToId?: TID
  upvotesCount?: number
  viewerHasUpvoted?: boolean
  isArticleAuthor?: boolean
  emotions?: TEmotion
  meta?: {
    isArticleAuthorUpvoted?: boolean
    isReplyToOthers?: boolean
    isLegal?: boolean
    illegalReason?: string[]
    illegalWords?: string[]
  }
  article?: {
    id?: string
    title?: string
    thread?: string
    author?: {
      login
      nickname
      avatar
    }
  }
}

export type TPagedComments = {
  entries: TComment[]
} & TPagi

export type TArticleFilter = {
  when?: string
  sort?: string
  length?: string
  read?: string
}

export type TArticleFilterMode = 'default' | 'modeline'

export type TArticleCatMode = 'filter' | 'full'
export type TArticleStateMode = 'filter' | 'full'

export type TUpvoteLayout =
  | 'default'
  | 'comment'
  | 'article'
  | 'post_list'
  | 'general'
  | 'simple'
  | 'fixed_header'
  | 'sticker'
  | 'post_minimal'

export type TCollectionFolder = {
  id: TID
  title: string
  desc?: string
  totalCount: number
  private: boolean
  updatedAt: string
}

export type TPagedCollectionFolder = {
  entries: TCollectionFolder[]
} & TPagi

export type TCommentsState = {
  isViewerJoined: boolean
  participantsCount: number
  totalCount: number
  participants: TSimpleUser[]
}

export type TArticleCatReject =
  | 'REJECT_DUP'
  | 'REJECT_NO_PLAN'
  | 'REJECT_NO_FIX'
  | 'REJECT_REPRO'
  | 'REJECT_STALE'

export type TArticleState =
  | 'ALL'
  | 'TODO'
  | 'WIP'
  | 'DONE'
  | 'RESOLVED'
  | 'DEFAULT'
  | TArticleCatReject

export type TArticleCat = 'ALL' | 'BUG' | 'FEATURE' | 'QUESTION' | 'OTHER'

export type TArticlePubSelector = {
  cat?: TArticleCat | null
  tag?: TTag | null
}

export type TFAQSection = {
  title: string
  body: string
  index: number
}
