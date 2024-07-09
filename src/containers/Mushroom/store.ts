import { proxy } from 'valtio'
import { mergeDeepRight } from 'ramda'

import type { TStore } from './spec'

const store = proxy<TStore>({
  online: true,
  isMobile: false,
  showUserListModal: false,
  bodyScrollDirection: 'up',

  commit: (patch: Partial<TStore>): void => {
    Object.assign(store, mergeDeepRight(store, patch))
  },
})

export default store

// import type {
//   TRootStore,
//   TCommunity,
//   TThread,
//   TArticle,
//   TArticleMeta,
//   TPagedArticles,
//   TResState,
//   TTag,
// } from '~/spec'
// import { T, getParent, markStates, type Instance, toJS, useMobxContext } from '~/mobx'

// const MushroomStore = T.model('MushroomStore', {
//   online: T.opt(T.bool, true),
//   isMobile: T.opt(T.bool, false),

//   showUserListModal: T.opt(T.bool, false),
//   // follow the mac convention
//   bodyScrollDirection: T.opt(T.enum(['up', 'down']), 'up'),
//   // activeState;
//   // activeSort
// })
//   .views((self) => ({
//     get userHasLogin(): boolean {
//       // const root = getParent(self) as TRootStore
//       // return root.accountInfo.isLogin

//       return false
//     },
//     get curCommunity(): TCommunity {
//       const root = getParent(self) as TRootStore
//       return toJS(root.viewing.community)
//     },
//     get curThread(): TThread {
//       const root = getParent(self) as TRootStore
//       return root.viewing.activeThread
//     },
//     get activeTag(): TTag {
//       return null
//       // const root = getParent(self) as TRootStore
//       // return toJS(root.tagsBar.activeTag)
//     },
//   }))
//   .actions((self) => ({
//     loadDemoSetting(): void {
//       // const root = getParent(self) as TRootStore

//       console.log('## loadDemoSetting')
//       // root.dashboardThread.afterCreate()
//     },
//     updateResState(state: TResState): void {
//       console.log('## updateResState: ', state)
//       // const root = getParent(self) as TRootStore
//       // root.articles.updateResState(state)
//     },
//     updatePagedArticles(pagedArticles: TPagedArticles): void {
//       // const root = getParent(self) as TRootStore
//       // root.articles.updatePagedArticles(pagedArticles)
//       console.log('## TODO: updatePagedArticles')
//     },
//     syncArticle(article: TArticle): void {
//       console.log('## TODO: syncArticle')
//       // const root = getParent(self) as TRootStore
//       // const viewingArticle = toJS(root.viewingArticle)
//       // const updatedArticle = mergeRight(viewingArticle, article)

//       // root.viewing.updateViewing(updatedArticle)
//       // root.articlesThread.updateArticle(updatedArticle)
//       // root.postThread.updateArticle(updatedArticle)
//       // root.articles.updateArticle(updatedArticle)
//     },
//     setViewingAlways(article: TArticle): void {
//       const root = getParent(self) as TRootStore
//       root.viewing.updateViewing(toJS(article))
//     },
//     updateViewerHasUpvoted(viewerHasUpvoted: boolean): void {
//       const root = getParent(self) as TRootStore
//       root.viewing.updateViewerUpvoted(viewerHasUpvoted)
//     },
//     syncUploadInfo(upvotesCount: number, meta: TArticleMeta): void {
//       console.log('## TODO syncUploadInfo')
//       // const root = getParent(self) as TRootStore

//       // for viewing article
//       // root.viewing.updateUpvoteCount(upvotesCount, meta)
//       // const { id, viewerHasUpvoted, meta: viewingArticleMeta } = toJS(root.viewingArticle)
//       // const syncMeta = mergeRight(viewingArticleMeta, meta)
//       // for viewing article end

//       // root.articlesThread.updateArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
//       // root.postThread.updateArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
//       //root.articles.updateArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
//     },
//     clearLocalSettings(): void {
//       // const root = getParent(self) as TRootStore
//       // root.dashboardThread.clearLocalSettings()
//       console.log('## clearLocalSettings')
//     },
//     closeUserListModal(): void {
//       self.showUserListModal = false
//     },
//     mark(sobj: Record<string, unknown>): void {
//       markStates(sobj, self)
//     },
//   }))

// export type TStore = Instance<typeof MushroomStore>
// export const useStore = (): TStore => useMobxContext().store.mushroom

// export default MushroomStore
