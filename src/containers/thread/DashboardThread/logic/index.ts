import { useEffect } from 'react'
import { includes, values } from 'ramda'

import type { TEditValue, TTag } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'
import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import { buildLog } from '@/utils/logger'
import { updateEditing, toJS } from '@/utils/mobx'
import { errRescue } from '@/utils/signal'
import asyncSuit from '@/utils/async'

import type { TStore } from '../store'
import type { TSettingField, TAlias } from '../spec'

import { SETTING_FIELD, SETTING_LAYOUT_FIELD } from '../constant'
import { init as linksLogicInit } from './links'

import S from '../schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.DRAWER.AFTER_CLOSE],
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:DashboardThread')

export const enableThread = (key: string, toggle: boolean) => {
  const { enableSettings, curCommunity } = store

  const enable = {
    ...enableSettings,
    [key]: toggle,
  }

  store.mark({ enable })
  store.onSave('enable')

  sr71$.mutate(S.updateDashboardEnable, { community: curCommunity.raw, [key]: toggle })
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

const _doMutation = (field: string, e: TEditValue): void => {
  const { curCommunity } = store

  if (includes(field, values(SETTING_LAYOUT_FIELD))) {
    sr71$.mutate(S.updateDashboardLayout, { community: curCommunity.raw, [field]: e })
  }
}

/**
 * rollback editing value to init value
 */
export const rollbackEdit = (field: TSettingField): void => store.rollbackEdit(field)
export const resetEdit = (field: TSettingField): void => store.resetEdit(field)
export const edit = (e: TEditValue, field: string): void => updateEditing(store, field, e)

/**
 * save to server
 */
export const onSave = (field: TSettingField): void => {
  store.mark({ saving: true, savingField: field })
  store.onSave(field)

  _doMutation(field, store[field])

  // const time = 1200

  // setTimeout(() => {
  //   store.mark({ saving: false })
  //   const initSettings = { ...store.initSettings, [field]: toJS(store[field]) }

  //   store.mark({ initSettings })
  // }, time)
}

// ###############################
// init & uninit handlers
// ###############################
const _handleDone = () => {
  const field = store.savingField

  store.mark({ saving: false, savingField: null })
  const initSettings = { ...store.initSettings, [field]: toJS(store[field]) }
  store.mark({ initSettings })
}

const _handleError = () => {
  const field = store.savingField
  store.mark({ saving: false, savingField: null })
  store.rollbackEdit(field as TSettingField)
}

const DataSolver = [
  {
    match: asyncRes('updateDashboardEnable'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateDashboardLayout'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes(EVENT.DRAWER.AFTER_CLOSE),
    action: () => {
      store.mark({ settingTag: null })
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      _handleError()
      errRescue({ type: ERR.GRAPHQL, details, path: 'DashboardThread' })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      _handleError()
      errRescue({ type: ERR.TIMEOUT, details, path: 'DashboardThread' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      _handleError()
      errRescue({ type: ERR.NETWORK, path: 'DashboardThread' })
    },
  },
]

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
