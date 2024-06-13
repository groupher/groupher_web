import { useEffect, useRef } from 'react'
import { reject, find, propEq, filter, includes, toUpper, isNil, equals } from 'ramda'

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
}

export default (): TRet => {
  const store = useSubState('dashboard')
  const { edit } = useHeader()

  const storeRef = useRef(store)
  useEffect(() => {
    storeRef.current = store
  }, [store])

  const curCommunity = useViewingCommunity()

  const {
    activeTagGroup,
    activeTagThread,
    tags,
    nameAlias,
    editingTag,
    settingTag,
    saving,
    tagGroups,
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

  const tagsIndexTouched = () => {
    const { tags, initSettings } = storeRef.current

    const cur = sortByIndex(tags, 'id')
    const init = sortByIndex(initSettings.tags || [], 'id')

    return !equals(cur, init)
  }

  const editTag = (key: 'settingTag' | 'editingTag', tag: TTag): void => {
    store.commit({ [key]: tag })
  }

  const changeThread = (thread: string) => {
    store.commit({ activeTagThread: thread })

    loadTags(thread)
  }

  return {
    saving,
    editingTag,
    settingTag,
    tags: filterdTags,
    groups: tagGroups,
    activeTagThread,
    activeTagGroup,
    threads: curThreads,
    isTagsTouched: !isNil(editingTag),
    isTagsIndexTouched: tagsIndexTouched(),
    changeThread,
    editTag,
    edit,
  }
}
