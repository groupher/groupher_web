/*
 * DocThread store
 */

import type { TCommunity, TDocFAQLayout, TDocLayout, TFAQSection, TRootStore } from '@/spec'
import { T, getParent, markStates, type Instance, toJS, useMobxContext } from '@/mobx'

const DocThread = T.model('DocThread', {
  isArticleLayout: T.opt(T.bool, false),
  isFAQArticleLayout: T.opt(T.bool, true),
})
  .views((self) => ({
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore

      return toJS(root.viewing.community)
    },
    get faqSections(): TFAQSection[] {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.faqSections)
    },
    get layout(): TDocLayout {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.docLayout)
    },
    get faqLayout(): TDocFAQLayout {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.docFaqLayout)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof DocThread>
export const useStore = (): TStore => useMobxContext().store.docThread

export default DocThread
