import { useContext, useMemo } from 'react'
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

  const footerlinks = useMemo(() => store.dashboardThread.footerLinksData, [])

  return {
    layout: store.dashboardThread.footerLayout,
    links: footerlinks,
  }
}

export default useFooterLinks
