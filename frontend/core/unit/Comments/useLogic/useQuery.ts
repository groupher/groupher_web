import { useContext } from 'react'

import { ANCHOR } from '~/const/dom'
import { scrollIntoEle } from '~/dom'
import { browserGraphQLRequest } from '~/graphql/client'
import useViewingArticle from '~/hooks/useViewingArticle'
import { articlePathKey } from '~/query/articlePath'
import {
  createCommentOperation,
  replyCommentOperation,
  updateCommentOperation,
} from '~/query/mutation/comment'
import useOptimisticAction from '~/query/mutation/optimistic/useOptimisticAction'
import type { TComment, TID } from '~/spec'
import useAccount from '~/stores/account/hooks'
import { StoreContext as CommentsStoreContext } from '~/stores/comments/context'
import type { TStore as TCommentsStore } from '~/stores/comments/spec'
import { isWordsCountValid } from '~/ui/WordsCounter/helper'

import { API_MODE, EDIT_MODE } from '../constant'
import { useCommentFeed } from '../pagination/context'
import S from '../schema'
import useHelper from './useHelper'

//
export type TRet = {
  loadComments: (page?: number) => void
  createComment: () => void
  openUpdateEditor: (comment: TComment) => void
  onPageChange: (page: number) => void
  onMentionSearch: (name: string) => void
  replyComment: () => void
  updateComment: () => void
}

/** Exposes query state and actions through the shared React hook boundary. */
export default function useQuery(): TRet {
  const commentsStore = useContext(CommentsStoreContext) as TCommentsStore | null
  if (!commentsStore) {
    throw new Error('useQuery must be used within a Comments store provider')
  }
  const { articlePath } = useViewingArticle()
  const account = useAccount()
  const feed = useCommentFeed()
  const { published, resetPublish } = useHelper()
  const { replyToComment } = commentsStore

  const articleKey = articlePathKey(articlePath)
  const commentScope = {
    community: articlePath.community,
    thread: articlePath.thread,
    articleInnerId: articlePath.innerId,
  }
  const buildArticlePath = () => articlePath

  const buildCommentPath = (commentOrInnerId: TComment | TID) => ({
    article: buildArticlePath(),
    innerId: typeof commentOrInnerId === 'object' ? commentOrInnerId.innerId : commentOrInnerId,
  })

  const createAction = useOptimisticAction(createCommentOperation, {
    scope: commentScope,
    articlePath: buildArticlePath(),
    articleKey,
    author: account.user,
  })
  const replyAction = useOptimisticAction(
    replyCommentOperation,
    replyToComment
      ? {
          scope: commentScope,
          articlePath: buildArticlePath(),
          articleKey,
          author: account.user,
          parentId: String(replyToComment.innerId),
          parent: replyToComment,
        }
      : null,
  )
  const updateAction = useOptimisticAction(
    updateCommentOperation,
    commentsStore.updateInnerId
      ? {
          comment: {
            bodyVersion: commentsStore.updateBodyVersion ?? undefined,
            innerId: String(commentsStore.updateInnerId),
          } as TComment,
          scope: commentScope,
          articlePath: buildArticlePath(),
          articleKey,
          commentInnerId: String(commentsStore.updateInnerId),
          commentPath: buildCommentPath(commentsStore.updateInnerId),
        }
      : null,
  )

  const loadComments = (page = 1): void => {
    feed.setPage(page)
  }

  const openUpdateEditor = (comment: TComment): void => {
    commentsStore.commit({ showUpdateEditor: true })
    browserGraphQLRequest(S.oneComment, {
      comment: buildCommentPath(comment),
    }).then(({ oneComment }) => {
      if (!oneComment?.innerId) return
      commentsStore.commit({
        updateInnerId: oneComment.innerId,
        updateBody: oneComment.body?.json ?? '',
        updateBodyVersion: oneComment.bodyVersion ?? null,
      })
    })
  }

  /**
   * load the same mode when page change
   */
  const onPageChange = (page = 1): void => {
    const { apiMode } = commentsStore
    if (apiMode === API_MODE.ARTICLE) {
      feed.setPage(page)
      loadComments(page)
    }

    scrollIntoEle(ANCHOR.COMMENTS_ID)
  }

  const onMentionSearch = (_name: string): void => {
    console.log('## TODO: onMentionSearch')
    // if (name?.length >= 1) {
    //   query(S.searchUsers, { name })
    // } else {
    //   snap.updateMentionList([])
    // }
  }

  const replyComment = (): void => {
    const { replyToComment, replyBody } = commentsStore
    if (!replyToComment) return

    commentsStore.commit({ publishing: true })
    void replyAction
      .submit(replyBody)
      .then(() => {
        published()
        setTimeout(() => resetPublish(EDIT_MODE.REPLY), 500)
      })
      .catch(() => {
        commentsStore.commit({ publishing: false })
      })
  }

  const createComment = (): void => {
    if (!isWordsCountValid(commentsStore.commentBody, 10, 1000)) return
    commentsStore.commit({ publishing: true })
    void createAction
      .submit(commentsStore.commentBody)
      .then(() => {
        published()
        setTimeout(() => resetPublish(EDIT_MODE.CREATE), 500)
      })
      .catch(() => {
        commentsStore.commit({ publishing: false })
      })
  }

  const updateComment = (): void => {
    if (!isWordsCountValid(commentsStore.updateBody, 10, 1000)) return
    if (!commentsStore.updateInnerId) return

    commentsStore.commit({ publishing: true })
    void updateAction
      .submit(commentsStore.updateBody)
      .then(() => {
        published()
        setTimeout(() => resetPublish(EDIT_MODE.UPDATE), 500)
      })
      .catch(() => {
        commentsStore.commit({ publishing: false })
      })
  }

  return {
    loadComments,
    createComment,
    openUpdateEditor,
    onPageChange,
    onMentionSearch,
    replyComment,
    updateComment,
  }
}
