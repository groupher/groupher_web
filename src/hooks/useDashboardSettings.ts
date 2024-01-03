import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick } from 'ramda'

import type { TEnableConfig, TDashboardPath } from '@/spec'

import type {
  TOverview,
  TBaseInfoSettings,
  TSEOSettings,
  TTagSettings,
  TRSSSettings,
  THeaderSettings,
  TFooterSettings,
  TTouched,
  TBroadcastSettings,
  TCMSContents,
} from '@/containers/thread/DashboardThread/spec'

type TRes = {
  curTab: TDashboardPath
  overviewData: TOverview
  baseInfoSettings: TBaseInfoSettings
  seoSettings: TSEOSettings
  enableSettings: TEnableConfig
  tagSettings: TTagSettings
  rssSettings: TRSSSettings

  headerSettings: THeaderSettings
  footerSettings: TFooterSettings
  broadcastSettings: TBroadcastSettings
  touched: TTouched
  cmsContents: TCMSContents
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useDashboardSettings = (): TRes => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return pick(
    [
      'curTab',
      'overviewData',
      'baseInfoSettings',
      'seoSettings',
      'enableSettings',
      'tagSettings',
      'rssSettings',
      'headerSettings',
      'footerSettings',
      // docSettings,
      'broadcastSettings',
      'touched',
      'cmsContents',
    ],
    store.dashboardThread,
  ) as TRes
}

export default useDashboardSettings
