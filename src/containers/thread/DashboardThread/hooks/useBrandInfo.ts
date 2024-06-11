import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TBrandLayout } from '@/spec'

import useHelper from './useHelper'

type TRet = {
  layout: TBrandLayout
  isTouched: boolean
  saving: boolean
}

const useBrandInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { brandLayout, saving } = store.dashboardThread

  return {
    layout: brandLayout,
    isTouched: isChanged('brandLayout'),
    saving,
  }
}

export default useBrandInfo
