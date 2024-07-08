import { useSnapshot } from 'valtio'

import type { TID, TComment, TEmotionType } from '~/spec'
import { ANCHOR } from '~/const/dom'
import useViewingArticle from '~/hooks/useViewingArticle'
import { query, mutate } from '~/utils/api'
import { titleCase } from '~/fmt'
import uid from '~/utils/uid'
import { scrollIntoEle } from '~/dom'

import { API_MODE } from '../constant'
import S from '../schema'

import useHelper from './useHelper'
import store from './store'

//
export type TRet = {
  loadComments: (page?: number) => void
  loadCommentReplies: (id: TID) => void
  loadCommentsState: () => void
  loadPublishedComemnts: () => void
  onPageChange: (page: number) => void
  onMentionSearch: (name: string) => void
  deleteComment: () => void
  handleEmotion: (comment: TComment, name: TEmotionType, viewerHasEmotioned: boolean) => void
  handleUpvote: (comment: TComment, viewerHasUpvoted: boolean) => void
}

let repliesPagiNo = {}
const PAGI_SIZE = 30

export default (): TRet => {
  const snap = useSnapshot(store)
  const { article } = useViewingArticle()
  const { addToReplies, upvoteEmotion, updateOneComment } = useHelper()

  const loadCommentsState = (): void => {
    const params = {
      id: article.id,
      thread: article.meta.thread,
      freshkey: uid.gen(),
    }

    console.log('## loadCommentsState args: ', params)
    query(S.commentsState, params).then(({ commentsState }) => {
      snap.commit({ ...commentsState })
    })
  }

  const loadPublishedComemnts = (page = 1): void => {
    console.log('## TODO')
  }

  const loadComments = (page = 1): void => {
    snap.commit({ loading: true })

    const params = {
      id: article.id,
      thread: article.meta.thread,
      mode: snap.mode,
      filter: { page, size: PAGI_SIZE },
    }
    // console.log('## loadComments args: ', args)
    query(S.pagedComments, params).then(({ pagedComments }) => {
      repliesPagiNo = {}
      snap.commit({ pagedComments, loading: false })

      if (snap.needRefreshState) {
        loadCommentsState()
      }
    })
  }

  const _getRepliesPagiNo = (parentId: TID): number => {
    const curNo = repliesPagiNo[parentId]

    return curNo ? curNo + 1 : 1
  }

  const loadCommentReplies = (id: TID): void => {
    const filter = { page: _getRepliesPagiNo(id), size: 30 }
    const params = { id, filter }

    snap.commit({ repliesParentId: id, repliesLoading: true })
    console.log('## loadCommentReplies args: ', params)
    query(S.pagedCommentReplies, params).then(({ pagedCommentReplies }) => {
      addToReplies(pagedCommentReplies.entries)

      repliesPagiNo[snap.repliesParentId] = pagedCommentReplies.pageNumber
      snap.commit({ repliesParentId: null, repliesLoading: false })
    })
  }

  /**
   * load the same mode when page change
   */
  const onPageChange = (page = 1): void => {
    const { apiMode } = snap
    if (apiMode === API_MODE.ARTICLE) {
      snap.commit({ needRefreshState: false })
      loadComments(page)
    } else {
      loadPublishedComemnts(page)
    }

    scrollIntoEle(ANCHOR.COMMENTS_ID)
  }

  const onMentionSearch = (name: string): void => {
    console.log('## TODO: onMentionSearch')
    // if (name?.length >= 1) {
    //   query(S.searchUsers, { name })
    // } else {
    //   snap.updateMentionList([])
    // }
  }

  const deleteComment = (): void => {
    console.log('## TODO: deleteComment')
    // mutate(S.deleteComment, {
    //   thread: snap.activeThread,
    // })
  }

  const handleEmotion = (
    comment: TComment,
    name: TEmotionType,
    viewerHasEmotioned: boolean,
  ): void => {
    const { id } = comment
    const emotion = name.toUpperCase()

    // comment.emotions
    if (viewerHasEmotioned) {
      // instantFresh
      const emotionInfo = {
        // @ts-ignore
        [`${name}Count`]: comment.emotions[`${name}Count`] - 1,
        [`viewerHas${titleCase(name)}ed`]: false,
      }
      upvoteEmotion(comment, emotionInfo)
      mutate(S.undoEmotionToComment, { id, emotion }).then(({ undoEmotionToComment }) => {
        upvoteEmotion(undoEmotionToComment, undoEmotionToComment.emotions)
      })
    } else {
      const emotionInfo = {
        // @ts-ignore
        [`${name}Count`]: comment.emotions[`${name}Count`] + 1,
        [`viewerHas${titleCase(name)}ed`]: true,
      }
      upvoteEmotion(comment, emotionInfo)
      // instantFresh
      mutate(S.emotionToComment, { id, emotion }).then(({ emotionToComment }) => {
        upvoteEmotion(emotionToComment, emotionToComment.emotions)
      })
    }
  }

  const handleUpvote = (comment: TComment, viewerHasUpvoted: boolean): void => {
    const { id, upvotesCount } = comment

    const updateBack = (upvoteComment: TComment) => {
      const { upvotesCount, viewerHasUpvoted, meta } = upvoteComment

      updateOneComment(upvoteComment, {
        upvotesCount,
        viewerHasUpvoted,
        meta,
      })
    }

    if (viewerHasUpvoted) {
      updateOneComment(comment, {
        upvotesCount: upvotesCount + 1,
        viewerHasUpvoted: !viewerHasUpvoted,
      })
      mutate(S.upvoteComment, { id }).then(({ upvoteComment }) => updateBack(upvoteComment))
    } else {
      updateOneComment(comment, {
        upvotesCount: upvotesCount - 1,
        viewerHasUpvoted: !viewerHasUpvoted,
      })

      mutate(S.undoUpvoteComment, { id }).then(({ undoUpvoteComment }) => {
        updateBack(undoUpvoteComment)
      })
    }
  }

  return {
    loadComments,
    loadCommentReplies,
    loadCommentsState,
    loadPublishedComemnts,
    onPageChange,
    onMentionSearch,
    deleteComment,
    handleEmotion,
    handleUpvote,
  }
}
