import { pick } from 'ramda'

import useSubStore from '@/hooks/useSubStore'
import type { TSettingField } from '@/stores3/dashboard/spec'

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
  const store = useSubStore('dashboard')
  const { anyChanged } = useHelper()

  // TODO: handle image upload

  return {
    ...pick(BASEINFO_LOGOS_KEYS, store),
    isLogosTouched: anyChanged(BASEINFO_LOGOS_KEYS as TSettingField[]),
  }
}

export default useLogos
