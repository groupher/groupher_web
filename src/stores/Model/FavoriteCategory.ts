import { PAGE_SIZE } from '@/config'

import { T } from '@/utils/mobx'

export const FavoriteCategory = T.model('FavoriteCategory', {
  id: T.maybeNull(T.string),
  title: T.opt(T.string, ''),
  desc: T.maybeNull(T.string),
  totalCount: T.opt(T.number, 0),
  private: T.opt(T.bool, false),
  updatedAt: T.opt(T.string, ''),
})

export const PagedFavoriteCategories = T.model('PagedFavoriteCategories', {
  entries: T.opt(T.array(FavoriteCategory), []),
  pageNumber: T.opt(T.number, 1),
  pageSize: T.opt(T.number, PAGE_SIZE.D),
  totalCount: T.opt(T.number, 0),
  totalPages: T.opt(T.number, 0),
})
