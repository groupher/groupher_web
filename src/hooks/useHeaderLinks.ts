import { useMemo } from 'react'
import { find } from 'ramda'

import type { TLinkItem, THeaderLayout } from '@/spec'
import { MORE_GROUP } from '@/const/dashboard'

import useSubStore from '@/hooks/useSubStore'
import useViewingCommunity from '@/hooks/useViewingCommunity'

type THeaderLinks = {
  layout: THeaderLayout
  links: TLinkItem[]
  customLinks: TLinkItem[]
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
export default (): THeaderLinks => {
  const store = useSubStore('dashboard')
  const viewingCommunity = useViewingCommunity()
  const community = viewingCommunity.slug

  const { headerLinks } = store
  // const { isModerator } = store.accountInfo
  const isModerator = true

  const hasExtraAbout = find((link: TLinkItem) => link.title === '关于', headerLinks)

  const aboutLink = !hasExtraAbout
    ? {
        index: 999,
        title: '关于',
        group: MORE_GROUP,
        link: `/${community}/about`,
      }
    : { title: '', index: 0 }

  const dashboardLink = {
    index: 1000,
    title: '控制台',
    group: MORE_GROUP,
    link: `/${community}/dashboard`,
  }

  const customLinks = useMemo(() => {
    return isModerator ? [...headerLinks, aboutLink, dashboardLink] : headerLinks
  }, [community])

  return {
    layout: store.headerLayout,
    links: headerLinks,
    customLinks,
  }
}
