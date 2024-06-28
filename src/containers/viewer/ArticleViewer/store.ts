/*
 * ArticleViewer store
 */

import type { TCommunity, TRootStore, TArticle, TThread, TDocument } from '~/spec'

import { T, getParent, markStates, type Instance, toJS, useMobxContext } from '~/mobx'
import { Document } from '~/model'

const ArticleViewer = T.model('ArticleViewer', {
  loading: T.opt(T.bool, false),
  tab: T.opt(T.string, ''),
  // blog-spec
  document: T.opt(Document, {}),
})
  .views((self) => ({
    get documentData(): TDocument {
      return toJS(self.document)
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get activeThread(): TThread {
      const root = getParent(self) as TRootStore

      return root.viewing.activeThread
    },
    get viewingArticle(): TArticle {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.viewingArticle)
    },
  }))
  .actions((self) => ({
    setViewing(sobj): void {
      const root = getParent(self) as TRootStore
      root.setViewing(sobj)
    },
    syncArticle(item): void {
      const root = getParent(self) as TRootStore

      root.articles.updateArticle(item)
    },
    reset(): void {
      self.tab = ''
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof ArticleViewer>
// @ts-ignore
export const useStore = (): TStore => useMobxContext().store.articleViewer

export default ArticleViewer
