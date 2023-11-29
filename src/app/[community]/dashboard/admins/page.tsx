'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Admin from '@/containers//thread/DashboardThread/Admin'

const DashboardAdminPage = () => {
  const { adminSettings } = useDashboardSettings()

  return <Admin settings={adminSettings} />
}

export default observer(DashboardAdminPage)
