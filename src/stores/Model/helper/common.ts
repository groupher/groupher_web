import { PAGE_SIZE } from '~/config'
import { T } from '~/mobx'

export const timestampFields = () => {
  return {
    insertedAt: T.opt(T.string, ''),
    updatedAt: T.opt(T.string, ''),
  }
}

export const pagiFields = () => {
  return {
    pageNumber: T.opt(T.number, 1),
    pageSize: T.opt(T.number, PAGE_SIZE.D),
    totalCount: T.opt(T.number, 0),
    totalPages: T.opt(T.number, 0),
  }
}

export const emptyPagi = {
  entries: [],
  pageNumber: 1,
  pageSize: PAGE_SIZE.D,
  totalCount: 0,
  totalPages: 0,
}
