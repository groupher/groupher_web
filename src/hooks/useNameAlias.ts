import { useContext, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { filter } from 'ramda'

import type { TNameAlias } from '@/spec'

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useNameAlias = (group = 'kanban'): Record<string, TNameAlias> => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const alias = {}
  let aliasList = []
  const viewingCommunity = store.viewing.community.slug

  // NOTE: 如果这里不用 useMemo，会导致首页切换页面时一直 re-render, 相当变态
  const curAlias = useMemo(() => store.dashboardThread.nameAliasData, [viewingCommunity])

  if (!group) {
    aliasList = curAlias
  } else {
    aliasList = filter((item: TNameAlias) => item.group === group, curAlias)
  }

  for (const item of aliasList) {
    alias[item.slug] = item
  }

  return alias
}

export default useNameAlias
