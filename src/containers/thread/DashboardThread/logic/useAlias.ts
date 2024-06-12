import type { TDashboardAliasRoute, TNameAlias, TEditValue } from '@/spec'

import type { TSettingField } from '@/stores3/dashboard/spec'
import { SETTING_FIELD } from '@/stores3/dashboard/constant'

import useSubState from '@/hooks/useSubStore'

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

export default (): TRet => {
  const store = useSubState('dashboard')
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
