import { useCallback } from 'react'

import type { TColorName, TEditValue } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

import type { TSettingField } from '@/stores3/dashboard/spec'

import useHelper from './useHelper'

type TRet = {
  edit: (value: TEditValue, field: TSettingField) => void
  primaryColor: TColorName
  saving: boolean
  getIsTouched: () => boolean
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const { isChanged, edit } = useHelper()

  const { primaryColor, saving } = store

  // drived
  const getIsTouched = useCallback(() => isChanged('primaryColor'), [store])

  return {
    edit,
    primaryColor,
    saving,
    getIsTouched,
  }
}
