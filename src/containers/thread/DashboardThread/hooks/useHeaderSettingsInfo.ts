import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { THeaderLayout, TCommunityThread, TChangeMode, TLinkItem } from '@/spec'
import { toJS } from '@/mobx'
import { publicThreads } from '@/helper'

import type { TLinkState } from '../spec'

type TRet = {
  headerLayout: THeaderLayout
  headerLinks: TLinkItem[]
  threads: TCommunityThread[]
  isTouched: boolean
  isLayoutTouched: boolean
} & TLinkState

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHeaderSettingsInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

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
    aliasSettings,
    saving,
    touched,
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
      nameAlias: aliasSettings.nameAlias,
    }),

    saving,
    isTouched: touched.headerLinks,
    isLayoutTouched: touched.headerLayout,
  }
}

export default useHeaderSettingsInfo
