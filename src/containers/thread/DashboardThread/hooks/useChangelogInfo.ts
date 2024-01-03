import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TChangelogLayout } from '@/spec'

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

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { changelogLayout, saving, touched } = store.dashboardThread

  return {
    layout: changelogLayout,
    saving,
    isTouched: touched.changelogLayout,
  }
}

export default useChangelogInfo
