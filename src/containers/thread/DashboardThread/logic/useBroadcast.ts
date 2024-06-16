import { useCallback } from 'react'
import { pick } from 'ramda'

import type {
  TBroadcastLayout,
  TBroadcastConfig,
  TDashboardBroadcastRoute,
  TEditFunc,
} from '@/spec'
import useSubStore from '@/hooks/useSubStore'
import { SETTING_FIELD } from '@/stores3/dashboard/constant'

import useHelper from './useHelper'

type TRet = TBroadcastConfig & {
  edit: TEditFunc
  broadcastLayout: TBroadcastLayout
  broadcastTab: TDashboardBroadcastRoute
  saving: boolean
  getIsTouched: () => boolean
  getIsArticleTouched: () => boolean
  changeEnable: (v: boolean) => void
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const { edit, isChanged, onSave } = useHelper()

  // drived
  const getIsTouched = useCallback(() => {
    return isChanged('broadcastLayout') || isChanged('broadcastBg')
  }, [store])

  const getIsArticleTouched = useCallback(() => {
    return isChanged('broadcastArticleLayout') || isChanged('broadcastArticleBg')
  }, [store])

  const changeEnable = (v: boolean) => {
    store.commit({ broadcastEnable: v })
    setTimeout(() => onSave(SETTING_FIELD.BROADCAST_ENABLE))
  }

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
    changeEnable,
  }
}
