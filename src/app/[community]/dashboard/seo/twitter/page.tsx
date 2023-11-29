'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import SEO from '@/containers//thread/DashboardThread/SEO'

const DashboardSeoPage = () => {
  const { seoSettings, touched } = useDashboardSettings()

  return <SEO settings={seoSettings} touched={touched} />
}

export default observer(DashboardSeoPage)
