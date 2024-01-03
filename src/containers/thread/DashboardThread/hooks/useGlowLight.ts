import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

type TRet = {
  glowType: string
  glowFixed: boolean
  glowOpacity: string
  isTouched: boolean
  isGrowFixedTouched: boolean
  isGrowOpacityTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useGlowLight = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { glowType, glowFixed, glowOpacity, saving, touched } = store.dashboardThread

  return {
    glowType,
    glowFixed,
    glowOpacity,
    saving,
    isTouched: touched.glowType,
    isGrowFixedTouched: touched.glowFixed,
    isGrowOpacityTouched: touched.glowOpacity,
  }
}

export default useGlowLight
