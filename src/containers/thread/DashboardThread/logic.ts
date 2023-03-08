import { useEffect } from 'react'
import { findIndex, remove } from 'ramda'

import type { TEditValue, TTag, TLinkItem } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'
import EVENT from '@/constant/event'

import { buildLog } from '@/utils/logger'
import { updateEditing, toJS } from '@/utils/mobx'
import asyncSuit from '@/utils/async'

import type { TStore } from './store'
import type { TSettingField, TAlias } from './spec'

import { SETTING_FIELD } from './constant'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.DRAWER.AFTER_CLOSE],
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:DashboardThread')

export const enableThread = (key: string, toggle: boolean) => {
  const { enableSettings } = store

  const enable = {
    ...enableSettings,
    [key]: toggle,
  }

  store.mark({ enable })
  store.onSave('enable')
}

export const editTag = (key: 'settingTag' | 'editingTag', tag: TTag): void => {
  store.mark({ [key]: tag })
}

export const updateEditingAlias = (alias: TAlias): void => {
  store.mark({ editingAlias: alias })
}

export const addHelpCategory = (): void => {
  const helpCategories = store.helpSettings.categories.concat({
    name: '新分类',
    index: store.helpCategories.length,
    color: COLOR_NAME.BLACK,
    files: [],
  })

  store.mark({ helpCategories })
}

export const broadcastOnSave = (isArticle = false): void => {
  store.mark({ saving: true })
  const layoutKey = !isArticle
    ? SETTING_FIELD.BROADCAST_LAYOUT
    : SETTING_FIELD.BROADCAST_ARTICLE_LAYOUT
  const bgKey = !isArticle ? SETTING_FIELD.BROADCAST_BG : SETTING_FIELD.BROADCAST_ARTICLE_BG

  store.onSave(layoutKey)
  store.onSave(bgKey)

  setTimeout(() => {
    store.mark({ saving: false })

    const initSettings = {
      ...store.initSettings,
      [layoutKey]: toJS(store[layoutKey]),
      [bgKey]: toJS(store[bgKey]),
    }
    store.mark({ initSettings })
  }, 1200)
}

export const broadcastOnCancel = (isArticle = false): void => {
  const layoutKey = !isArticle
    ? SETTING_FIELD.BROADCAST_LAYOUT
    : SETTING_FIELD.BROADCAST_ARTICLE_LAYOUT
  const bgKey = !isArticle ? SETTING_FIELD.BROADCAST_BG : SETTING_FIELD.BROADCAST_ARTICLE_BG

  store.rollbackEdit(layoutKey)
  store.rollbackEdit(bgKey)
}

/**
 * rollback editing value to init value
 */
export const rollbackEdit = (field: TSettingField): void => store.rollbackEdit(field)
export const resetEdit = (field: TSettingField): void => store.resetEdit(field)
export const edit = (e: TEditValue, key: string): void => updateEditing(store, key, e)

/**
 * save to server
 */
export const onSave = (field: TSettingField, force = false): void => {
  store.mark({ saving: true })
  store.onSave(field)

  const time = force ? 0 : 1200

  setTimeout(() => {
    store.mark({ saving: false })
    const initSettings = { ...store.initSettings, [field]: toJS(store[field]) }

    store.mark({ initSettings })
  }, time)
}

export const removeLink = (link: TLinkItem): void => {
  const { footerLinks } = store.footerSettings
  const linkIndex = findIndex((item) => item.index === link.index, footerLinks)

  store.mark({ footerLinks: remove(linkIndex, 1, footerLinks) })
}

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

// ###############################
// init & uninit handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes(EVENT.DRAWER.AFTER_CLOSE),
    action: () => {
      store.mark({ settingTag: null })
    },
  },
]

const ErrSolver = []
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
