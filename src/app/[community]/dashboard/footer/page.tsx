'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Footer from '@/containers//thread/DashboardThread/Footer'

const DashboardFooterPage = () => {
  const { footerSettings, touched } = useDashboardSettings()

  return <Footer settings={footerSettings} touched={touched} />
}

export default observer(DashboardFooterPage)
