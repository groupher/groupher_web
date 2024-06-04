// logics for header & footer links
import { useMemo } from 'react'
import { keys, pick, find, findIndex, clone, remove, filter, reject, forEach } from 'ramda'

import { runInAction, toJS } from '@/mobx'

import { ONE_LINK_GROUP, MORE_GROUP } from '@/const/dashboard'
import { DASHBOARD_ROUTE } from '@/const/route'
import { CHANGE_MODE } from '@/const/mode'
import { publicThreads } from '@/helper'

import type { TLinkItem, TGroupedLinks } from '@/spec'
import useDashboard from '@/hooks/useDashboard'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import { HEADER_SETTING_KEYS } from '@/stores2/dashboardStore/constant'

import type { TMoveLinkDir } from '../../spec'
import { EMPTY_LINK_ITEM } from '../../constant'

import useCommon from './useCommon'

export type TRet = {
  resetEditingLink: () => void
  updateEditingGroup: (title: string) => void
  updateInGroup: (link: TLinkItem) => void
  add2Group: (group: string, index: number) => void
  deleteLink: (linkItem: TLinkItem) => void
  deleteGroup: (groupIndex: number) => void
  cancelLinkEditing: () => void
  confirmLinkEditing: () => void
  updateEditingLink: (key: string, value: string) => void
  //
  confirmGroupAdd: () => void
  confirmGroupUpdate: () => void
  //
  triggerGroupUpdate: (title: string, index: number) => void
  cancelGroupChange: () => void
  triggerGroupAdd: () => void
  //
  addHeaderLinkGroup: () => void
  moveAboutLink2Bottom: () => void
  moveLink: (link: TLinkItem, dir: TMoveLinkDir) => void
  //
  moveGroup2Left: (group: string) => void
  moveGroup2Right: (group: string) => void
  moveGroup2EdgeLeft: (group: string) => void
  moveGroup2EdgeRight: (group: string) => void
}

const useLinks = (): TRet => {
  const { dashboard: store } = useDashboard()
  const curCommunity = useViewingCommunity()
  const {
    getLinks,
    moveGroup,
    reindex,
    doMoveLink,
    doMoveLink2Edge,
    reindexGroup,
    emptyLinksIfNedd,
    confirmGroupAdd,
    confirmGroupUpdate,
    keepMoreGroup2EndIfNeed,
  } = useCommon()

  const { curTab, headerLinks, footerLinks } = store

  const validThreads = useMemo(() => {
    const { enable, nameAlias } = store

    if (!curCommunity?.threads) return []

    return publicThreads(curCommunity.threads, {
      enable,
      nameAlias,
    })
  }, [curCommunity, store])

  // THeaderSettings
  const headerSettings = useMemo(() => {
    return {
      ...pick(HEADER_SETTING_KEYS, store),
      threads: validThreads,
    }
  }, [validThreads, store])

  const linksKey = curTab !== DASHBOARD_ROUTE.FOOTER ? 'headerLinks' : 'footerLinks'

  const updateInGroup = (link: TLinkItem): void => {
    store.editingLink = link
    store.editingLinkMode = CHANGE_MODE.UPDATE
  }

  const add2Group = (group: string, index: number): void => {
    const links = getLinks()
    const grouplinks = filter((link: TLinkItem) => link.group === group, links)

    if (grouplinks.length <= 0) return
    const { groupIndex } = grouplinks[0]

    const newItem = {
      ...EMPTY_LINK_ITEM,
      index,
      group,
      groupIndex,
    }

    runInAction(() => {
      store[linksKey] = [...links, newItem]
      store.editingLink = newItem
      store.editingLinkMode = CHANGE_MODE.CREATE
    })
  }

  const deleteLink = (linkItem: TLinkItem): void => {
    const links = getLinks()

    let linksAfter = reject(
      (link: TLinkItem) => link.group === linkItem.group && link.index === linkItem.index,
      links,
    )

    linksAfter = emptyLinksIfNedd(linksAfter)

    store[linksKey] = reindex(linksAfter)
  }

  const deleteGroup = (groupIndex: number): void => {
    const links = getLinks()
    let linksAfter = reject((link: TLinkItem) => link.groupIndex === groupIndex, links)

    linksAfter = emptyLinksIfNedd(linksAfter)

    store[linksKey] = reindexGroup(linksAfter)
  }

  const cancelLinkEditing = (): void => {
    const { editingLink, editingLinkMode, initSettings } = store
    const links = getLinks()

    if (editingLinkMode === CHANGE_MODE.UPDATE) {
      store.editingLink = null
      return
    }

    let linksAfter = reject(
      (link: TLinkItem) => link.group === editingLink.group && link.index === editingLink.index,
      links,
    )

    linksAfter = emptyLinksIfNedd(linksAfter)

    runInAction(() => {
      store[linksKey] = linksAfter
      store.editingLink = null
      store.initSettings = { ...toJS(initSettings), [linksKey]: linksAfter }
    })
  }

  const confirmLinkEditing = (): void => {
    const { editingLink, editingLinkMode } = store
    const links = getLinks()

    if (editingLinkMode === CHANGE_MODE.UPDATE) {
      const editingIndex = findIndex(
        (item: TLinkItem) => item.index === editingLink.index && item.group === editingLink.group,
        links,
      )

      links[editingIndex].title = editingLink.title
      links[editingIndex].link = editingLink.link

      store[linksKey] = links
      store.editingLink = null
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

    console.log('## editingLinkAfter: ', editingLinkAfter)

    const linksAfter = reject(
      (link: TLinkItem) => link.group === newAddLink.group && link.index === newAddLink.index,
      links,
    ).concat(editingLinkAfter)

    store[linksKey] = toJS(linksAfter)
    store.editingLink = null

    // keepMoreGroup2EndIfNeed()

    if (newAddLink.group === MORE_GROUP) {
      // moveAboutLink2Bottom()
    }
  }

  const updateEditingLink = (key: string, value: string): void => {
    const { editingLink } = store

    const editingLinkAfter = { ...editingLink, [key]: value }

    store.editingLink = editingLinkAfter
  }

  const resetEditingLink = (): void => {
    runInAction(() => {
      store.editingLink = null
      store.editingGroup = null
      store.editingGroupIndex = null
    })
  }

  const updateEditingGroup = (title: string): void => {
    store.editingGroup = title
  }

  const triggerGroupUpdate = (title: string, index: number): void => {
    runInAction(() => {
      store.editingGroup = title
      store.editingGroupIndex = index
    })
  }

  const triggerGroupAdd = (): void => {
    runInAction(() => {
      store.editingGroup = ''
      store.editingGroupIndex = null
    })
  }

  const cancelGroupChange = (): void => {
    runInAction(() => {
      store.editingGroup = null
      store.editingGroupIndex = null
    })
  }

  const addHeaderLinkGroup = () => {
    const time = new Date().getTime()

    store.editingGroup = `${ONE_LINK_GROUP}_${time}`
    confirmGroupAdd()
  }

  const moveLink = (link: TLinkItem, dir: TMoveLinkDir): void => {
    switch (dir) {
      case 'up':
        doMoveLink(link, 'up')
        return
      case 'down':
        doMoveLink(link, 'down')
        return
      case 'top':
        doMoveLink2Edge(link, 'top')
        return
      case 'bottom':
        doMoveLink2Edge(link, 'bottom')
        return

      default:
    }
  }

  const moveAboutLink2Bottom = (): void => {
    if (linksKey !== 'headerLinks') return

    const aboutLink = find(
      (item) => item.group === MORE_GROUP && item.title === '关于',
      headerLinks,
    )

    moveLink(aboutLink, 'bottom')
  }

  const moveGroup2Left = (group: string): void => moveGroup(group, 'left')
  const moveGroup2Right = (group: string): void => moveGroup(group, 'right')

  const moveGroup2EdgeLeft = (group: string): void => moveGroup(group, 'edge-left')
  const moveGroup2EdgeRight = (group: string): void => moveGroup(group, 'edge-right')

  return {
    updateInGroup,
    add2Group,
    deleteLink,
    deleteGroup,
    cancelLinkEditing,
    updateEditingLink,
    confirmLinkEditing,
    resetEditingLink,
    updateEditingGroup,
    triggerGroupUpdate,
    triggerGroupAdd,
    cancelGroupChange,
    //
    confirmGroupAdd,
    confirmGroupUpdate,
    //
    addHeaderLinkGroup,
    moveLink,
    moveAboutLink2Bottom,
    //
    moveGroup2Left,
    moveGroup2Right,
    moveGroup2EdgeLeft,
    moveGroup2EdgeRight,
  }
}

export default useLinks
