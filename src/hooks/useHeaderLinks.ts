import { useContext, useMemo } from 'react'
import { find } from 'ramda'
import { MobXProviderContext } from 'mobx-react'

import type { TLinkItem, THeaderLayout } from '@/spec'
import { MORE_GROUP } from '@/const/dashboard'

import { toJS } from '@/mobx'

type THeaderLinks = {
  layout: THeaderLayout
  links: TLinkItem[]
  customLinks: TLinkItem[]
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useHeaderLinks = (): THeaderLinks => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  // const { isModerator } = store.accountInfo
  const isModerator = true
  const viewingCommunity = store.viewing.community.slug
  const headerLinksRow = useMemo(() => store.dashboardThread.headerLinksData, [viewingCommunity])

  const hasExtraAbout = find((link: TLinkItem) => link.title === '关于', headerLinksRow)

  const aboutLink = !hasExtraAbout
    ? {
        index: 999,
        title: '关于',
        group: MORE_GROUP,
        link: `/${viewingCommunity}/about`,
      }
    : { title: '', index: 0 }

  const dashboardLink = {
    index: 1000,
    title: '控制台',
    group: MORE_GROUP,
    link: `/${viewingCommunity}/dashboard`,
  }

  const customLinks = useMemo(() => {
    return isModerator ? [...headerLinksRow, aboutLink, dashboardLink] : headerLinksRow
  }, [viewingCommunity])

  const headerlinks = useMemo(() => store.dashboardThread.headerLinksData, [viewingCommunity])

  return {
    layout: store.dashboardThread.headerLayout,
    links: headerlinks,
    customLinks,
  }
}

export default useHeaderLinks
