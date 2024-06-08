import { useEffect } from 'react'
import { reject, find, propEq, filter, includes, toUpper, isNil, equals } from 'ramda'

import type { TCommunityThread, TTag, TNameAlias, TEditValue } from '@/spec'
import { THREAD } from '@/const/thread'
import { sortByIndex } from '@/helper'
import { runInAction, toJS } from '@/mobx'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useQuery from '@/hooks/useQuery'
import useDashboard from '@/hooks/useDashboard'
import useViewingCommunity from '@/hooks/useViewingCommunity'

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

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTagListInfo = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { edit } = useHeader()

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
    initSettings,
  } = store

  const { data, reload } = useQuery(S.pagedArticleTags, {
    filter: { community: curCommunity.slug, thread: activeTagThread?.toUpperCase() },
  })

  useEffect(() => {
    if (data?.pagedArticleTags) {
      const { initSettings } = store
      const tags = data.pagedArticleTags.entries

      runInAction(() => {
        store.tags = tags
        store.initSettings = { ...initSettings, tags }
      })
    }
  }, [data])

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
    const cur = sortByIndex(toJS(tags), 'id')
    const init = sortByIndex(toJS(initSettings.tags) || [], 'id')

    return !equals(cur, init)
  }

  const editTag = (key: 'settingTag' | 'editingTag', tag: TTag): void => {
    console.log('## ## editingTag key: ', key)
    console.log('## ## editingTag tag: ', tag)

    store.editingTag = tag
    // store.mark({ [key]: tag })
  }

  const changeThread = (thread: string) => {
    store.activeTagThread = thread

    const variables = {
      filter: { community: curCommunity.slug, thread: thread.toUpperCase() },
    }
    reload(variables)
  }

  return {
    saving,
    editingTag,
    settingTag,
    tags: toJS(filterdTags),
    groups: tagGroups,
    activeTagThread,
    activeTagGroup,
    threads: curThreads,
    isTagsTouched: !isNil(toJS(editingTag)),
    isTagsIndexTouched: tagsIndexTouched(),
    changeThread,
    editTag,
    edit,
  }
}

export default useTagListInfo
