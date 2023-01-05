import { useEffect } from 'react'
// import { } from 'ramda'

import type { TEditValue, TTag } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'
import EVENT from '@/constant/event'

import { buildLog } from '@/utils/logger'
import { updateEditing, toJS } from '@/utils/mobx'
import asyncSuit from '@/utils/async'

import type { TSettingField, TAlias } from './spec'
// import S from './schma'
import type { TStore } from './store'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.DRAWER.AFTER_CLOSE],
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:DashboardThread')

// then user select catetory tab in tags settings
export const changeTagCategory = (activeTagCategory: string | null): void => {
  store.mark({ activeTagCategory })
}

/**
 * rollback editing value to init value
 */
export const rollbackEdit = (field: TSettingField): void => {
  store.rollbackEdit(field)
}

export const updateEditingTag = (tag: TTag): void => {
  store.mark({ editingTag: tag })
}

export const updateSettingTag = (tag: TTag): void => {
  store.mark({ settingTag: tag })
}

export const updateEditingAlias = (alias: TAlias): void => {
  store.mark({ editingAlias: alias })
}

export const updateGlowType = (glowType: string): void => {
  store.mark({ glowType })
}

export const updateGlowFixed = (glowFixed: boolean): void => {
  store.mark({ glowFixed })
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

export const resetEdit = (field: TSettingField): void => store.resetEdit(field)

export const edit = (e: TEditValue, key: string): void => {
  updateEditing(store, key, e)
}

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
    log('useInit: ', store)
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
