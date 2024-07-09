import { useCallback } from 'react'
import { find } from 'ramda'

import type { TLinkItem, THeaderLayout } from '~/spec'
import { MORE_GROUP } from '~/const/dashboard'

import useSubStore from '~/hooks/useSubStore'
import useViewingCommunity from '~/hooks/useViewingCommunity'

type THeaderLinks = {
  layout: THeaderLayout
  links: TLinkItem[]
  getCustomLinks: () => TLinkItem[]
}

export default (): THeaderLinks => {
  const store = useSubStore('dashboard')
  const viewingCommunity = useViewingCommunity()
  const community = viewingCommunity.slug

  const { headerLinks } = store
  // TODO:
  const isModerator = true

  const getCustomLinks = useCallback(() => {
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

    return isModerator ? [...headerLinks, aboutLink, dashboardLink] : headerLinks
  }, [headerLinks, community])

  return {
    layout: store.headerLayout,
    links: headerLinks,
    getCustomLinks,
  }
}
