import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { find, propEq } from 'ramda'

import type { TCommunityThread, TNameAliasConfig } from '@/spec'

import { sortByIndex } from '@/utils/helper'

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

  return mappedThreads as TCommunityThread[]
}

export default usePublicThreads
