import { findIndex, clone, remove, filter, reject } from 'ramda'

import type { TLinkItem } from '@/spec'

import type { TStore } from '../store'

let store: TStore | undefined

const _moveLink = (link: TLinkItem, opt: 'up' | 'down'): void => {
  const { group } = link
  const { footerLinks } = store.footerSettings

  const groupFooterLinks = filter((item: TLinkItem) => item.group === group, footerLinks)
  const restFooterLinks = reject((item: TLinkItem) => item.group === group, footerLinks)

  const linkIndex = findIndex((item) => item.index === link.index, groupFooterLinks)

  const targetIndex = opt === 'up' ? linkIndex - 1 : linkIndex + 1

  const tmp = groupFooterLinks[targetIndex]
  groupFooterLinks[targetIndex] = groupFooterLinks[linkIndex]
  groupFooterLinks[linkIndex] = tmp

  const tmpIndex = groupFooterLinks[targetIndex].index
  groupFooterLinks[targetIndex].index = groupFooterLinks[linkIndex].index
  groupFooterLinks[linkIndex].index = tmpIndex

  store.mark({ footerLinks: [...restFooterLinks, ..._reindex(groupFooterLinks)] })
}

const _reindex = (links: TLinkItem[]): TLinkItem[] => {
  return links.map((item, index) => ({
    ...item,
    index,
  }))
}

const _move2Edge = (link: TLinkItem, opt: 'top' | 'bottom'): void => {
  const { group } = link
  const { footerLinks } = store.footerSettings

  const groupFooterLinks = filter((item: TLinkItem) => item.group === group, footerLinks)
  const restFooterLinks = reject((item: TLinkItem) => item.group === group, footerLinks)

  const curLinkItemIndex = findIndex((item) => item.index === link.index, groupFooterLinks)
  const curLinkItem = clone(groupFooterLinks[curLinkItemIndex])

  const newFooterLinks =
    opt === 'top'
      ? [curLinkItem, ...remove(curLinkItemIndex, 1, groupFooterLinks)]
      : [...remove(curLinkItemIndex, 1, groupFooterLinks), curLinkItem]

  store.mark({ footerLinks: [...restFooterLinks, ..._reindex(newFooterLinks)] })
}

export const moveUpLink = (link: TLinkItem): void => _moveLink(link, 'up')
export const moveDownLink = (link: TLinkItem): void => _moveLink(link, 'down')

export const move2TopLink = (link: TLinkItem): void => _move2Edge(link, 'top')
export const move2BottomLink = (link: TLinkItem): void => _move2Edge(link, 'bottom')

export const move2Group = () => {
  return []
}

export const init = (_store: TStore): void => {
  store = _store
}
