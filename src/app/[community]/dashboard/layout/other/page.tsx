'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Layout from '@/containers//thread/DashboardThread/Layout'

const DashboardLayoutPage = () => {
  const { uiSettings, touched } = useDashboardSettings()

  return <Layout settings={uiSettings} touched={touched} />
}

export default observer(DashboardLayoutPage)
