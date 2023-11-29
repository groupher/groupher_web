'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Overview from '@/containers//thread/DashboardThread/Overview'

import { useStore } from '@/containers//thread/DashboardThread/store'
import { useInit } from '@/containers//thread/DashboardThread/logic'

const DashboardOverviewPage = () => {
  const { overviewData } = useDashboardSettings()
  const store = useStore()
  useInit(store)

  return <Overview data={overviewData} />
}

export default observer(DashboardOverviewPage)
