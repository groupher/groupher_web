import { values, reduce, mergeRight } from 'ramda'

import EMOTION from '~/const/emotion'
import { titleCase } from '~/fmt'
import { T } from '~/mobx'

import { SimpleUser } from './Common'

import { pagiFields, timestampFields } from './helper/common'

const commentEmotionFields = () => {
  return reduce(
    mergeRight,
    {},
    values(EMOTION).map((emotion) => {
      return {
        [`${emotion}Count`]: T.maybeNull(T.number),
        [`latest${titleCase(emotion)}Users`]: T.opt(T.array(SimpleUser), []),
        [`viewerHas${titleCase(emotion)}ed`]: T.opt(T.bool, false),
      }
    }),
  )
}

const CommentEmotion = T.model('CommentEmotion', commentEmotionFields())

const CommentMeta = T.model('CommentMeta', {
  isArticleAuthorUpvoted: T.opt(T.bool, false),
  isReplyToOthers: T.opt(T.bool, false),
  isLegal: T.opt(T.bool, true),
  illegalReason: T.opt(T.array(T.string), []),
  illegalWords: T.opt(T.array(T.string), []),
})

const ParentArticle = T.model('ParentArticle', {
  id: T.maybeNull(T.string),
  title: T.opt(T.string, ''),
  thread: T.opt(T.string, ''),
  author: T.opt(SimpleUser, {}),
})

const commentBaseFields = () => {
  return {
    id: T.maybeNull(T.string),
    bodyHtml: T.maybeNull(T.string),
    author: T.opt(SimpleUser, {}),
    isPinned: T.opt(T.bool, false),
    floor: T.number,
    upvotesCount: T.opt(T.number, 0),
    isArticleAuthor: T.opt(T.bool, false),
    thread: T.opt(T.string, ''),
    emotions: T.opt(CommentEmotion, {}),
    meta: T.opt(CommentMeta, {}),
    repliesCount: T.opt(T.number, 0),

    replyToId: T.maybeNull(T.string),
    viewerHasUpvoted: T.maybeNull(T.bool),

    article: T.maybeNull(ParentArticle),

    ...timestampFields(),
  }
}

export const CommentReplyTo = T.model('CommentReplyTo', {
  author: T.opt(SimpleUser, {}),
  floor: T.number,
})

export const CommentReply = T.model('CommentReply', {
  ...commentBaseFields(),
  replyTo: T.maybeNull(CommentReplyTo),
})

export const Comment = T.model('Comment', {
  ...commentBaseFields(),
  replies: T.maybeNull(T.array(CommentReply)),
  replyTo: T.maybeNull(CommentReply),
  // field(:article, :common_article)

  isDeleted: T.opt(T.bool, false),
  isForQuestion: T.opt(T.bool, false),
  isArchived: T.opt(T.bool, false),
  archivedAt: T.opt(T.bool, false),
})

export const PagedComments = T.model('PagedComments', {
  entries: T.opt(T.array(Comment), []),
  ...pagiFields(),
})
