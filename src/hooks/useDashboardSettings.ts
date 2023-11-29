import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick } from 'ramda'

import type { TEnableConfig, TDashboardPath } from '@/spec'

import type {
  TOverview,
  TBaseInfoSettings,
  TSEOSettings,
  TUiSettings,
  TTagSettings,
  TRSSSettings,
  THeaderSettings,
  TFooterSettings,
  TAliasSettings,
  TAdminSettings,
  TTouched,
  TWidgetsSettings,
  TBroadcastSettings,
  TCMSContents,
} from '@/containers/thread/DashboardThread/spec'

type TRes = {
  curTab: TDashboardPath
  overviewData: TOverview
  baseInfoSettings: TBaseInfoSettings
  seoSettings: TSEOSettings
  enableSettings: TEnableConfig
  uiSettings: TUiSettings
  tagSettings: TTagSettings
  rssSettings: TRSSSettings

  headerSettings: THeaderSettings
  footerSettings: TFooterSettings
  aliasSettings: TAliasSettings
  adminSettings: TAdminSettings
  widgetsSettings: TWidgetsSettings
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
      'uiSettings',
      'tagSettings',
      'rssSettings',
      'headerSettings',
      'footerSettings',
      'aliasSettings',
      'adminSettings',
      'widgetsSettings',
      // docSettings,
      'broadcastSettings',
      'touched',
      'cmsContents',
    ],
    store.dashboardThread,
  ) as TRes
}

export default useDashboardSettings
