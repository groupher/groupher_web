import { useContext } from 'react'
import { reject, find, propEq, filter, includes, toUpper, isNil } from 'ramda'
import { MobXProviderContext } from 'mobx-react'

import type { TCommunityThread, TTag, TNameAlias } from '@/spec'
import { THREAD } from '@/const/thread'
import { sortByIndex } from '@/helper'
import { toJS } from '@/mobx'

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
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTagListInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

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
  } = store.dashboardThread

  const filterdTagsByGroup =
    activeTagGroup === null ? tags : filter((t: TTag) => t.group === activeTagGroup, tags)

  const filterdTags = filter(
    (t: TTag) => t.thread === toUpper(activeTagThread || ''),
    filterdTagsByGroup,
  )

  const mappedThreads = store.viewing.community.threads.map((pThread) => {
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
    return (
      JSON.stringify(sortByIndex(toJS(tags), 'id')) !==
      JSON.stringify(sortByIndex(toJS(initSettings.tags), 'id'))
    )
  }

  return {
    editingTag,
    settingTag,
    tags: toJS(filterdTags),
    saving,
    groups: tagGroups,
    activeTagThread,
    activeTagGroup,
    threads: curThreads,
    isTagsTouched: !isNil(toJS(editingTag)),
    isTagsIndexTouched: tagsIndexTouched(),
  }
}

export default useTagListInfo
