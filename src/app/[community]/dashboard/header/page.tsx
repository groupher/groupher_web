'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Header from '@/containers//thread/DashboardThread/Header'

const DashboardHeaderPage = () => {
  const { headerSettings, touched } = useDashboardSettings()

  return <Header settings={headerSettings} touched={touched} />
}

export default observer(DashboardHeaderPage)
