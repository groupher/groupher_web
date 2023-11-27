/*
 * GlobalLayout store
 *
 */
import { mergeRight, values } from 'ramda'

import type {
  TRootStore,
  TCommunity,
  TThread,
  TArticle,
  TArticleMeta,
  TPagedArticles,
  TResState,
  TTag,
  TArticleCat,
  TArticleState,
  TArticleOrder,
} from '@/spec'
import { T, getParent, markStates, Instance, toJS, useMobxContext } from '@/mobx'

const MushroomStore = T.model('MushroomStore', {
  online: T.opt(T.bool, true),
  isMobile: T.opt(T.bool, false),

  showUserListModal: T.opt(T.bool, false),
  // follow the mac convention
  bodyScrollDirection: T.opt(T.enum(['up', 'down']), 'up'),
  // activeState;
  // activeSort
})
  .views((self) => ({
    get userHasLogin(): boolean {
      const root = getParent(self) as TRootStore
      return root.accountInfo.isLogin
    },
    get activeOrder(): TArticleOrder | null {
      const root = getParent(self) as TRootStore

      return root.articles.activeOrder
    },
    get activeCat(): TArticleCat | null {
      const root = getParent(self) as TRootStore

      return root.articles.activeCat
    },
    get activeState(): TArticleState | null {
      const root = getParent(self) as TRootStore

      return root.articles.activeState
    },
    get curCommunity(): TCommunity {
      const root = getParent(self) as TRootStore
      return toJS(root.viewing.community)
    },
    get curThread(): TThread {
      const root = getParent(self) as TRootStore
      return root.viewing.activeThread
    },
    get activeTag(): TTag {
      const root = getParent(self) as TRootStore

      return toJS(root.tagsBar.activeTag)
    },
  }))
  .actions((self) => ({
    loadDemoSetting(): void {
      const root = getParent(self) as TRootStore

      return root.dashboardThread.afterCreate()
    },
    updateResState(state: TResState): void {
      const root = getParent(self) as TRootStore
      root.articles.updateResState(state)
    },
    updatePagedArticles(pagedArticles: TPagedArticles): void {
      const root = getParent(self) as TRootStore
      root.articles.updatePagedArticles(pagedArticles)
    },
    syncArticle(article: TArticle): void {
      const root = getParent(self) as TRootStore
      const viewingArticle = toJS(root.viewingArticle)
      const updatedArticle = mergeRight(viewingArticle, article)

      root.viewing.updateViewing(updatedArticle)
      // root.articlesThread.updateArticle(updatedArticle)
      // root.postThread.updateArticle(updatedArticle)
      root.articles.updateArticle(updatedArticle)
    },
    setViewingAlways(article: TArticle): void {
      const root = getParent(self) as TRootStore
      root.viewing.updateViewing(toJS(article))
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
      const syncMeta = mergeRight(viewingArticleMeta, meta)
      // for viewing article end

      // root.articlesThread.updateArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
      // root.postThread.updateArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
      root.articles.updateArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
    },
    clearLocalSettings(): void {
      const root = getParent(self) as TRootStore
      return root.dashboardThread.clearLocalSettings()
    },
    closeUserListModal(): void {
      self.showUserListModal = false
    },
    authWarning(options): void {
      const root = getParent(self) as TRootStore
      root.authWarning(options)
    },
    mark(sobj: Record<string, unknown>): void {
      markStates(sobj, self)
    },
  }))

export type TStore = Instance<typeof MushroomStore>
export const useStore = (): TStore => useMobxContext().store.mushroom

export default MushroomStore
