import { includes } from 'ramda'

import type {
  TID,
  TPagedArticles,
  TDashboardDocRoute,
  TPagedCommunities,
  TFAQSection,
  TArticleEntries,
} from '~/spec'
import useSubStore from '~/hooks/useSubStore'

import useHelper from './useHelper'

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

export default (): TRet => {
  const dashboard = useSubStore('dashboard')
  const { mapArrayChanged } = useHelper()

  const {
    loading,
    batchSelectedIDs,
    docTab,
    editingFAQIndex,
    pagedCommunities,
    pagedPosts,
    pagedDocs,
    pagedChangelogs,
    faqSections,
    editingFAQ,
  } = dashboard

  return {
    loading,
    docTab,
    editingFAQIndex,
    batchSelectedIDs,
    pagedCommunities: {
      ...pagedCommunities,
      // @ts-ignore
      entries: assignChecked(pagedCommunities.entries, batchSelectedIDs),
    },
    pagedPosts: {
      ...pagedPosts,
      entries: assignChecked(pagedPosts.entries, batchSelectedIDs),
    },
    pagedDocs: {
      ...pagedDocs,
      entries: assignChecked(pagedDocs.entries, batchSelectedIDs),
    },
    pagedChangelogs: {
      ...pagedChangelogs,
      entries: assignChecked(pagedChangelogs.entries, batchSelectedIDs),
    },

    faqSections,
    editingFAQ,
    isFaqSectionsTouched: mapArrayChanged('faqSections'),
  }
}
