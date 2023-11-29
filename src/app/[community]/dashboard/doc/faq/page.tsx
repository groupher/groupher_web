'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import CMS from '@/containers//thread/DashboardThread/CMS'

const DashboardDocPage = () => {
  const { cmsContents, curTab, touched } = useDashboardSettings()

  return <CMS cmsContents={cmsContents} route={curTab} touched={touched} />
}

export default observer(DashboardDocPage)
