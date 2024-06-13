import { useEffect, useMemo } from 'react'
import {
  reject,
  find,
  propEq,
  filter,
  includes,
  toUpper,
  isNil,
  equals,
  findIndex,
  remove,
  pluck,
  uniq,
  clone,
} from 'ramda'

import type { TCommunityThread, TTag, TNameAlias, TEditValue } from '@/spec'
import { THREAD } from '@/const/thread'
import { sortByIndex } from '@/helper'

import type { TSettingField } from '@/stores3/dashboard/spec'
import useSubState from '@/hooks/useSubStore'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { query } from '@/utils/api'

import useHeader from './useHeader'
import S from '../schema'

type TRet = {
  saving: boolean
  threads: TCommunityThread[]
  tags: TTag[]
  editingTag: TTag
  settingTag: TTag
  groups: string[]
  activeTagGroup: string
  activeTagThread: string
  isTagsIndexTouched: boolean
  isTagsTouched: boolean
  edit: (value: TEditValue, field: TSettingField) => void
  changeThread: (thread: string) => void
  editTag: (key: 'settingTag' | 'editingTag', tag: TTag) => void

  moveTagUp: (tag: TTag) => void
  moveTagDown: (tag: TTag) => void
  moveTag2Top: (tag: TTag) => void
  moveTag2Bottom: (tag: TTag) => void
}

export default (): TRet => {
  const store = useSubState('dashboard')
  const { edit } = useHeader()
  const curCommunity = useViewingCommunity()

  useEffect(() => {
    if (!store.initFilled) {
      store.commit({ initFilled: true })
      loadTags(THREAD.POST)
    }

    return () => store.commit({ initFilled: false })
  }, [])

  const {
    activeTagGroup,
    activeTagThread,
    tags,
    nameAlias,
    editingTag,
    settingTag,
    saving,
    initSettings,
  } = store

  const loadTags = (thread) => {
    const community = curCommunity.slug

    const params = {
      filter: { community, thread: thread.toUpperCase() },
    }

    query(S.pagedArticleTags, params).then((data) => {
      const { initSettings } = store
      const tags = data.pagedArticleTags.entries
      store.commit({ tags, initSettings: { ...initSettings, tags } })
    })
  }

  const filterdTagsByGroup =
    activeTagGroup === null ? tags : filter((t: TTag) => t.group === activeTagGroup, tags)

  const filterdTags = filter(
    (t: TTag) => t.thread === toUpper(activeTagThread || ''),
    filterdTagsByGroup,
  )

  const mappedThreads = curCommunity.threads.map((pThread) => {
    const aliasItem = find(propEq(pThread.slug, 'slug'))(nameAlias) as TNameAlias

    return {
      ...pThread,
      title: aliasItem?.name || pThread.title,
    }
  })

  const curThreads = reject(
    // @ts-ignore
    (thread) => includes(thread.slug, [THREAD.ABOUT, THREAD.DOC]),
    mappedThreads,
  ) as TCommunityThread[]

  const tagsIndexTouched = useMemo(() => {
    const cur = sortByIndex(tags, 'id')
    const init = sortByIndex(initSettings.tags || [], 'id')

    return !equals(cur, init)
  }, [tags, initSettings.tags])

  const editTag = (key: 'settingTag' | 'editingTag', tag: TTag): void => {
    store.commit({ [key]: tag })
  }

  const changeThread = (thread: string) => {
    store.commit({ activeTagThread: thread })

    loadTags(thread)
  }

  const _reindex = (tags: TTag[]): TTag[] =>
    tags.map((item, index) => ({
      ...item,
      index,
    }))

  const _moveTag = (tag: TTag, opt: 'up' | 'down'): void => {
    const { tags } = store
    const { group } = tag

    const groupTags = clone(sortByIndex(filter((item: TTag) => item.group === group, tags)))
    const restTags = reject((item: TTag) => item.group === group, tags)
    const tagIndex = findIndex((item: TTag) => item.id === tag.id, groupTags)

    const targetIndex = opt === 'up' ? tagIndex - 1 : tagIndex + 1

    const tmp = groupTags[targetIndex]
    groupTags[targetIndex] = groupTags[tagIndex]
    groupTags[tagIndex] = tmp

    const tmpIndex = groupTags[targetIndex].index
    groupTags[targetIndex].index = groupTags[tagIndex].index
    groupTags[tagIndex].index = tmpIndex

    store.commit({ tags: [...restTags, ..._reindex(groupTags)] })
  }

  const _moveTag2Edge = (tag: TTag, opt: 'top' | 'bottom'): void => {
    const { tags } = store
    const { group } = tag

    const groupTags = filter((item: TTag) => item.group === group, tags)
    const restTags = reject((item: TTag) => item.group === group, tags)

    const curTagItemIndex = findIndex((item: TTag) => item.id === tag.id, groupTags)
    const curTagItem = groupTags[curTagItemIndex]

    const newTags =
      opt === 'top'
        ? [curTagItem, ...remove(curTagItemIndex, 1, groupTags)]
        : [...remove(curTagItemIndex, 1, groupTags), curTagItem]

    store.commit({ tags: [...restTags, ..._reindex(newTags)] })
  }

  const moveTagUp = (tag: TTag): void => _moveTag(tag, 'up')
  const moveTagDown = (tag: TTag): void => _moveTag(tag, 'down')

  const moveTag2Top = (tag: TTag): void => _moveTag2Edge(tag, 'top')
  const moveTag2Bottom = (tag: TTag): void => _moveTag2Edge(tag, 'bottom')

  return {
    saving,
    editingTag,
    settingTag,
    tags: filterdTags,
    groups: uniq(pluck('group', store.tags)),
    activeTagThread,
    activeTagGroup,
    threads: curThreads,
    isTagsTouched: !isNil(editingTag),
    isTagsIndexTouched: tagsIndexTouched,
    changeThread,
    editTag,
    edit,
    // move actions
    moveTagUp,
    moveTagDown,
    moveTag2Top,
    moveTag2Bottom,
  }
}
