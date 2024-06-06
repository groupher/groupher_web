import type { THeaderLayout, TCommunityThread, TLinkItem, TEditValue } from '@/spec'
import { toJS } from '@/mobx'
import { publicThreads } from '@/helper'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useDashboard from '@/hooks/useDashboard'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import type { TLinkState } from '../spec'

import useLinks, { type TRet as TUserLinks } from './useLinks'
import useHelper from './useHelper'

type TRet = {
  headerLayout: THeaderLayout
  headerLinks: TLinkItem[]
  threads: TCommunityThread[]
  isTouched: boolean
  isLayoutTouched: boolean
  edit: (value: TEditValue, field: TSettingField) => void
} & TLinkState &
  TUserLinks

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHeader = (): TRet => {
  const { dashboard: store } = useDashboard()
  const useLinksData = useLinks()
  const { edit, isChanged } = useHelper()
  const community = useViewingCommunity()

  const {
    headerLayout,
    headerLinks,
    editingLink,
    editingLinkMode,
    editingGroup,
    editingGroupIndex,
    enable,
    nameAlias,
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

    threads: publicThreads(community.threads, {
      enable: toJS(enable),
      nameAlias: toJS(nameAlias),
    }),

    saving,
    isTouched: isChanged('headerLinks') && editingLink === null,
    isLayoutTouched: isChanged('headerLayout'),
    ...useLinksData,
  }
}

export default useHeader
