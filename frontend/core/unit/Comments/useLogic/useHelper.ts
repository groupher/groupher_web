import { useContext } from 'react'

import { StoreContext as CommentsStoreContext } from '~/stores/comments/context'
import type { TStore as TCommentsStore } from '~/stores/comments/spec'

import { EDIT_MODE } from '../constant'
import type { TEditMode } from '../spec'

type TRet = {
  published: () => void
  resetPublish: (mode: TEditMode) => void
}

/** Exposes helper state and actions through the shared React hook boundary. */
export default function useHelper(): TRet {
  const commentsStore = useContext(CommentsStoreContext) as TCommentsStore | null
  if (!commentsStore) {
    throw new Error('useHelper must be used within a Comments store provider')
  }
  const published = (): void => {
    commentsStore.commit({ publishing: false, publishDone: true })
  }

  const resetPublish = (mode: TEditMode): void => {
    switch (mode) {
      case EDIT_MODE.REPLY: {
        commentsStore.commit({
          showReplyEditor: false,
          replyBody: '{}',
          replyToComment: null,
          publishDone: false,
        })
        return
      }
      case EDIT_MODE.UPDATE: {
        commentsStore.commit({
          showUpdateEditor: false,
          updateInnerId: null,
          updateBody: '{}',
          updateBodyVersion: null,
          publishDone: false,
        })
        return
      }
      default: {
        commentsStore.commit({
          showEditor: false,
          commentBody: '{}',
          publishDone: false,
        })
      }
    }
  }

  return {
    published,
    resetPublish,
  }
}
