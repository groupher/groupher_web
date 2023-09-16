import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TAvatarLayout } from '@/spec'

// import { toJS } from '@/utils/mobx'
// import { merge } from 'ramda'

/**
 * please use useCurCommmunity instead, this hook works
 * but it will only update by a re-render due to mobx
 */
const useAvatarLayout = (): TAvatarLayout | null => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return store.dashboardThread.avatarLayout
}

export default useAvatarLayout
