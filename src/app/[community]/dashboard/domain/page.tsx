'use client'

import { observer } from 'mobx-react-lite'

// import useDashboardSettings from '@/hooks/useDashboardSettings'
import Domain from '@/containers//thread/DashboardThread/Domain'

const DashboardDomainPage = () => {
  return <Domain />
}

export default observer(DashboardDomainPage)
