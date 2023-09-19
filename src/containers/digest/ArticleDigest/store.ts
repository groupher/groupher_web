/*
 * ArticleDigest store
 *
 */

import { merge } from 'ramda'

import type { TRootStore, TThread, TArticle } from '@/spec'
import TYPE from '@/constant/type'

import { T, getParent, markStates, toJS, Instance } from '@/mobx'

const ArticleDigest = T.model('ArticleDigest', {
  loading: T.opt(T.bool, false),
  viewerHasSubscribed: T.opt(T.bool, false),
  subscribersCount: T.opt(T.number, -1),

  action: T.opt(T.enum('action', [TYPE.FAVORITE, TYPE.STAR]), TYPE.FAVORITE),
  scrollDirection: T.opt(T.enum('scrollDirection', ['up', 'down']), 'down'),
  inViewport: T.opt(T.bool, true),
})
  .views((self) => ({
    get isMobile(): boolean {
      const root = getParent(self) as TRootStore

      return root.isMobile
    },
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      const article = toJS(root.viewing.viewingArticle)
      const slf = self as TStore

      if (!slf.isLogin) {
        return toJS(article)
      }

      const { viewerHasSubscribed, subscribersCount } = self
      const originalCommunity = merge(article.originalCommunity, {
        viewerHasSubscribed,
        subscribersCount:
          subscribersCount === -1 ? article.originalCommunity.subscribersCount : subscribersCount,
      })

      // @ts-ignore
      return merge(article, { originalCommunity })
    },
    get activeThread(): TThread {
      const root = getParent(self) as TRootStore

      const { activeThread } = root.viewing
      return activeThread
    },
    get starLoading(): boolean {
      const { action, loading } = self
      if (action === TYPE.STAR && loading) return true
      return false
    },
    get favoriteLoading(): boolean {
      const { action, loading } = self
      if (action === TYPE.FAVORITE && loading) return true
      return false
    },
  }))
  .actions((self) => ({
    authWarning(options): void {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    syncArticle(item): void {
      const root = getParent(self) as TRootStore
      root.viewing.syncArticle(item)
    },
    reset(): void {
      self.subscribersCount = -1
      self.viewerHasSubscribed = false
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ArticleDigest>
export default ArticleDigest
