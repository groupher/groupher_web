import { keys, find, findIndex, clone, remove, filter, reject } from 'ramda'

import type { TLinkItem, TGroupedLinks } from '@/spec'
import { CHANGE_MODE } from '@/constant/mode'
import { ROUTE } from '@/constant/route'
import { ONE_LINK_GROUP, MORE_GROUP } from '@/constant/dashboard'
import { sortByIndex, groupByKey } from '@/utils/helper'
import { toJS } from '@/utils/mobx'

import type { TMoveLinkDir } from '../spec'
import { EMPTY_LINK_ITEM } from '../constant'
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

  let linksAfter = reject(
    (link: TLinkItem) => link.group === linkItem.group && link.index === linkItem.index,
    links,
  )

  linksAfter = _emptyLinksIfNedd(linksAfter)

  store.mark({ [curPageLinksKey.links]: _reindex(linksAfter) })
}

export const deleteGroup = (groupIndex: number): void => {
  const { curPageLinksKey } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  let linksAfter = reject((link: TLinkItem) => link.groupIndex === groupIndex, links)

  linksAfter = _emptyLinksIfNedd(linksAfter)

  store.mark({ [curPageLinksKey.links]: _reindexGroup(linksAfter) })
}

// if only fold about links leave, empty them all
const _emptyLinksIfNedd = (links: TLinkItem[]): TLinkItem[] => {
  const { curPageLinksKey } = store

  if (
    curPageLinksKey.links === 'headerLinks' &&
    links.length === 1 &&
    links[0].group === MORE_GROUP
  ) {
    return []
  }

  return links
}

export const cancelLinkEditing = (): void => {
  const { curPageLinksKey, editingLink, editingLinkMode, initSettings } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  if (editingLinkMode === CHANGE_MODE.UPDATE) {
    store.mark({ editingLink: null })
    return
  }

  let linksAfter = reject(
    (link: TLinkItem) => link.group === editingLink.group && link.index === editingLink.index,
    links,
  )

  linksAfter = _emptyLinksIfNedd(linksAfter)

  store.mark({
    [curPageLinksKey.links]: linksAfter,
    editingLink: null,
    initSettings: { ...toJS(initSettings), [curPageLinksKey.links]: linksAfter },
  })
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

  _keepMoreGroup2EndIfNeed()

  if (newAddLink.group === MORE_GROUP) {
    _moveAboutLink2Bottom()
  }
}

const _moveAboutLink2Bottom = (): void => {
  const { curPageLinksKey, headerSettings } = store
  if (curPageLinksKey.links !== 'headerLinks') return

  const aboutLink = find(
    (item) => item.group === MORE_GROUP && item.title === '关于',
    headerSettings.headerLinks,
  )

  moveLink(aboutLink, 'bottom')
}

const _keepMoreGroup2EndIfNeed = (): void => {
  const { curPageLinksKey, curCommunity } = store
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
      link: `/${curCommunity.slug}/${ROUTE.ABOUT}`,
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
  _keepMoreGroup2EndIfNeed()
}

export const confirmGroupUpdate = (): void => {
  const { curPageLinksKey, editingGroup, editingGroupIndex } = store
  const links = store[curPageLinksKey.settings][curPageLinksKey.links]

  // store.mark({ [curPageLinksKey.links]: _reindexGroup(links) })

  // const linksAfter = clone(_reindexGroup(links))
  const linksAfter = clone(links)

  for (let i = 0; i < links.length; i += 1) {
    const linkItem = links[i]

    if (linkItem.groupIndex === editingGroupIndex) {
      linksAfter[i].group = editingGroup
    }
  }

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

export const moveLink = (link: TLinkItem, dir: TMoveLinkDir): void => {
  switch (dir) {
    case 'up':
      return _moveLink(link, 'up')
    case 'down':
      return _moveLink(link, 'down')
    case 'top':
      return _moveLink2Edge(link, 'top')
    case 'bottom':
      return _moveLink2Edge(link, 'bottom')

    default:
  }
}

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
