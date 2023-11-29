'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Widgets from '@/containers//thread/DashboardThread/Widgets'

const DashboardWidgetsPage = () => {
  const { widgetsSettings, touched } = useDashboardSettings()

  return <Widgets settings={widgetsSettings} touched={touched} />
}

export default observer(DashboardWidgetsPage)
