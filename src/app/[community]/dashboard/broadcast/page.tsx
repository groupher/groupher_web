'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Broadcast from '@/containers//thread/DashboardThread/Broadcast'

const DashboardBroadcastPage = () => {
  const { broadcastSettings, touched } = useDashboardSettings()

  return <Broadcast settings={broadcastSettings} touched={touched} />
}

export default observer(DashboardBroadcastPage)
