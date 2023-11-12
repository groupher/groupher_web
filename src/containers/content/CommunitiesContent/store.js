/*
 * ExploreContentStore store
 *
 */

import { propEq, findIndex } from 'ramda'

import { ICON_CMD } from '@/config'
import { T, getParent, markStates, toJS } from '@/mobx'
import { Trans } from '@/i18n'
import { PagedCommunities, PagedCategories, emptyPagi } from '@/model'

const ExploreContentStore = T.model('ExploreContentStore', {
  // current active sidbar menu id
  activeCatalogId: T.maybeNull(T.string),
  pagedCommunities: T.opt(PagedCommunities, emptyPagi),
  searching: T.opt(T.bool, false),
  // cur active category
  /* category: T.opt(T.string, ''), */
  // for UI loading state
  subscribing: T.opt(T.bool, false),
  subscribingId: T.maybeNull(T.string),
  pagedCategories: T.maybeNull(PagedCategories),
  // search status
  isSearchMode: T.opt(T.bool, false),
  searchResultCount: T.opt(T.number, 0),
  searchValue: T.opt(T.string, ''),
  showSearchMask: T.opt(T.bool, true),
  showCreateHint: T.opt(T.bool, true),
  showSearchHint: T.opt(T.bool, false),
  searchfocused: T.opt(T.bool, false),
})
  .views((self) => ({
    get root() {
      return getParent(self)
    },
    get isLogin() {
      return self.root.account.isLogin
    },
    get curRoute() {
      return self.root.curRoute
    },
    get searchStatus() {
      const { searchValue, searchfocused } = self
      let { showSearchMask, showCreateHint, showSearchHint } = self

      const isSearchMode = searchValue.length !== 0
      // is has search value, then do not show mask even is input is blur
      showSearchMask = searchValue.length === 0 ? showSearchMask : false

      const searchResultCount = self.pagedCommunities.totalCount

      showCreateHint = !searchfocused && !isSearchMode
      showSearchHint = !showCreateHint && !isSearchMode
      const showSearchResultHint = isSearchMode

      return {
        isSearchMode,
        searchValue,
        showSearchMask,
        showCreateHint,
        showSearchHint,
        showSearchResultHint,
        searchfocused,
        searchResultCount,
      }
    },
    get pagedCommunitiesData() {
      return toJS(self.pagedCommunities)
    },
    get showFilterSidebar() {
      // if (self.pagedCommunitiesData.entries.length === 0) return false
      // const isSearchMode = searchValue.length !== 0
      return self.searchValue.length === 0
    },
    get pagiInfo() {
      const { pageNumber, pageSize, totalCount } = self.pagedCommunitiesData

      return {
        pageNumber,
        pageSize,
        totalCount,
      }
    },
    get activeMenuId() {
      const { entries } = toJS(self.pagedCategories)
      return self.activeCatalogId || entries[0].id
    },
    get pagedCategoriesData() {
      const { entries } = toJS(self.pagedCategories)
      return entries.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: Trans(item.title),
        icon: `${ICON_CMD}/catalogs/${item.slug}.svg`,
      }))
    },
  }))
  .actions((self) => ({
    updateEditing(sobj) {
      self.mark(sobj)
    },
    authWarning(options) {
      self.root.authWarning(options)
    },
    toggleSubscribe(community) {
      const index = findIndex(propEq(community.id, 'id'), self.pagedCommunities.entries)
      if (index === -1) return false

      if (self.pagedCommunities.entries[index].viewerHasSubscribed) {
        self.pagedCommunities.entries[index].viewerHasSubscribed = false
        self.pagedCommunities.entries[index].subscribersCount -= 1
      } else {
        self.pagedCommunities.entries[index].viewerHasSubscribed = true
        self.pagedCommunities.entries[index].subscribersCount += 1
      }
    },
    addSubscribedCommunity(community) {
      self.root.account.addSubscribedCommunity(community)
      self.root.exploreContent.toggleSubscribe(community)
    },
    removeSubscribedCommunity(community) {
      self.root.account.removeSubscribedCommunity(community)
      self.root.exploreContent.toggleSubscribe(community)
    },
    markRoute(query) {
      self.root.markRoute(query)
    },
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default ExploreContentStore
