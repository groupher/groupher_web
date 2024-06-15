import { useCallback } from 'react'

import type { TBrandLayout, TEditFunc } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

import useHelper from './useHelper'

type TRet = {
  edit: TEditFunc
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
