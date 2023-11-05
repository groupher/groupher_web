/*
 * GlobalLayout store
 *
 */
import { merge } from 'ramda'

import type { TRootStore, TGlobalLayout, TThemeName, TArticle, TArticleMeta } from '@/spec'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'

const Platform = T.model('Platform', {
  isChrome: T.opt(T.bool, true),
  isFirefox: T.opt(T.bool, false),
  isSafari: T.opt(T.bool, false),
  isIE: T.opt(T.bool, false),
  isEdge: T.opt(T.bool, false),
})

const GlobalLayout = T.model('GlobalLayoutStore', {
  online: T.opt(T.bool, true),
  platform: T.opt(Platform, {}),
  isMobile: T.opt(T.bool, false),
  // follow the mac convention
  bodyScrollDirection: T.opt(T.enum(['up', 'down']), 'up'),
})
  .views((self) => ({
    get globalLayout(): TGlobalLayout {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.globalLayout
    },

    get curTheme(): TThemeName {
      const root = getParent(self) as TRootStore
      return root.theme.curTheme
    },

    get showDashboardAlert(): boolean {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.demoAlertEnable
    },
  }))
  .actions((self) => ({
    loadDemoSetting(): void {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.afterCreate()
    },
    syncArticle(article: TArticle): void {
      const root = getParent(self) as TRootStore
      const viewingArticle = toJS(root.viewingArticle)
      const updatedArticle = merge(viewingArticle, article)

      root.viewing.updateViewing(updatedArticle)
      root.articlesThread.updateArticle(updatedArticle)
    },
    setViewingAlways(article: TArticle): void {
      const root = getParent(self) as TRootStore
      root.viewing.updateViewing(article)
    },
    updateViewerHasUpvoted(viewerHasUpvoted: boolean): void {
      const root = getParent(self) as TRootStore
      root.viewing.updateViewerUpvoted(viewerHasUpvoted)
    },
    syncUploadInfo(upvotesCount: number, meta: TArticleMeta): void {
      const root = getParent(self) as TRootStore

      // for viewing article
      root.viewing.updateUpvoteCount(upvotesCount, meta)
      const { id, viewerHasUpvoted, meta: viewingArticleMeta } = toJS(root.viewingArticle)
      const syncMeta = merge(viewingArticleMeta, meta)
      // for viewing article end

      root.articlesThread.updateArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
    },
    clearLocalSettings(): void {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.clearLocalSettings()
    },
    authWarning(options): void {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof GlobalLayout>
export const useStore = (): TStore => useMobxContext().store.globalLayout

export default GlobalLayout
