import { useCallback } from 'react'

import type { TBrandLayout, TEditValue } from '@/spec'
import type { TSettingField } from '@/stores3/dashboard/spec'

import useSubStore from '@/hooks/useSubStore'

import useHelper from './useHelper'

type TRet = {
  edit: (value: TEditValue, field: TSettingField) => void
  layout: TBrandLayout
  getIsTouched: () => boolean
  saving: boolean
}

export default (): TRet => {
  const store = useSubStore('dashboard')
  const { isChanged, edit } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { brandLayout, saving } = store

  // drived
  const getIsTouched = useCallback(() => isChanged('brandLayout'), [store])

  return {
    edit,
    layout: brandLayout,
    getIsTouched,
    saving,
  }
}
