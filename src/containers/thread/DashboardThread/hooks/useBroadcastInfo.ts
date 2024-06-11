import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick } from 'ramda'

import type { TBroadcastLayout, TBroadcastConfig, TDashboardBroadcastRoute } from '@/spec'

import useHelper from './useHelper'

type TRet = TBroadcastConfig & {
  layout: TBroadcastLayout
  broadcastTab: TDashboardBroadcastRoute
  saving: boolean
  isTouched: boolean
  isArticleTouched: boolean
}

const useBroadcastInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    ...pick(
      [
        'broadcastLayout',
        'broadcastTab',
        'broadcastBg',
        'broadcastEnable',
        'broadcastArticleBg',
        'broadcastArticleLayout',
        'broadcastArticleEnable',
        'saving',
      ],
      store.dashboardThread,
    ),
    isTouched: isChanged('broadcastLayout') || isChanged('broadcastBg'),
    isArticleTouched: isChanged('broadcastArticleLayout') || isChanged('broadcastArticleBg'),
  } as TRet
}

export default useBroadcastInfo
