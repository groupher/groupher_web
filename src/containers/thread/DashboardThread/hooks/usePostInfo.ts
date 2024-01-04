import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TPostLayout } from '@/spec'

import useHelper from './useHelper'

type TRet = {
  layout: TPostLayout
  isTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const usePostInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { postLayout, saving } = store.dashboardThread

  return {
    layout: postLayout,
    saving,
    isTouched: isChanged('postLayout'),
  }
}

export default usePostInfo
