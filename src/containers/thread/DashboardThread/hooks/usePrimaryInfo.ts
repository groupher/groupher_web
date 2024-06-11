import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TColorName } from '@/spec'

import useHelper from './useHelper'

type TRet = {
  primaryColor: TColorName
  isTouched: boolean
  saving: boolean
}

const usePrimaryInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { primaryColor, saving } = store.dashboardThread

  return {
    primaryColor,
    saving,
    isTouched: isChanged('primaryColor'),
  }
}

export default usePrimaryInfo
