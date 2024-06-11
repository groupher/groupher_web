import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TDashboardAliasRoute, TNameAlias } from '@/spec'
import { toJS } from '@/mobx'

type TRet = {
  saving: boolean
  nameAlias: TNameAlias[]
  editingAlias: TNameAlias
  aliasTab: TDashboardAliasRoute
}

const useAliasInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { aliasTab, editingAlias, nameAlias, saving } = store.dashboardThread

  return {
    aliasTab,
    editingAlias: toJS(editingAlias),
    nameAlias: toJS(nameAlias),
    saving,
  }
}

export default useAliasInfo
