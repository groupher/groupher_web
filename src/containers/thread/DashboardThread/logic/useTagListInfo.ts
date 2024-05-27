import { useEffect } from 'react'
import { reject, find, propEq, filter, includes, toUpper, isNil, equals } from 'ramda'

import type { TCommunityThread, TTag, TNameAlias } from '@/spec'
import { THREAD } from '@/const/thread'
import { sortByIndex } from '@/helper'
import { runInAction, toJS } from '@/mobx'
import useQuery from '@/hooks/useQuery'

import useDashboard from '@/hooks/useDashboard'

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
  changeThread: (thread: string) => void
  editTag: (key: 'settingTag' | 'editingTag', tag: TTag) => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTagListInfo = (): TRet => {
  const { dashboard: store } = useDashboard()

  const {
    curCommunity,
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
    // !equals(sortByIndex(tags, 'id'), sortByIndex(initSettings.tags, 'id'))
    return false
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
  }
}

export default useTagListInfo
