import { useContext, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { find, propEq, reject } from 'ramda'

import type { TCommunityThread, TLinkItem, TNameAlias } from '@/spec'
import { THREAD } from '@/constant/thread'

import { toJS } from '@/mobx'
import { sortByIndex } from '@/helper'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const usePublicThreads = (): TCommunityThread[] => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const viewingCommunity = store.viewing.community.slug
  const community = useMemo(() => toJS(store.viewing.community), [viewingCommunity])
  const nameAliasData = useMemo(() => store.dashboardThread.nameAliasData, [viewingCommunity])
  const enable = useMemo(() => store.dashboardThread.enableSettings, [viewingCommunity])

  // const { enable, nameAliasData } = store.dashboardThread

  const { threads } = community
  const enabledThreads = sortByIndex(threads.filter((thread) => enable[thread.slug]))

  const mappedThreads = enabledThreads.map((pThread) => {
    const aliasItem = find(propEq(pThread.slug, 'slug'))(nameAliasData) as TNameAlias

    return {
      ...pThread,
      title: aliasItem?.name || pThread.title,
    }
  })

  const headerLinks = useMemo(() => store.dashboardThread.headerLinksData, [viewingCommunity])

  const hasExtraAbout = find((link: TLinkItem) => link.title === '关于', headerLinks)

  if (hasExtraAbout) {
    return reject(
      (item: TCommunityThread) => item.slug === THREAD.ABOUT,
      mappedThreads as TCommunityThread[],
    ) as TCommunityThread[]
  }

  return mappedThreads as TCommunityThread[]
}

export default usePublicThreads
