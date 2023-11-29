'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Threads from '@/containers//thread/DashboardThread/Threads'

const DashboardThreadsPage = () => {
  const { enableSettings } = useDashboardSettings()

  return <Threads settings={enableSettings} />
}

export default observer(DashboardThreadsPage)
