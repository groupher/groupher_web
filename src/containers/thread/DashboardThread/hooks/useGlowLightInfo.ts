import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import useHelper from './useHelper'

type TRet = {
  glowType: string
  glowFixed: boolean
  glowOpacity: string
  isTouched: boolean
  isGrowFixedTouched: boolean
  isGrowOpacityTouched: boolean
  saving: boolean
}

const useGlowLightInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { glowType, glowFixed, glowOpacity, saving } = store.dashboardThread

  return {
    glowType,
    glowFixed,
    glowOpacity,
    saving,
    isTouched: isChanged('glowType'),
    isGrowFixedTouched: isChanged('glowFixed'),
    isGrowOpacityTouched: isChanged('glowOpacity'),
  }
}

export default useGlowLightInfo
