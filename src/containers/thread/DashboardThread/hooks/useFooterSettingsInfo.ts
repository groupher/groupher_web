import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TFooterLayout, TCommunityThread, TChangeMode, TLinkItem } from '@/spec'
import { toJS } from '@/mobx'
import { publicThreads } from '@/helper'

import type { TLinkState } from '../spec'

import useHelper from './useHelper'

type TRet = {
  footerLayout: TFooterLayout
  footerLinks: TLinkItem[]
  threads: TCommunityThread[]
  isTouched: boolean
  isLayoutTouched: boolean
} & TLinkState

const useFooterSettingsInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

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
  } = store.dashboardThread

  return {
    footerLayout,
    footerLinks: toJS(footerLinks),
    editingLink: toJS(editingLink),
    editingLinkMode: editingLinkMode as TChangeMode,
    editingGroup,
    editingGroupIndex,

    threads: publicThreads(store.viewing.community.threads, {
      enable: toJS(enable),
      nameAlias: toJS(nameAlias),
    }),

    saving,
    isTouched: isChanged('footerLinks') && editingLink === null,
    isLayoutTouched: isChanged('footerLayout'),
  }
}

export default useFooterSettingsInfo
