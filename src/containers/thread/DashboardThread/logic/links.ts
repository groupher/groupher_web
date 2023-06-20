import { keys, find, findIndex, clone, remove, filter, reject } from 'ramda'

import type { TLinkItem, TGroupedLinks } from '@/spec'
import { CHANGE_MODE } from '@/constant/mode'
import { sortByIndex, groupByKey } from '@/utils/helper'

import { ONE_LINK_GROUP, EMPTY_LINK_ITEM, MORE_GROUP } from '../constant'
import type { TStore } from '../store'

let store: TStore | undefined

export const updateInGroup = (link: TLinkItem): void => {
  store.mark({ editingLink: link, editingLinkMode: CHANGE_MODE.UPDATE })
}

/**
 * add new link item to group
 */
export const add2Group = (group: string, index: number): void => {
  const { curPageLinksKey } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  const grouplinks = filter((link: TLinkItem) => link.group === group, links)

  if (grouplinks.length <= 0) return
  const { groupIndex } = grouplinks[0]

  const newItem = {
    ...EMPTY_LINK_ITEM,
    index,
    group,
    groupIndex,
  }

  store.mark({
    [curPageLinksKey.links]: [...links, newItem],
    editingLink: newItem,
    editingLinkMode: CHANGE_MODE.CREATE,
  })
}

export const deleteLink = (linkItem: TLinkItem): void => {
  const { curPageLinksKey } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  const linksAfter = reject(
    (link: TLinkItem) => link.group === linkItem.group && link.index === linkItem.index,
    links,
  )

  store.mark({ [curPageLinksKey.links]: _reindex(linksAfter) })
}

export const deleteGroup = (groupIndex: number): void => {
  const { curPageLinksKey } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  const linksAfter = reject((link: TLinkItem) => link.groupIndex === groupIndex, links)
  store.mark({ [curPageLinksKey.links]: _reindexGroup(linksAfter) })
}

export const cancelLinkEditing = (): void => {
  const { curPageLinksKey, editingLink, editingLinkMode } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  if (editingLinkMode === CHANGE_MODE.UPDATE) {
    store.mark({ editingLink: null })
    return
  }

  const linksAfter = reject(
    (link: TLinkItem) => link.group === editingLink.group && link.index === editingLink.index,
    links,
  )

  store.mark({ [curPageLinksKey.links]: linksAfter, editingLink: null })
}

export const confirmLinkEditing = (): void => {
  const { curPageLinksKey, editingLink, editingLinkMode } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  if (editingLinkMode === CHANGE_MODE.UPDATE) {
    const editingIndex = findIndex(
      (item: TLinkItem) => item.index === editingLink.index && item.group === editingLink.group,
      links,
    )

    links[editingIndex].title = editingLink.title
    links[editingIndex].link = editingLink.link

    store.mark({ [curPageLinksKey.links]: links, editingLink: null })
    return
  }

  const curGroupLinks = filter((link: TLinkItem) => editingLink.group === link.group, links)

  const newAddLink = find(
    (link: TLinkItem) =>
      editingLink.group === link.group && link.index === curGroupLinks.length - 1,
    links,
  )

  const editingLinkAfter = {
    ...editingLink,
    index: newAddLink.index,
    group: newAddLink.group,
    groupIndex: newAddLink.groupIndex,
  }

  const linksAfter = reject(
    (link: TLinkItem) => link.group === newAddLink.group && link.index === newAddLink.index,
    links,
  ).concat(editingLinkAfter)

  store.mark({ [curPageLinksKey.links]: linksAfter, editingLink: null })

  _keepMoreGroupIfNeed()
}

const _keepMoreGroupIfNeed = (): void => {
  const { curPageLinksKey } = store
  if (curPageLinksKey.links !== 'headerLinks') return

  const links = store.headerSettings.headerLinks

  const _groupedLinks = groupByKey(links, 'group')
  const groupKeys = keys(_groupedLinks) as string[]

  const moreGroup = find((item: string) => item === MORE_GROUP, groupKeys)

  // create if no custom link exists
  if (links.length > 0 && !moreGroup) {
    const newLinkItem = {
      ...EMPTY_LINK_ITEM,
      title: '关于',
      link: '/home/about',
      group: MORE_GROUP,
      // make sure the "more" gorup is always in the end
      groupIndex: groupKeys.length + 2,
    }

    const linksAfter = [...links, newLinkItem]

    store.mark({ headerLinks: _reindexGroup(linksAfter) })
  } else {
    // make sure the "more" gorup is always in the end
    const linksAfter = links.map((item) => {
      return {
        ...item,
        groupIndex: item.group === MORE_GROUP ? links.length + 2 : item.groupIndex,
      }
    })

    store.mark({ headerLinks: _reindexGroup(linksAfter) })
  }
}

export const updateEditingLink = (key: string, value: string): void => {
  const { editingLink } = store

  const editingLinkAfter = { ...editingLink, [key]: value }

  store.mark({ editingLink: editingLinkAfter })
}

export const triggerGroupUpdate = (title: string, index: number): void => {
  store.mark({ editingGroup: title, editingGroupIndex: index })
}

export const triggerGroupAdd = (): void => {
  store.mark({ editingGroup: '', editingGroupIndex: null })
}

export const cancelGroupChange = (): void => {
  store.mark({ editingGroup: null, editingGroupIndex: null })
}

/**
 * header links only
 */
// export const addHeaderGroup = () => {
//   const time = new Date().getTime()

//   store.mark({ editingGroup: `${ONE_LINK_GROUP}_${time}` })
//   confirmGroupAdd()
// }

/**
 * header links only
 */
export const addHeaderLinkGroup = () => {
  const time = new Date().getTime()

  store.mark({ editingGroup: `${ONE_LINK_GROUP}_${time}` })
  confirmGroupAdd()
}

export const confirmGroupAdd = (): void => {
  const { curPageLinksKey, editingGroup } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  const _groupedLinks = groupByKey(links, 'group')
  const groupKeys = keys(_groupedLinks) as string[]

  const newLinkItem = {
    ...EMPTY_LINK_ITEM,
    group: editingGroup,
    groupIndex: groupKeys.length,
  }

  const linksAfter = [...links, newLinkItem]

  store.mark({ editingGroup: null, editingLink: newLinkItem, [curPageLinksKey.links]: linksAfter })
  _keepMoreGroupIfNeed()
}

export const confirmGroupUpdate = (): void => {
  const { curPageLinksKey, editingGroup, editingGroupIndex } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  // store.mark({ [curPageLinksKey.links]: _reindexGroup(links) })

  // const linksAfter = clone(_reindexGroup(links))
  const linksAfter = clone(links)

  console.log('## editingGroup: ', editingGroup)
  console.log('## editingGroupIndex: ', editingGroupIndex)
  console.log('## linksAfter before: ', linksAfter)

  for (let i = 0; i < links.length; i += 1) {
    const linkItem = links[i]

    if (linkItem.groupIndex === editingGroupIndex) {
      linksAfter[i].group = editingGroup
    }
  }

  console.log('## updated linksAfter: ', linksAfter)

  store.mark({ editingGroup: null, editingGroupIndex: null, [curPageLinksKey.links]: linksAfter })
}

// used when switching between template
export const resetEditingLink = (): void => {
  store.mark({ editingLink: null, editingGroup: null, editingGroupIndex: null })
}

export const updateEditingGroup = (title: string): void => {
  store.mark({ editingGroup: title })
}

/**
 * move links actions
 */
const _moveLink = (link: TLinkItem, opt: 'up' | 'down'): void => {
  const { group } = link
  const { curPageLinksKey } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  const groupLinks = filter((item: TLinkItem) => item.group === group, links)
  const restLinks = reject((item: TLinkItem) => item.group === group, links)

  const linkIndex = findIndex((item: TLinkItem) => item.index === link.index, groupLinks)

  const targetIndex = opt === 'up' ? linkIndex - 1 : linkIndex + 1

  const tmp = groupLinks[targetIndex]
  groupLinks[targetIndex] = groupLinks[linkIndex]
  groupLinks[linkIndex] = tmp

  const tmpIndex = groupLinks[targetIndex].index
  groupLinks[targetIndex].index = groupLinks[linkIndex].index
  groupLinks[linkIndex].index = tmpIndex

  store.mark({ [curPageLinksKey.links]: [...restLinks, ..._reindex(groupLinks)] })
}

const _reindex = (links: TLinkItem[]): TLinkItem[] => {
  return links.map((item, index) => ({
    ...item,
    index,
  }))
}

const _moveLink2Edge = (link: TLinkItem, opt: 'top' | 'bottom'): void => {
  const { group } = link
  const { curPageLinksKey } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  const groupLinks = filter((item: TLinkItem) => item.group === group, links)
  const restLinks = reject((item: TLinkItem) => item.group === group, links)

  const curLinkItemIndex = findIndex((item: TLinkItem) => item.index === link.index, groupLinks)
  const curLinkItem = clone(groupLinks[curLinkItemIndex])

  const newLinks =
    opt === 'top'
      ? [curLinkItem, ...remove(curLinkItemIndex, 1, groupLinks)]
      : [...remove(curLinkItemIndex, 1, groupLinks), curLinkItem]

  store.mark({ [curPageLinksKey.links]: [...restLinks, ..._reindex(newLinks)] })
}

export const moveLinkUp = (link: TLinkItem): void => _moveLink(link, 'up')
export const moveLinkDown = (link: TLinkItem): void => _moveLink(link, 'down')

export const moveLink2Top = (link: TLinkItem): void => _moveLink2Edge(link, 'top')
export const moveLink2Bottom = (link: TLinkItem): void => _moveLink2Edge(link, 'bottom')

/**
 * move group actions
 */

const _reindexGroup = (_targetLinks: TLinkItem[]): TLinkItem[] => {
  // @ts-ignore
  const targetLinks = clone(sortByIndex(_targetLinks, 'groupIndex'))

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

  return targetLinks as TLinkItem[]
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
  const { curPageLinksKey } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  // @ts-ignore
  const _groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
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

  const newLinks = []
  groupKeys.forEach((key) => newLinks.push(...groupedLinks[key]))

  store.mark({ [curPageLinksKey.links]: newLinks })
}

export const moveGroup2Left = (group: string): void => _moveGroup(group, 'left')
export const moveGroup2Right = (group: string): void => _moveGroup(group, 'right')

export const moveGroup2EdgeLeft = (group: string): void => _moveGroup(group, 'edge-left')
export const moveGroup2EdgeRight = (group: string): void => _moveGroup(group, 'edge-right')

// export const moveLink2Group = (link: TLinkItem, group: string): void => {

export const init = (_store: TStore): void => {
  store = _store
}
