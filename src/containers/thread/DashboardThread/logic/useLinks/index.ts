// logics for header & footer links
import { keys, find, findIndex, clone, remove, filter, reject, forEach } from 'ramda'

import { runInAction, toJS } from '@/mobx'

import { ONE_LINK_GROUP, MORE_GROUP } from '@/const/dashboard'
import { CHANGE_MODE } from '@/const/mode'

import type { TLinkItem, TGroupedLinks } from '@/spec'
import useDashboard from '@/hooks/useDashboard'

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
  const {
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

  const updateInGroup = (link: TLinkItem): void => {
    store.editingLink = link
    store.editingLinkMode = CHANGE_MODE.UPDATE
  }

  const add2Group = (group: string, index: number): void => {
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

    runInAction(() => {
      store[curPageLinksKey.links] = [...links, newItem]
      store.editingLink = newItem
      store.editingLinkMode = CHANGE_MODE.CREATE
    })
  }

  const deleteLink = (linkItem: TLinkItem): void => {
    const { curPageLinksKey } = store
    const links = store[curPageLinksKey.settings][curPageLinksKey.links]

    let linksAfter = reject(
      (link: TLinkItem) => link.group === linkItem.group && link.index === linkItem.index,
      links,
    )

    linksAfter = emptyLinksIfNedd(linksAfter)

    store[curPageLinksKey.links] = reindex(linksAfter)
    // store.mark({ [curPageLinksKey.links]: _reindex(linksAfter) })
  }

  const deleteGroup = (groupIndex: number): void => {
    const { curPageLinksKey } = store
    const links = store[curPageLinksKey.settings][curPageLinksKey.links]

    let linksAfter = reject((link: TLinkItem) => link.groupIndex === groupIndex, links)

    linksAfter = emptyLinksIfNedd(linksAfter)

    store[curPageLinksKey.links] = reindexGroup(linksAfter)
  }

  const cancelLinkEditing = (): void => {
    const { curPageLinksKey, editingLink, editingLinkMode, initSettings } = store
    const links = store[curPageLinksKey.settings][curPageLinksKey.links]

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
      store[curPageLinksKey.links] = linksAfter
      store.editingLink = null
      store.initSettings = { ...toJS(initSettings), [curPageLinksKey.links]: linksAfter }
    })
  }

  const confirmLinkEditing = (): void => {
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

    store[curPageLinksKey.links] = linksAfter
    store.editingLink = null

    keepMoreGroup2EndIfNeed()

    if (newAddLink.group === MORE_GROUP) {
      moveAboutLink2Bottom()
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
    const { curPageLinksKey, headerSettings } = store
    if (curPageLinksKey.links !== 'headerLinks') return

    const aboutLink = find(
      (item) => item.group === MORE_GROUP && item.title === '关于',
      headerSettings.headerLinks,
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
