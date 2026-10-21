import { PAGE_SIZE } from '~/config'
import type { TPagedArticles } from '~/spec'

export const EMPTY_PAGED_ARTICLES: TPagedArticles = {
  entries: [],
  pinnedEntries: [],
  pageInfo: {
    __typename: 'OffsetPageInfo',
    page: 1,
    size: PAGE_SIZE.D,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
}

export const EMPTY_TAG = { id: '', title: '', color: '', slug: '' }
