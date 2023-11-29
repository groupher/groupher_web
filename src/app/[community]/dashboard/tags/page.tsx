'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Tags from '@/containers//thread/DashboardThread/Tags'

const DashboardTagsPage = () => {
  const { tagSettings, touched } = useDashboardSettings()

  return <Tags settings={tagSettings} touched={touched} />
}

export default observer(DashboardTagsPage)
