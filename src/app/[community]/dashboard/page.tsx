'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Overview from '@/containers//thread/DashboardThread/Overview'

const DashboardOverviewPage = () => {
  const { overviewData } = useDashboardSettings()

  return <Overview data={overviewData} />
}

export default observer(DashboardOverviewPage)
