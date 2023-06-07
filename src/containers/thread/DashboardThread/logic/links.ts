import { keys, find, findIndex, clone, remove, filter, reject } from 'ramda'

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

  store.mark({ footerLinks: [...footerLinks, newItem], editingLink: newItem })
}

export const deleteLink = (linkItem: TLinkItem): void => {
  const { footerLinks } = store.footerSettings

  const footerLinksAfter = reject(
    (link: TLinkItem) => link.group === linkItem.group && link.index === linkItem.index,
    footerLinks,
  )

  store.mark({ footerLinks: _reindex(footerLinksAfter) })
}

export const deleteGroup = (groupIndex: number): void => {
  const { footerLinks } = store.footerSettings

  const footerLinksAfter = reject((link: TLinkItem) => link.groupIndex === groupIndex, footerLinks)
  store.mark({ footerLinks: _reindexGroup(footerLinksAfter) })
}

export const cancelLinkEditing = (): void => {
  const { editingLink, footerLinks } = store.footerSettings

  const footerLinksAfter = reject(
    (link: TLinkItem) => link.group === editingLink.group && link.index === editingLink.index,
    footerLinks,
  )

  store.mark({ footerLinks: footerLinksAfter, editingLink: null })
}

export const confirmLinkEditing = (): void => {
  const { editingLink, footerLinks } = store.footerSettings

  const curGroupLinks = filter((link: TLinkItem) => editingLink.group === link.group, footerLinks)

  const newAddLink = find(
    (link: TLinkItem) =>
      editingLink.group === link.group && link.index === curGroupLinks.length - 1,
    footerLinks,
  )

  const editingLinkAfter = {
    ...editingLink,
    index: newAddLink.index,
    group: newAddLink.group,
    groupIndex: newAddLink.groupIndex,
  }

  const footerLinksAfter = reject(
    (link: TLinkItem) => link.group === newAddLink.group && link.index === newAddLink.index,
    footerLinks,
  ).concat(editingLinkAfter)

  store.mark({ footerLinks: footerLinksAfter, editingLink: null })
  // TODO: do real network mutation
}

export const updateEditingLink = (key: string, value: string): void => {
  const { editingLink } = store

  const editingLinkAfter = { ...editingLink, [key]: value }

  store.mark({ editingLink: editingLinkAfter })
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

const _reindexGroup = (targetLinks: TLinkItem[]): TLinkItem[] => {
  const _groupedLinks = groupByKey(targetLinks, 'group')
  const groupKeys = keys(_groupedLinks) as string[]

  for (let i = 0; i < groupKeys.length; i += 1) {
    const gkey = groupKeys[i]

    for (let j = 0; j < targetLinks.length; j += 1) {
      if (targetLinks[j].group === gkey) {
        targetLinks[j].groupIndex = i
      }
    }
  }

  return targetLinks
}

const _reindexByGroup = (groupKeys: string[], groupedLinks: TGroupedLinks): TGroupedLinks => {
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
  const { footerLinks } = store.footerSettings

  // @ts-ignore
  const _groupedLinks = groupByKey(sortByIndex(footerLinks, 'groupIndex'), 'group')
  const groupKeys = keys(_groupedLinks) as string[]

  const groupedLinks = _reindexByGroup(groupKeys, _groupedLinks)
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

// export const moveLink2Group = (link: TLinkItem, group: string): void => {

export const init = (_store: TStore): void => {
  store = _store
}
