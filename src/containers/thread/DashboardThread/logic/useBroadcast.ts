import { useCallback } from 'react'
import { pick } from 'ramda'

import type {
  TBroadcastLayout,
  TBroadcastConfig,
  TDashboardBroadcastRoute,
  TEditFunc,
} from '@/spec'
import useSubStore from '@/hooks/useSubStore'

import useHelper from './useHelper'

type TRet = TBroadcastConfig & {
  edit: TEditFunc
  broadcastLayout: TBroadcastLayout
  broadcastTab: TDashboardBroadcastRoute
  saving: boolean
  getIsTouched: () => boolean
  getIsArticleTouched: () => boolean
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const { edit, isChanged } = useHelper()

  const getIsTouched = useCallback(() => {
    return isChanged('broadcastLayout') || isChanged('broadcastBg')
  }, [store])

  const getIsArticleTouched = useCallback(() => {
    return isChanged('broadcastArticleLayout') || isChanged('broadcastArticleBg')
  }, [store])

  return {
    edit,
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
      store,
    ),
    getIsTouched,
    getIsArticleTouched,
  }
}
