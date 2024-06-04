// logics for header & footer links

import { useMemo, memo } from 'react'
import { keys, findIndex, clone, remove, filter, reject, forEach, find } from 'ramda'

import { runInAction, toJS } from '@/mobx'
import { sortByIndex, groupByKey } from '@/helper'

import type { TLinkItem, TGroupedLinks } from '@/spec'
import { ROUTE, DASHBOARD_ROUTE } from '@/const/route'
import { ONE_LINK_GROUP, MORE_GROUP } from '@/const/dashboard'

import useDashboard from '@/hooks/useDashboard'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { EMPTY_LINK_ITEM } from '../../constant'

export type TRet = {
  getLinks: () => TLinkItem[]
  moveGroup: (group: string, opt: 'left' | 'right' | 'edge-left' | 'edge-right') => void
  reindex: (links: TLinkItem[]) => TLinkItem[]
  keepMoreGroup2EndIfNeed: () => void
  doMoveLink: (link: TLinkItem, opt: 'up' | 'down') => void
  doMoveLink2Edge: (link: TLinkItem, opt: 'top' | 'bottom') => void
  reindexGroup: (_targetLinks: TLinkItem[]) => TLinkItem[]
  emptyLinksIfNedd: (links: TLinkItem[]) => TLinkItem[]
  confirmGroupAdd: () => void
  confirmGroupUpdate: () => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useCommon = (): TRet => {
  const { dashboard: store } = useDashboard()
  const community = useViewingCommunity()
  const { curTab } = store

  const getLinks = (): TLinkItem[] => {
    const { curTab, headerLinks, footerLinks } = store
    return toJS(curTab !== DASHBOARD_ROUTE.FOOTER ? headerLinks : footerLinks)
  }

  const linksKey = curTab !== DASHBOARD_ROUTE.FOOTER ? 'headerLinks' : 'footerLinks'

  const emptyLinksIfNedd = (links: TLinkItem[]): TLinkItem[] => {
    if (linksKey === 'headerLinks' && links.length === 1 && links[0].group === MORE_GROUP) {
      return []
    }

    return links
  }

  const reindex = (links: TLinkItem[]): TLinkItem[] => {
    return links.map((item, index) => ({
      ...item,
      index,
    }))
  }

  /**
   * move links actions
   */
  const doMoveLink = (link: TLinkItem, opt: 'up' | 'down'): void => {
    const links = getLinks()
    const { group } = link

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

    store[linksKey] = [...restLinks, ...reindex(groupLinks)]
  }

  const doMoveLink2Edge = (link: TLinkItem, opt: 'top' | 'bottom'): void => {
    const links = getLinks()
    const { group } = link

    const groupLinks = filter((item: TLinkItem) => item.group === group, links)
    const restLinks = reject((item: TLinkItem) => item.group === group, links)

    const curLinkItemIndex = findIndex((item: TLinkItem) => item.index === link.index, groupLinks)
    const curLinkItem = clone(groupLinks[curLinkItemIndex])

    const newLinks =
      opt === 'top'
        ? [curLinkItem, ...remove(curLinkItemIndex, 1, groupLinks)]
        : [...remove(curLinkItemIndex, 1, groupLinks), curLinkItem]

    store[linksKey] = [...restLinks, ...reindex(newLinks)]
  }

  /**
   * move group actions
   */
  const reindexGroup = (_targetLinks: TLinkItem[]): TLinkItem[] => {
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

  const keepMoreGroup2EndIfNeed = () => {
    if (linksKey !== 'headerLinks') return
    const links = getLinks()

    const _groupedLinks = groupByKey(links, 'group')
    const groupKeys = keys(_groupedLinks) as string[]

    const moreGroup = find((item: string) => item === MORE_GROUP, groupKeys)

    // create if no custom link exists
    if (links.length > 0 && !moreGroup) {
      const newLinkItem = {
        ...EMPTY_LINK_ITEM,
        title: '关于',
        link: `/${community.slug}/${ROUTE.ABOUT}`,
        group: MORE_GROUP,
        // make sure the "more" gorup is always in the end
        groupIndex: groupKeys.length + 2,
      }

      const linksAfter = toJS([...links, newLinkItem])
      store.headerLinks = reindexGroup(linksAfter)
    } else {
      // console.log('## 222: ', links)

      // make sure the "more" gorup is always in the end
      const linksAfter = links.map((item) => ({
        ...item,
        groupIndex: item.group === MORE_GROUP ? links.length + 2 : item.groupIndex,
      }))

      store.headerLinks = reindexGroup(linksAfter)
    }
  }

  const confirmGroupAdd = (): void => {
    const { editingGroup } = store
    const links = getLinks()

    const _groupedLinks = groupByKey(links, 'group')
    const groupKeys = keys(_groupedLinks) as string[]

    const newLinkItem = {
      ...EMPTY_LINK_ITEM,
      group: editingGroup,
      groupIndex: groupKeys.length,
    }

    const linksAfter = toJS([...links, newLinkItem])

    runInAction(() => {
      store.editingGroup = null
      store.editingLink = newLinkItem
      store[linksKey] = linksAfter
    })

    keepMoreGroup2EndIfNeed()
  }

  const confirmGroupUpdate = (): void => {
    const { editingGroup, editingGroupIndex } = store
    const links = getLinks()

    const linksAfter = clone(links)

    for (let i = 0; i < links.length; i += 1) {
      const linkItem = links[i]

      if (linkItem.groupIndex === editingGroupIndex) {
        linksAfter[i].group = editingGroup
      }
    }

    runInAction(() => {
      store.editingGroup = null
      store.editingGroupIndex = null
      store[linksKey] = linksAfter
    })
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

  const moveGroup = (group: string, opt: 'left' | 'right' | 'edge-left' | 'edge-right'): void => {
    const links = getLinks()

    // @ts-ignore
    const _groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
    const groupKeys = keys(_groupedLinks) as string[]

    const groupedLinks = _reindexByGroup(groupKeys, _groupedLinks)
    const curIndex = groupedLinks[group][0].groupIndex

    let nextIndex = -1

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
    forEach((key) => newLinks.push(...groupedLinks[key]), groupKeys)

    store[linksKey] = newLinks
  }

  return {
    getLinks,
    moveGroup,
    reindex,
    keepMoreGroup2EndIfNeed,
    doMoveLink,
    doMoveLink2Edge,
    reindexGroup,
    emptyLinksIfNedd,
    confirmGroupAdd,
    confirmGroupUpdate,
  }
}

export default useCommon
