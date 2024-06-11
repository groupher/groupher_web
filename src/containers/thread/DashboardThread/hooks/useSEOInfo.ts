import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { pick } from 'ramda'

import type { TDashboardSEOConfig, TDashboardSEORoute } from '@/spec'

import type { TSettingField } from '../spec'
import useHelper from './useHelper'
import { SEO_KEYS } from '../constant'

type TRet = TDashboardSEOConfig & {
  saving: boolean
  seoTab: TDashboardSEORoute
  loading: boolean
  isTouched: boolean
}

const useSEOInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { anyChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    ...pick(SEO_KEYS, store.dashboardThread),
    ...pick(['seoTab', 'loading', 'saving'], store.dashboardThread),
    isTouched: anyChanged(SEO_KEYS as TSettingField[]),
  } as TRet
}

export default useSEOInfo
