import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TChangelogLayout } from '@/spec'

import useHelper from './useHelper'

type TRet = {
  layout: TChangelogLayout
  isTouched: boolean
  saving: boolean
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useChangelogInfo = (): TRet => {
  const { store } = useContext(MobXProviderContext)
  const { isChanged } = useHelper()

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { changelogLayout, saving } = store.dashboardThread

  return {
    layout: changelogLayout,
    saving,
    isTouched: isChanged('changelogLayout'),
  }
}

export default useChangelogInfo
