import useDashboard from '@/hooks/useDashboard'
import type { TDashboardAliasRoute, TNameAlias, TEditValue } from '@/spec'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import { SETTING_FIELD } from '@/stores2/dashboardStore/constant'
// import { toJS } from '@/mobx'

import useHelper from './useHelper'

type TRet = {
  saving: boolean
  nameAlias: TNameAlias[]
  editingAlias: TNameAlias
  aliasTab: TDashboardAliasRoute

  updateEditingAlias: (alias: TNameAlias) => void
  edit: (value: TEditValue, field: TSettingField) => void
  resetEdit: () => void
  changeTab: (tab: TDashboardAliasRoute) => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAliasInfo = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { edit, resetEdit } = useHelper()

  const { aliasTab, editingAlias, nameAlias, saving } = store

  const updateEditingAlias = (alias: TNameAlias): void => {
    store.editingAlias = alias
  }

  const changeTab = (tab: TDashboardAliasRoute) => {
    store.aliasTab = tab
  }

  return {
    aliasTab,
    editingAlias,
    nameAlias,
    saving,
    changeTab,
    edit,
    updateEditingAlias,
    resetEdit: () => resetEdit(SETTING_FIELD.NAME_ALIAS),
  }
}

export default useAliasInfo
