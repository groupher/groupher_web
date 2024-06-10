import { pick } from 'ramda'

import type { TSettingField } from '@/stores3/dashboardStore/spec'
import useSubStore from '@/hooks/useSubStore'

import useHelper from '../useHelper'
import { BASEINFO_BASIC_KEYS } from '../../constant'

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
  const store = useSubStore('dashboard')
  const { anyChanged } = useHelper()

  return {
    ...pick(BASEINFO_BASIC_KEYS, store),
    isTouched: anyChanged(BASEINFO_BASIC_KEYS as TSettingField[]),
  }
}

export default useInfo
