import { useContext } from 'react'
import { includes } from 'ramda'
import { MobXProviderContext } from 'mobx-react'

import type {
  TID,
  TPagedArticles,
  TDashboardDocRoute,
  TPagedCommunities,
  TFAQSection,
  TArticleEntries,
} from '@/spec'
import { toJS } from '@/mobx'

type TRet = {
  loading: boolean
  batchSelectedIDs: TID[]
  docTab: TDashboardDocRoute

  pagedPosts: TPagedArticles
  pagedCommunities: TPagedCommunities
  pagedDocs: TPagedArticles
  pagedChangelogs: TPagedArticles

  editingFAQ: TFAQSection
  faqSections: TFAQSection[]
  editingFAQIndex: number | null

  isFaqSectionsTouched: boolean
}

const assignChecked = (entries: TArticleEntries, batchSelectedIDs: TID[]): TArticleEntries => {
  return entries.map((article) => ({
    ...article,
    _checked: includes(article.id, batchSelectedIDs),
  }))
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useCMSInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const {
    loading,
    batchSelectedIDs,
    docTab,
    editingFAQIndex,
    touched,
    pagedCommunities,
    pagedPosts,
    pagedDocs,
    pagedChangelogs,
    faqSections,
    editingFAQ,
  } = store.dashboardThread
  const _batchSelectedIds = toJS(batchSelectedIDs)
  const _pagedCommunities = toJS(pagedCommunities)
  const _pagedPosts = toJS(pagedPosts)
  const _pagedDocs = toJS(pagedDocs)
  const _pagedChangelogs = toJS(pagedChangelogs)

  return {
    loading,
    docTab,
    editingFAQIndex,
    batchSelectedIDs: _batchSelectedIds,
    pagedCommunities: {
      ..._pagedCommunities,
      entries: assignChecked(_pagedCommunities.entries, _batchSelectedIds),
    },
    pagedPosts: {
      ..._pagedPosts,
      entries: assignChecked(_pagedPosts.entries, _batchSelectedIds),
    },
    pagedDocs: {
      ..._pagedDocs,
      entries: assignChecked(_pagedDocs.entries, _batchSelectedIds),
    },
    pagedChangelogs: {
      ..._pagedChangelogs,
      entries: assignChecked(_pagedChangelogs.entries, _batchSelectedIds),
    },

    faqSections: toJS(faqSections),
    editingFAQ: toJS(editingFAQ),
    isFaqSectionsTouched: touched.faqSections,
  }
}

export default useCMSInfo
