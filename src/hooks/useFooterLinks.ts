import { useMemo } from 'react'

import type { TLinkItem, TFooterLayout } from '@/spec'
import useSubStore from '@/hooks/useSubStore'
import useViewingCommunity from '@/hooks/useViewingCommunity'

type TFooterLinks = {
  layout: TFooterLayout
  links: TLinkItem[]
}

export default (): TFooterLinks => {
  const store = useSubStore('dashboard')

  const viewingCommunity = useViewingCommunity()
  const footerlinks = useMemo(() => store.footerLinks, [viewingCommunity.slug])

  return {
    layout: store.footerLayout,
    links: footerlinks,
  }
}
