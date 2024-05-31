import { pick } from 'ramda'

import useDashboard from '@/hooks/useDashboard'
import type { TSettingField } from '@/stores2/dashboardStore/spec'

import useHelper from '../useHelper'
import { BASEINFO_LOGOS_KEYS } from '../../constant'

export type TRet = {
  favicon: string
  logo: string
  isLogosTouched: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useLogos = (): TRet => {
  const { dashboard: store } = useDashboard()
  const { anyChanged } = useHelper()

  // TODO: handle image upload

  return {
    ...pick(BASEINFO_LOGOS_KEYS, store),
    isLogosTouched: anyChanged(BASEINFO_LOGOS_KEYS as TSettingField[]),
  } as TRet
}

export default useLogos
