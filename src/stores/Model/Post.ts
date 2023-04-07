import { T } from '@/utils/mobx'

import { articleFields } from './helper/article'
import { pagiFields } from './helper/common'

export const Post = T.model('Post', {
  ...articleFields(),
  cat: T.maybeNull(T.string),
  state: T.maybeNull(T.string),
  isQuestion: T.maybeNull(T.bool),
})

export const PagedPosts = T.model('PagedPosts', {
  entries: T.opt(T.array(Post), []),
  ...pagiFields(),
})
