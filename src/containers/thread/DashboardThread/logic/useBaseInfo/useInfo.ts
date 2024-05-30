import { pick } from 'ramda'

import useDashboard from '@/hooks/useDashboard'
import type { TSettingField } from '@/stores2/dashboardStore/spec'

import useHelper from '../useHelper'
import { BASEINFO_KEYS } from '../../constant'

export type TRet = {
  favicon: string
  logo: string
  locale: string
  title: string
  desc: string
  introduction: string
  homepage: string
  slug: string
  city: string
  techstack: string
  isTouched: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useInfo = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { anyChanged } = useHelper()

  return {
    ...pick(BASEINFO_KEYS, store),
    isTouched: anyChanged(BASEINFO_KEYS as TSettingField[]),
  } as TRet
}

export default useInfo
