/*
 * ArticleContent store
 *
 */

import type { TRootStore, TRoute, TArticle } from '@/spec'

import { T, getParent, markStates, Instance } from '@/mobx'
import { buildLog } from '@/utils/logger'

/* eslint-disable-next-line */
const log = buildLog('S:ArticleContentStore')

const ArticleContent = T.model('ArticleContent', {
  articleInViewport: T.opt(T.bool, true),
})
  .views((self) => ({
    get curRoute(): TRoute {
      const root = getParent(self) as TRootStore
      return root.curRoute
    },
    get isLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.account.isLogin
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return root.viewingArticle
    },
  }))
  .actions((self) => ({
    setViewing(sobj: Record<string, unknown>): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ArticleContent>
export default ArticleContent
