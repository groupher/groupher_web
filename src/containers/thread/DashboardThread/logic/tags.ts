import { findIndex, clone, remove, filter, reject } from 'ramda'

import type { TTag } from '@/spec'
import { toJS } from '@/mobx'
import { sortByIndex } from '@/helper'
// import { sortByIndex, groupByKey } from '@/helper'

import type { TStore } from '../store'

let store: TStore | undefined

/**
 * move tags actions
 */
const _moveTag = (tag: TTag, opt: 'up' | 'down'): void => {
  const { group } = tag
  const tags = toJS(store.tags)

  const groupTags = sortByIndex(filter((item: TTag) => item.group === group, tags))
  const restTags = reject((item: TTag) => item.group === group, tags)
  const tagIndex = findIndex((item: TTag) => item.id === tag.id, groupTags)

  const targetIndex = opt === 'up' ? tagIndex - 1 : tagIndex + 1

  const tmp = groupTags[targetIndex]
  groupTags[targetIndex] = groupTags[tagIndex]
  groupTags[tagIndex] = tmp

  const tmpIndex = groupTags[targetIndex].index
  groupTags[targetIndex].index = groupTags[tagIndex].index
  groupTags[tagIndex].index = tmpIndex

  store.mark({ tags: [...restTags, ..._reindex(groupTags)] })
}

const _reindex = (tags: TTag[]): TTag[] =>
  tags.map((item, index) => ({
    ...item,
    index,
  }))

const _moveTag2Edge = (tag: TTag, opt: 'top' | 'bottom'): void => {
  const { group } = tag
  const tags = toJS(store.tags)

  const groupTags = filter((item: TTag) => item.group === group, tags)
  const restTags = reject((item: TTag) => item.group === group, tags)

  const curTagItemIndex = findIndex((item: TTag) => item.id === tag.id, groupTags)
  const curTagItem = clone(groupTags[curTagItemIndex])

  const newTags =
    opt === 'top'
      ? [curTagItem, ...remove(curTagItemIndex, 1, groupTags)]
      : [...remove(curTagItemIndex, 1, groupTags), curTagItem]

  store.mark({ tags: [...restTags, ..._reindex(newTags)] })
}

export const moveTagUp = (tag: TTag): void => _moveTag(tag, 'up')
export const moveTagDown = (tag: TTag): void => _moveTag(tag, 'down')

export const moveTag2Top = (tag: TTag): void => _moveTag2Edge(tag, 'top')
export const moveTag2Bottom = (tag: TTag): void => _moveTag2Edge(tag, 'bottom')

export const editTag = (key: 'settingTag' | 'editingTag', tag: TTag): void => {
  console.log('## key: ', key)
  console.log('## editingTag: ', tag)

  store.mark({ [key]: toJS(tag) })
}

export const init = (_store: TStore): void => {
  store = _store
}
