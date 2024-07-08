//

import { useSnapshot } from 'valtio'
import { isEmpty, pick, keys, reject, equals } from 'ramda'

import type { TID } from '~/spec'
import BStore from '~/utils/bstore'

import store from './store'
import type { TStore } from './spec'

import useQuery, { type TRet as TQuery } from './useQuery'

type TRet = {
  clearDraft: () => void
  onReplyEditorClose: () => void
  saveDraftIfNeed: (content) => void
  foldComment: (id: TID) => void
  expandComment: (id: TID) => void
  foldAllComments: () => void
  expandAllComments: () => void
} & TStore &
  TQuery

export default (): TRet => {
  const snap = useSnapshot(store)
  const queryActions = useQuery()

  const onReplyEditorClose = (): void => {
    snap.commit({ showReplyEditor: false })
  }

  const saveDraftIfNeed = (content): void => {
    if (isEmpty(content)) return
    const curDraftContent = BStore.get('recentDraft')

    if (curDraftContent !== content) BStore.set('recentDraft', content)
  }

  const clearDraft = (): void => BStore.remove('recentDraft')

  const foldComment = (id: TID): void => {
    const foldedCommentIds = [id, ...snap.foldedCommentIds]
    snap.commit({ foldedCommentIds })
  }

  const expandComment = (id: TID): void => {
    const foldedCommentIds = reject(equals(id), snap.foldedCommentIds) as string[]
    snap.commit({ foldedCommentIds })
  }

  // 只在 timeline 模式可用
  const foldAllComments = (): void => {
    const foldedCommentIds = snap.pagedComments.entries.map((c) => c.id)
    snap.commit({ foldedCommentIds })
  }

  // 只在 timeline 模式可用
  const expandAllComments = (): void => snap.commit({ foldedCommentIds: [] })

  return {
    ...queryActions,
    onReplyEditorClose,
    saveDraftIfNeed,
    clearDraft,
    foldComment,
    expandComment,
    foldAllComments,
    expandAllComments,
    ...pick(keys(snap), snap),
    // @ts-ignore
    replyToComment: {
      ...snap.replyToComment,
    },
  }
}
