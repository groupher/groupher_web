import { useSnapshot } from 'valtio'
import { update, propEq, findIndex, uniqBy, prop } from 'ramda'

import type { TID, TComment } from '~/spec'
import { ANCHOR } from '~/const/dom'
import useViewingArticle from '~/hooks/useViewingArticle'
import { query } from '~/utils/api'
import uid from '~/utils/uid'
import { scrollIntoEle } from '~/dom'

import { MODE, API_MODE } from '../constant'

import store from './store'

import S from '../schema'
//
export type TRet = {
  loadComments: (page?: number) => void
  loadCommentReplies: (id: TID) => void
  loadCommentsState: () => void
  loadPublishedComemnts: () => void
  onPageChange: (page: number) => void
  onMentionSearch: (name: string) => void
  deleteComment: () => void
}

let repliesPagiNo = {}
const PAGI_SIZE = 30

export default (): TRet => {
  const snap = useSnapshot(store)
  const { article } = useViewingArticle()

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
    store.commit({ loading: true })

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

      if (store.needRefreshState) {
        loadCommentsState()
      }
    })
  }

  const _getRepliesPagiNo = (parentId: TID): number => {
    const curNo = repliesPagiNo[parentId]

    return curNo ? curNo + 1 : 1
  }

  const _addToReplies = (replies: TComment[]): void => {
    const { repliesParentId } = snap
    const { entries } = snap.pagedComments

    if (snap.mode === MODE.REPLIES && repliesParentId) {
      const parentIndex = findIndex(propEq(repliesParentId, 'id'), entries)

      if (parentIndex < 0) return
      const curReplies = entries[parentIndex].replies
      const uniqReplies = uniqBy(prop('id'), curReplies.concat(replies))

      // @ts-ignore
      const pagedComments = update(parentIndex, uniqReplies, snap.pagedComments.entries)
      // @ts-ignore
      snap.commit({ pagedComments })

      // self.pagedComments.entries[parentIndex].replies = uniqReplies
    }
  }

  const loadCommentReplies = (id: TID): void => {
    const filter = { page: _getRepliesPagiNo(id), size: 30 }
    const params = { id, filter }

    store.commit({ repliesParentId: id, repliesLoading: true })
    console.log('## loadCommentReplies args: ', params)
    query(S.pagedCommentReplies, params).then(({ pagedCommentReplies }) => {
      _addToReplies(pagedCommentReplies.entries)

      repliesPagiNo[store.repliesParentId] = pagedCommentReplies.pageNumber
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
    //   store.updateMentionList([])
    // }
  }

  const deleteComment = (): void => {
    console.log('## TODO: deleteComment')
    // mutate(S.deleteComment, {
    //   thread: store.activeThread,
    // })
  }

  return {
    loadComments,
    loadCommentReplies,
    loadCommentsState,
    loadPublishedComemnts,
    onPageChange,
    onMentionSearch,
    deleteComment,
  }
}
