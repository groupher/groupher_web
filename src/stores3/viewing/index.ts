import { proxy } from 'valtio'
import { mergeDeepRight } from 'ramda'

import { includes, values, mergeRight } from 'ramda'

import type { TCommunity, TArticle } from '@/spec'
import { ARTICLE_THREAD } from '@/const/thread'

import type { TStore, TInit } from './spec'

export default (init: TInit = {}): TStore => {
  const store = proxy({
    user: init.user || null,
    community: init.community || null,
    post: init.post || null,
    changelog: init.changelog || null,
    activeThread: init.activeThread || ARTICLE_THREAD.POST,
    viewingThread: null,
    communityDigestInView: true,

    get viewingArticle(): TArticle {
      const curThread = store.viewingThread || store.activeThread

      if (includes(curThread, values(ARTICLE_THREAD))) {
        return store[curThread]
      }
      return {}
    },
    // actions
    updateViewingCommunity(args: TCommunity): void {
      store.community = mergeRight(store.community, args)
    },

    commit: (patch: Partial<TStore>): void => {
      Object.assign(store, mergeDeepRight(store, patch))
    },
  })

  return store
}
