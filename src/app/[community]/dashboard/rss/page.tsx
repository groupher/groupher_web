'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import RSS from '@/containers//thread/DashboardThread/RSS'

const DashboardRSSPage = () => {
  const { rssSettings, touched } = useDashboardSettings()

  return <RSS settings={rssSettings} touched={touched} />
}

export default observer(DashboardRSSPage)
