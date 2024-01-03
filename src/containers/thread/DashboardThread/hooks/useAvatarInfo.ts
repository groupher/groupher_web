import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TAvatarLayout } from '@/spec'

type TRet = {
  layout: TAvatarLayout
  isTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useAvatarInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { avatarLayout, saving, touched } = store.dashboardThread

  return {
    layout: avatarLayout,
    saving,
    isTouched: touched.avatarLayout,
  }
}

export default useAvatarInfo
