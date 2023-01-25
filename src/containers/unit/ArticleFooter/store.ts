/*
 * ArticleFooter store
 *
 */

// import {} from 'ramda'

import type { TArticle, TRootStore, TAvatarLayout } from '@/spec'
import { T, markStates, Instance, getParent } from '@/utils/mobx'

const ArticleFooter = T.model('ArticleFooter', {
  hasFollowedAuthor: T.opt(T.bool, false),
  actionPanelType: T.opt(T.enum(['reference-list', 'operation-list']), 'operation-list'),
})
  .views((self) => ({
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return root.viewingArticle
    },
    get avatarLayout(): TAvatarLayout {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.avatarLayout
    },
  }))
  .actions((self) => ({
    reset(): void {
      self.hasFollowedAuthor = false
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ArticleFooter>
export default ArticleFooter
