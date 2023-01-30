import { FC } from 'react'

import type { TDashboardBroadcastRoute } from '@/spec'
import { DASHBOARD_BROADCAST_ROUTE } from '@/constant/route'

import GlobalEditor from './Global'
import ArticleEditor from './Article'

import type { TBroadcastSettings } from '../../spec'

type TProps = {
  settings: TBroadcastSettings
  tab: TDashboardBroadcastRoute
}

const Editor: FC<TProps> = ({ settings, tab }) => {
  return tab === DASHBOARD_BROADCAST_ROUTE.GLOBAL ? (
    <GlobalEditor settings={settings} />
  ) : (
    <ArticleEditor settings={settings} />
  )
}

export default Editor
