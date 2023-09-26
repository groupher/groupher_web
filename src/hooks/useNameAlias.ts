import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { filter } from 'ramda'

import { toJS } from '@/mobx'
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

  if (!group) {
    aliasList = toJS(store.dashboardThread.nameAlias)
  } else {
    aliasList = filter(
      (item: TNameAlias) => item.group === group,
      toJS(store.dashboardThread.nameAlias),
    )
  }

  aliasList.forEach((item) => {
    alias[item.slug] = item
  })

  return alias
}

export default useNameAlias
