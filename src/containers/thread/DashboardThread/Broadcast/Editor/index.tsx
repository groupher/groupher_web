import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { DASHBOARD_BROADCAST_ROUTE } from '@/const/route'

import GlobalEditor from './Global'
import ArticleEditor from './Article'

import useBroadcastInfo from '../../hooks/useBroadcastInfo'

const Editor: FC = () => {
  const { broadcastTab } = useBroadcastInfo()

  return broadcastTab === DASHBOARD_BROADCAST_ROUTE.GLOBAL ? <GlobalEditor /> : <ArticleEditor />
}

export default observer(Editor)
