import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TLinkItem, TFooterLayout } from '@/spec'

type TFooterLinks = {
  layout: TFooterLayout
  links: TLinkItem[]
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useFooterLinks = (): TFooterLinks => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    layout: store.dashboardThread.footerLayout,
    links: store.dashboardThread.footerLinks,
  }
}

export default useFooterLinks
