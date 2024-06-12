import type { THeaderLayout, TCommunityThread, TLinkItem, TEditValue } from '@/spec'
import { publicThreads } from '@/helper'

import type { TSettingField } from '@/stores2/dashboardStore/spec'
import useSubStore from '@/hooks/useSubStore'
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

const useHeader = (): TRet => {
  const store = useSubStore('dashboard')
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

    threads: publicThreads(community.threads, { enable, nameAlias }),
    saving,
    isTouched: isChanged('headerLinks') && editingLink === null,
    isLayoutTouched: isChanged('headerLayout'),
    ...useLinksData,
  }
}

export default useHeader
