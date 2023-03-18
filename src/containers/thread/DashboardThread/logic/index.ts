import { useEffect } from 'react'

import type { TEditValue, TTag } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'
import EVENT from '@/constant/event'

import { buildLog } from '@/utils/logger'
import { updateEditing, toJS } from '@/utils/mobx'
import asyncSuit from '@/utils/async'

import type { TStore } from '../store'
import type { TSettingField, TAlias } from '../spec'

import { SETTING_FIELD } from '../constant'
import { init as linksLogicInit } from './links'

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

export const rssOnSave = (): void => {
  store.mark({ saving: true })
  const { RSS_FEED_TYPE, RSS_FEED_COUNT } = SETTING_FIELD

  store.onSave(RSS_FEED_TYPE)
  store.onSave(RSS_FEED_COUNT)

  setTimeout(() => {
    store.mark({ saving: false })

    const initSettings = {
      ...store.initSettings,
      [RSS_FEED_TYPE]: toJS(store[RSS_FEED_TYPE]),
      [RSS_FEED_COUNT]: toJS(store[RSS_FEED_COUNT]),
    }

    store.mark({ initSettings })
  }, 1200)
}

export const rssOnCancel = (): void => {
  const { RSS_FEED_TYPE, RSS_FEED_COUNT } = SETTING_FIELD

  store.rollbackEdit(RSS_FEED_TYPE)
  store.rollbackEdit(RSS_FEED_COUNT)
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
    linksLogicInit(store)
    log('useInit: ', store)
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
