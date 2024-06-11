import type { TFooterLayout, TCommunityThread, TLinkItem, TEditValue } from '@/spec'
import { toJS } from '@/mobx'
import { publicThreads } from '@/helper'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useDashboard from '@/hooks/useDashboard'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import type { TLinkState } from '../spec'

import useLinks, { type TRet as TUserLinks } from './useLinks'
import useHelper from './useHelper'

type TRet = {
  footerLayout: TFooterLayout
  footerLinks: TLinkItem[]
  threads: TCommunityThread[]
  isTouched: boolean
  isLayoutTouched: boolean
  edit: (value: TEditValue, field: TSettingField) => void
} & TLinkState &
  TUserLinks

const useFooter = (): TRet => {
  const { dashboard: store } = useDashboard()
  const useLinksData = useLinks()
  const { edit, isChanged } = useHelper()
  const community = useViewingCommunity()

  const {
    footerLayout,
    footerLinks,
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
    footerLayout,
    footerLinks,
    editingLink,
    editingLinkMode,
    editingGroup,
    editingGroupIndex,

    threads: publicThreads(community.threads, {
      enable: toJS(enable),
      nameAlias: toJS(nameAlias),
    }),

    saving,
    isTouched: isChanged('footerLinks') && editingLink === null,
    isLayoutTouched: isChanged('footerLayout'),
    ...useLinksData,
  }
}

export default useFooter
