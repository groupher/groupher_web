import { FC } from 'react'

import { DASHBOARD_BROADCAST_ROUTE } from '@/constant/route'

import GlobalEditor from './Global'
import ArticleEditor from './Article'

import type { TBroadcastSettings, TTouched } from '../../spec'

type TProps = {
  settings: TBroadcastSettings
  touched: TTouched
}

const Editor: FC<TProps> = ({ settings, touched }) => {
  const { broadcastTab } = settings

  return broadcastTab === DASHBOARD_BROADCAST_ROUTE.GLOBAL ? (
    <GlobalEditor settings={settings} touched={touched} />
  ) : (
    <ArticleEditor settings={settings} touched={touched} />
  )
}

export default Editor
