import { keys, findIndex, clone, remove, filter, reject } from 'ramda'

import type { TLinkItem, TGroupedLinks } from '@/spec'
import { sortByIndex, groupByKey } from '@/utils/helper'
import { toJS } from '@/utils/mobx'

import { EMPTY_LINK_ITEM } from '../constant'
import type { TStore } from '../store'

let store: TStore | undefined

/**
 * add new link item to group
 */
export const add2Group = (group: string, index: number): void => {
  const { footerLinks } = store.footerSettings

  const grouplinks = filter((link) => link.group === group, footerLinks)

  if (grouplinks.length <= 0) return
  const { groupIndex } = grouplinks[0]

  const newItem = {
    ...EMPTY_LINK_ITEM,
    index,
    group,
    groupIndex,
  }

  store.mark({ footerLinks: [...footerLinks, newItem] })
}

/**
 * move links actions
 */
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

const _moveLink2Edge = (link: TLinkItem, opt: 'top' | 'bottom'): void => {
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

export const moveLinkUp = (link: TLinkItem): void => _moveLink(link, 'up')
export const moveLinkDown = (link: TLinkItem): void => _moveLink(link, 'down')

export const moveLink2Top = (link: TLinkItem): void => _moveLink2Edge(link, 'top')
export const moveLink2Bottom = (link: TLinkItem): void => _moveLink2Edge(link, 'bottom')

/**
 * move group actions
 */

const _reindexGroup = (groupKeys: string[], groupedLinks: TGroupedLinks): TGroupedLinks => {
  for (let index = 0; index < groupKeys.length; index += 1) {
    const gkey = groupKeys[index]

    groupedLinks[gkey] = groupedLinks[gkey].map((item) => ({
      ...item,
      groupIndex: index,
    }))
  }

  return groupedLinks
}

const _moveGroup = (group: string, opt: 'left' | 'right' | 'edge-left' | 'edge-right'): void => {
  const { footerLinks } = store

  const _groupedLinks = groupByKey(sortByIndex(toJS(footerLinks), 'groupIndex'), 'group')
  const groupKeys = keys(_groupedLinks) as string[]

  const groupedLinks = _reindexGroup(groupKeys, _groupedLinks)
  const curIndex = groupedLinks[group][0].groupIndex

  let nextIndex

  switch (opt) {
    case 'left': {
      nextIndex = curIndex - 1
      break
    }

    case 'right': {
      nextIndex = curIndex + 1
      break
    }

    case 'edge-left': {
      nextIndex = 0
      break
    }

    default: {
      nextIndex = groupKeys.length - 1
      break
    }
  }

  groupedLinks[group] = groupedLinks[group].map((item) => ({
    ...item,
    groupIndex: nextIndex,
  }))

  groupedLinks[groupKeys[nextIndex]] = groupedLinks[groupKeys[nextIndex]].map((item) => ({
    ...item,
    groupIndex: curIndex,
  }))

  const newFooterLinks = []
  groupKeys.forEach((key) => newFooterLinks.push(...groupedLinks[key]))

  store.mark({ footerLinks: newFooterLinks })
}

export const moveGroup2Left = (group: string): void => _moveGroup(group, 'left')
export const moveGroup2Right = (group: string): void => _moveGroup(group, 'right')

export const moveGroup2EdgeLeft = (group: string): void => _moveGroup(group, 'edge-left')
export const moveGroup2EdgeRight = (group: string): void => _moveGroup(group, 'edge-right')

export const moveLink2Group = () => {
  return []
}

export const init = (_store: TStore): void => {
  store = _store
}
