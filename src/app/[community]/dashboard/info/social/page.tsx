'use client'

import { observer } from 'mobx-react-lite'

import BasicInfo from '@/containers//thread/DashboardThread/BasicInfo'

const DashboardInfoPage = () => {
  return <BasicInfo />
}

export default observer(DashboardInfoPage)
