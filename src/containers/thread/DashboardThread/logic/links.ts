import { findIndex } from 'ramda'

import type { TLinkItem } from '@/spec'

import type { TStore } from '../store'

let store: TStore | undefined

const _moveLink = (link: TLinkItem, opt: 'up' | 'down' | 'top' | 'bottom'): void => {
  const { footerLinks } = store.footerSettings

  const linkIndex = findIndex((item) => item.index === link.index, footerLinks)

  let targetIndex

  switch (opt) {
    case 'up':
      targetIndex = linkIndex - 1
      break
    case 'down':
      targetIndex = linkIndex + 1
      break
    case 'top':
      targetIndex = 0
      break
    default:
      targetIndex = footerLinks.length - 1
      break
  }

  const tmp = footerLinks[targetIndex]
  footerLinks[targetIndex] = footerLinks[linkIndex]
  footerLinks[linkIndex] = tmp

  const tmpIndex = footerLinks[targetIndex].index
  footerLinks[targetIndex].index = footerLinks[linkIndex].index
  footerLinks[linkIndex].index = tmpIndex

  store.mark({ footerLinks })
}

export const moveUpLink = (link: TLinkItem): void => _moveLink(link, 'up')
export const moveDownLink = (link: TLinkItem): void => _moveLink(link, 'down')
export const move2TopLink = (link: TLinkItem): void => _moveLink(link, 'top')
export const move2BottomLink = (link: TLinkItem): void => _moveLink(link, 'bottom')

export const move2Group = () => {
  return []
}

export const init = (_store: TStore): void => {
  store = _store
}
