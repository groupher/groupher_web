import { useCallback } from 'react'
import {
  reject,
  find,
  propEq,
  filter,
  includes,
  equals,
  findIndex,
  remove,
  pluck,
  uniq,
  clone,
} from 'ramda'

import type { TCommunityThread, TTag, TNameAlias, TEditValue, TThread } from '@/spec'
import { THREAD } from '@/const/thread'
import { sortByIndex } from '@/helper'

import type { TSettingField, TChangeTagMode } from '@/stores3/dashboard/spec'
import useSubState from '@/hooks/useSubStore'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { query } from '@/utils/api'

import useHelper from './useHelper'
import S from '../schema'

type TRet = {
  loading: boolean
  saving: boolean
  editingTag: TTag
  settingTag: TTag
  activeTagGroup: string
  activeTagThread: string

  // drived states
  getTags: () => TTag[]
  getGroups: () => string[]
  getThreads: () => TCommunityThread[]
  getTagsIndexTouched: () => boolean

  loadTags: (thread?: TThread) => void
  edit: (value: TEditValue, field: TSettingField) => void
  changeThread: (thread: string) => void
  editTag: (key: TChangeTagMode, tag: TTag) => void

  moveTagUp: (tag: TTag) => void
  moveTagDown: (tag: TTag) => void
  moveTag2Top: (tag: TTag) => void
  moveTag2Bottom: (tag: TTag) => void
}

export default (): TRet => {
  const store = useSubState('dashboard')
  const { edit } = useHelper()
  const curCommunity = useViewingCommunity()

  const {
    loading,
    activeTagGroup,
    activeTagThread,
    tags,
    nameAlias,
    editingTag,
    settingTag,
    saving,
    initSettings,
  } = store

  const loadTags = (activeThread = THREAD.POST): void => {
    const community = curCommunity.slug
    const thread = activeThread.toUpperCase()

    const params = {
      filter: { community, thread },
    }

    store.commit({ loading: true })
    query(S.pagedArticleTags, params).then((data) => {
      const tags = data.pagedArticleTags.entries
      store.commit({ tags, initSettings: { ...initSettings, tags }, loading: false })
    })
  }

  // drived states
  const getTags = useCallback(() => {
    const selectedThread = (activeTagThread || '').toUpperCase()

    const filterdTagsByGroup = activeTagGroup
      ? filter((t: TTag) => t.group === activeTagGroup, tags)
      : tags

    return filter((t: TTag) => t.thread === selectedThread, filterdTagsByGroup)
  }, [tags, activeTagThread, activeTagGroup])

  const getGroups = useCallback((): string[] => uniq(pluck('group', tags)), [tags])

  const getThreads = useCallback((): TCommunityThread[] => {
    const mappedThreads = curCommunity.threads.map((pThread) => {
      const aliasItem = find(propEq(pThread.slug, 'slug'))(nameAlias) as TNameAlias

      return {
        ...pThread,
        title: aliasItem?.name || pThread.title,
      }
    })

    return reject(
      (thread: TCommunityThread) => includes(thread.slug, [THREAD.ABOUT, THREAD.DOC]),
      mappedThreads,
    )
  }, [curCommunity, nameAlias])

  const getTagsIndexTouched = useCallback((): boolean => {
    console.log('## getTagsIndexTouched')
    return !equals(sortByIndex(tags, 'id'), sortByIndex(initSettings.tags || [], 'id'))
  }, [tags, initSettings.tags])
  // drived states end

  const editTag = (key: TChangeTagMode, tag: TTag): void => store.commit({ [key]: tag })
  const changeThread = (thread: string) => store.commit({ activeTagThread: thread })

  const _reindex = (tags: TTag[]): TTag[] => tags.map((item, index) => ({ ...item, index }))

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
    loading,
    saving,
    editingTag,
    settingTag,
    activeTagThread,
    activeTagGroup,
    // drived states
    getTags,
    getGroups,
    getThreads,
    getTagsIndexTouched,
    //
    changeThread,
    editTag,
    edit,
    // move actions
    moveTagUp,
    moveTagDown,
    moveTag2Top,
    moveTag2Bottom,
    loadTags,
  }
}
