import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TTagLayout } from '@/spec'

type TRet = {
  layout: TTagLayout
  isTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useTagInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { tagLayout, saving, touched } = store.dashboardThread

  return {
    layout: tagLayout,
    saving,
    isTouched: touched.tagLayout,
  }
}

export default useTagInfo
