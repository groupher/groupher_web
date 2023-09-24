import { useContext } from 'react'
import { find } from 'ramda'
import { MobXProviderContext } from 'mobx-react'

import type { TLinkItem, THeaderLayout } from '@/spec'
import { MORE_GROUP } from '@/constant/dashboard'

import { toJS } from '@/mobx'

type THeaderLinks = {
  layout: THeaderLayout
  links: TLinkItem[]
  extraLinks: TLinkItem[]
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHeaderLinks = (): THeaderLinks => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const { isModerator } = store.accountInfo
  const { community } = store.viewing

  const { headerLinks } = store.dashboardThread
  const headerLinksRow = toJS(headerLinks)

  const hasExtraAbout = find((link: TLinkItem) => link.title === '关于', headerLinksRow)

  const aboutLink = !hasExtraAbout
    ? {
        index: 999,
        title: '关于',
        group: MORE_GROUP,
        link: `/${community.slug}/about`,
      }
    : { title: '', index: 0 }

  const dashboardLink = {
    index: 1000,
    title: '控制台',
    group: MORE_GROUP,
    link: `/${community.slug}/dashboard`,
  }

  const extraLinks = isModerator ? [...headerLinksRow, aboutLink, dashboardLink] : headerLinksRow

  return {
    layout: store.dashboardThread.headerLayout,
    links: store.dashboardThread.headerLinks,
    extraLinks,
  }
}

export default useHeaderLinks
