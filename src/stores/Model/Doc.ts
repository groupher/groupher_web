import { T } from '@/mobx'

import { articleFields } from './helper/article'
import { pagiFields } from './helper/common'

export const Doc = T.model('Doc', {
  ...articleFields(),
  cat: T.maybeNull(T.string),
  state: T.maybeNull(T.string),
})

export const PagedDocs = T.model('PagedDocs', {
  entries: T.opt(T.array(Doc), []),
  ...pagiFields(),
})
