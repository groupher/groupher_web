import { findIndex, clone, remove } from 'ramda'

import type { TLinkItem } from '@/spec'

import type { TStore } from '../store'

let store: TStore | undefined

const _moveLink = (link: TLinkItem, opt: 'up' | 'down'): void => {
  const { footerLinks } = store.footerSettings

  const linkIndex = findIndex((item) => item.index === link.index, footerLinks)

  const targetIndex = opt === 'up' ? linkIndex - 1 : linkIndex + 1

  const tmp = footerLinks[targetIndex]
  footerLinks[targetIndex] = footerLinks[linkIndex]
  footerLinks[linkIndex] = tmp

  const tmpIndex = footerLinks[targetIndex].index
  footerLinks[targetIndex].index = footerLinks[linkIndex].index
  footerLinks[linkIndex].index = tmpIndex

  store.mark({ footerLinks })
}

const _reindex = (links: TLinkItem[]): TLinkItem[] => {
  return links.map((item, index) => ({
    ...item,
    index,
  }))
}

const _move2Edge = (link: TLinkItem, opt: 'top' | 'bottom'): void => {
  const { footerLinks } = store.footerSettings

  const curLinkItemIndex = findIndex((item) => item.index === link.index, footerLinks)
  const curLinkItem = clone(footerLinks[curLinkItemIndex])

  const newFooterLinks =
    opt === 'top'
      ? [curLinkItem, ...remove(curLinkItemIndex, 1, footerLinks)]
      : [...remove(curLinkItemIndex, 1, footerLinks), curLinkItem]

  store.mark({ footerLinks: _reindex(newFooterLinks) })
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
