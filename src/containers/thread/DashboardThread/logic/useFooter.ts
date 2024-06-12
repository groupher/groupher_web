import type { TFooterLayout, TCommunityThread, TLinkItem, TEditValue } from '@/spec'
import { publicThreads } from '@/helper'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useSubStore from '@/hooks/useSubStore'
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

export default (): TRet => {
  const store = useSubStore('dashboard')
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
    threads: publicThreads(community.threads, { enable, nameAlias }),
    saving,
    isTouched: isChanged('footerLinks') && editingLink === null,
    isLayoutTouched: isChanged('footerLayout'),
    ...useLinksData,
  }
}
