import { values } from 'ramda'

import { T } from '@/utils/mobx'

import { TAG_COLORS } from '@/config'
import { THREAD } from '@/constant/thread'

import { pagiFields } from './helper/common'
import { Community } from './Community'

export const Tag = T.model('Tag', {
  id: T.maybeNull(T.string),
  title: T.maybeNull(T.string),
  index: T.opt(T.number, 0),
  raw: T.maybeNull(T.string),
  // color: T.opt(T.enum('color', TAG_COLORS), TAG_COLORS[0]),
  color: T.opt(T.string, TAG_COLORS[0]),
  thread: T.opt(
    T.enum(
      'thread',
      values(THREAD).map((t) => t.toUpperCase()),
    ),
    THREAD.POST.toUpperCase(),
  ),
  group: T.maybeNull(T.string),
  community: T.maybeNull(Community),
  insertedAt: T.opt(T.string, ''),
  updatedAt: T.opt(T.string, ''),
})

export const PagedTags = T.model('PagedTags', {
  entries: T.opt(T.array(Tag), []),
  ...pagiFields(),
})

export const emptyTag = { id: '', title: '', color: '', raw: '' }
