import { T } from '~/mobx'

import { articleFields } from './helper/article'
import { pagiFields } from './helper/common'

export const Changelog = T.model('Changelog', {
  ...articleFields(),
})

export const PagedChangelogs = T.model('PagedChangelogs', {
  entries: T.opt(T.array(Changelog), []),
  ...pagiFields(),
})
