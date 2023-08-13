import { T } from '@/utils/mobx'

import { pagiFields, timestampFields } from './helper/common'

// NOTE: the SimpleXXX version is to avoid circle import issue which cause MST error

const Thread = T.model('Thread', {
  title: T.string,
  slug: T.string,
  index: T.opt(T.number, 0),
})

export const SimpleCategory = T.model('Category', {
  id: T.maybeNull(T.string),
  title: T.maybeNull(T.string),
})

const Meta = T.model('CommunityMeta', {
  postsCount: T.opt(T.number, 0),
  worksCount: T.maybeNull(T.number),
  blogsCount: T.opt(T.number, 0),
  radarsCount: T.opt(T.number, 0),
  jobsCount: T.opt(T.number, 0),
  // reposCount: T.opt(T.number, 0),
})

export const Community = T.model('Community', {
  id: T.maybeNull(T.string),
  title: T.maybeNull(T.string),
  desc: T.opt(T.string, ''),
  slug: T.maybeNull(T.string),
  index: T.opt(T.number, 1000000),
  logo: T.maybeNull(T.string),
  categories: T.opt(T.array(SimpleCategory), []),
  contributesDigest: T.opt(T.array(T.number), []),
  subscribersCount: T.opt(T.number, 0),
  views: T.opt(T.number, 0),
  articlesCount: T.opt(T.number, 0),
  editorsCount: T.opt(T.number, 0),
  meta: T.maybeNull(Meta),
  viewerHasSubscribed: T.maybeNull(T.bool),
  threads: T.opt(T.array(Thread), []),

  ...timestampFields(),
})

export const PagedCommunities = T.model('PagedCommunities', {
  entries: T.opt(T.array(Community), []),
  ...pagiFields(),
})
