import { THREAD } from '@/constant/thread'
import { T } from '@/mobx'

import { User, PagedUsers } from '../User'
import { SimpleUser } from '../Common'
import { Community } from '../Community'
import { Comment } from '../Comment'
import { Tag } from '../Tag'

const ArticleMeta = T.model('ArticleMeta', {
  thread: T.opt(T.string, THREAD.POST),
  isEdited: T.opt(T.bool, false),
  isCommentLocked: T.opt(T.bool, false),
  lastActiveAt: T.opt(T.string, ''),
  citingCount: T.opt(T.number, 0),
  latestUpvotedUsers: T.opt(T.array(SimpleUser), []),
  isLegal: T.opt(T.bool, true),
  illegalReason: T.opt(T.array(T.string), []),
  illegalWords: T.opt(T.array(T.string), []),
})

export const Document = T.model('ArticleMeta', {
  bodyHtml: T.opt(T.string, ''),
  body: T.maybeNull(T.string),
  // toc:
  // body
})

/**
 * common article fields for post/job/blog/radar/works ...
 */
export const articleFields = () => {
  return {
    id: T.maybeNull(T.string),
    innerId: T.maybeNull(T.string),
    originalCommunitySlug: T.maybeNull(T.string),
    title: T.opt(T.string, ''),
    document: T.opt(Document, {}),
    digest: T.maybeNull(T.string),
    author: T.maybeNull(User),

    // meta: T.opt(ArticleMeta, {}),
    meta: T.maybeNull(ArticleMeta),

    linkAddr: T.maybeNull(T.string),
    copyRight: T.maybeNull(T.string),

    communities: T.opt(T.array(Community), []),
    originalCommunity: T.opt(Community, {}),
    articleTags: T.opt(T.array(Tag), []),
    comments: T.opt(T.array(Comment), []),

    commentsCount: T.opt(T.number, 0),
    commentsParticipantsCount: T.opt(T.number, 0),
    commentsParticipants: T.opt(T.array(User), []),

    pagedCommentsParticipators: T.opt(PagedUsers, {}),

    views: T.opt(T.number, 0),
    isPinned: T.maybeNull(T.bool),

    collectsCount: T.opt(T.number, 0),
    upvotesCount: T.opt(T.number, 0),

    viewerHasCollected: T.opt(T.bool, false),
    viewerHasUpvoted: T.opt(T.bool, false),

    viewerHasViewed: T.opt(T.bool, false),

    insertedAt: T.opt(T.string, ''),
    updatedAt: T.opt(T.string, ''),
    // activeAt: T.opt(T.string, ''),
    activeAt: T.maybeNull(T.string),

    isArchived: T.opt(T.bool, false),
    archivedAt: T.maybeNull(T.string),
  }
}

export const holder = 1
