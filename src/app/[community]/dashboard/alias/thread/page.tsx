'use client'

import { observer } from 'mobx-react-lite'

import useDashboardSettings from '@/hooks/useDashboardSettings'
import Alias from '@/containers//thread/DashboardThread/Alias'

const DashboardAliasPage = () => {
  const { aliasSettings } = useDashboardSettings()

  return <Alias settings={aliasSettings} />
}

export default observer(DashboardAliasPage)
