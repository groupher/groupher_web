// logics for header & footer links

import { keys, findIndex, clone, remove, filter, reject, forEach } from 'ramda'

import type { TLinkItem, TGroupedLinks } from '@/spec'

import { sortByIndex, groupByKey } from '@/helper'
import useDashboard from '@/hooks/useDashboard'

type TRet = {
  moveGroup2Left: (group: string) => void
  moveGroup2Right: (group: string) => void
  moveGroup2EdgeLeft: (group: string) => void
  moveGroup2EdgeRight: (group: string) => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useCommon = (): TRet => {
  const { dashboard: store } = useDashboard()

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

    store[curPageLinksKey.links] = newLinks
    // store.mark({ [curPageLinksKey.links]: newLinks })
  }

  const moveGroup2Left = (group: string): void => _moveGroup(group, 'left')
  const moveGroup2Right = (group: string): void => _moveGroup(group, 'right')

  const moveGroup2EdgeLeft = (group: string): void => _moveGroup(group, 'edge-left')
  const moveGroup2EdgeRight = (group: string): void => _moveGroup(group, 'edge-right')

  return {
    moveGroup2Left,
    moveGroup2Right,
    moveGroup2EdgeLeft,
    moveGroup2EdgeRight,
  }
}

export default useCommon
