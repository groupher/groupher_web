/*
 * DocThread store
 */

import type { TCommunity, TDocFAQLayout, TDocLayout, TFAQSection, TRootStore } from '@/spec'
import { buildLog } from '@/utils/logger'
import { T, getParent, markStates, Instance, toJS } from '@/mobx'

/* eslint-disable-next-line */
const log = buildLog('S:DocThread')

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

      return toJS(root.dashboardThread.uiSettings.docLayout)
    },
    get faqLayout(): TDocFAQLayout {
      const root = getParent(self) as TRootStore

      return toJS(root.dashboardThread.uiSettings.docFaqLayout)
    },
  }))
  .actions((self) => ({
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof DocThread>
export default DocThread
