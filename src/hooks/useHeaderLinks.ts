import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TLinkItem, THeaderLayout } from '@/spec'

type THeaderLinks = {
  layout: THeaderLayout
  links: TLinkItem[]
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHeaderLinks = (): THeaderLinks => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    layout: store.dashboardThread.headerLayout,
    links: store.dashboardThread.headerLinks,
  }
}

export default useHeaderLinks
