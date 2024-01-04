import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TAvatarLayout } from '@/spec'

import useHelper from './useHelper'

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
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { avatarLayout, saving } = store.dashboardThread

  return {
    layout: avatarLayout,
    saving,
    isTouched: isChanged('avatarLayout'),
  }
}

export default useAvatarInfo
