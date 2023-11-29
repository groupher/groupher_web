'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import BasicInfo from '@/containers//thread/DashboardThread/BasicInfo'

const DashboardInfoPage = () => {
  const { baseInfoSettings, touched } = useDashboardSettings()

  return <BasicInfo settings={baseInfoSettings} touched={touched} />
}

export default observer(DashboardInfoPage)
