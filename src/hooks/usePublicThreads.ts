import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { find, propEq, reject } from 'ramda'

import type { TCommunityThread, TLinkItem, TNameAliasConfig } from '@/spec'
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

  const { community } = store.viewing
  const { enable, nameAlias } = store.dashboardThread

  const { threads } = community

  const enabledThreads = sortByIndex(threads.filter((thread) => enable[thread.slug]))
  const mappedThreads = enabledThreads.map((pThread) => {
    const aliasItem = find(propEq('slug', pThread.slug))(nameAlias) as TNameAliasConfig

    return {
      ...pThread,
      title: aliasItem?.name || pThread.title,
    }
  })

  const { headerLinks } = store.dashboardThread
  const headerLinksRow = toJS(headerLinks)

  const hasExtraAbout = find((link: TLinkItem) => link.title === '关于', headerLinksRow)

  if (hasExtraAbout) {
    return reject(
      (item: TCommunityThread) => item.slug === THREAD.ABOUT,
      mappedThreads as TCommunityThread[],
    ) as TCommunityThread[]
  }
  return mappedThreads as TCommunityThread[]
}

export default usePublicThreads
