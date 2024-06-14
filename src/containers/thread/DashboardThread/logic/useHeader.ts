import type { THeaderLayout, TLinkItem, TEditValue } from '@/spec'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useSubStore from '@/hooks/useSubStore'

import type { TLinkState } from '../spec'

import useLinks, { type TRet as TUserLinks } from './useLinks'
import useHelper from './useHelper'

type TRet = {
  headerLayout: THeaderLayout
  headerLinks: TLinkItem[]
  edit: (value: TEditValue, field: TSettingField) => void
} & TLinkState &
  TUserLinks

export default (): TRet => {
  const store = useSubStore('dashboard')
  const useLinksData = useLinks()
  const { edit } = useHelper()

  const {
    headerLayout,
    headerLinks,
    editingLink,
    editingLinkMode,
    editingGroup,
    editingGroupIndex,
    saving,
  } = store

  return {
    edit,
    headerLayout,
    headerLinks,
    editingLink,
    editingLinkMode,
    editingGroup,
    editingGroupIndex,

    saving,
    ...useLinksData,
  }
}
