import type { TPagedArticles } from '~/spec'
import { PAGE_SIZE } from '~/config'

export const EMPTY_PAGI = {
  entries: [],
  pageNumber: 1,
  pageSize: PAGE_SIZE.D,
  totalCount: 0,
  totalPages: 0,
} as TPagedArticles

export const holder = 1
