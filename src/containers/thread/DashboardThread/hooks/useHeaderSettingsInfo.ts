import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { THeaderLayout, TCommunityThread, TChangeMode, TLinkItem } from '@/spec'
import { toJS } from '@/mobx'
import { publicThreads } from '@/helper'

import type { TLinkState } from '../spec'

import useHelper from './useHelper'

type TRet = {
  headerLayout: THeaderLayout
  headerLinks: TLinkItem[]
  threads: TCommunityThread[]
  isTouched: boolean
  isLayoutTouched: boolean
} & TLinkState

const useHeaderSettingsInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

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
  } = store.dashboardThread

  return {
    headerLayout,
    headerLinks: toJS(headerLinks),
    editingLink: toJS(editingLink),
    editingLinkMode: editingLinkMode as TChangeMode,
    editingGroup,
    editingGroupIndex,

    threads: publicThreads(store.viewing.community.threads, {
      enable: toJS(enable),
      nameAlias: toJS(nameAlias),
    }),

    saving,
    isTouched: isChanged('headerLinks') && editingLink === null,
    isLayoutTouched: isChanged('headerLayout'),
  }
}

export default useHeaderSettingsInfo
