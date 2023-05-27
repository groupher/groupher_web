import { useEffect } from 'react'

import type { TEditValue, TTag } from '@/spec'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import { buildLog } from '@/utils/logger'
import asyncSuit from '@/utils/async'
import { send, errRescue, closeDrawer } from '@/utils/signal'

import { DEFAULT_CREATE_TAG } from './constant'
import S from './schema'
import type { TStore } from './store'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:TagSettingEditor')

export const edit = (e: TEditValue, key): void => {
  const { editingTagData } = store

  store.mark({ editingTag: { ...editingTagData, [key]: e } })
}

export const onDelete = (tag: TTag): void => {
  store.mark({ processing: true })
  const { id, thread, community } = tag

  sr71$.mutate(S.deleteArticleTag, { id, community: community.raw, thread })
}

export const onUpdate = (): void => {
  store.mark({ processing: true })
  const { editingTagData, curCommunity } = store

  const tag = {
    ...editingTagData,
    raw: editingTagData.title,
    community: curCommunity.raw,
    group: '',
  }

  sr71$.mutate(S.updateArticleTag, tag)
}

export const onCreate = (): void => {
  store.mark({ processing: true })
  const { editingTagData, curCommunity } = store

  const tag = {
    ...editingTagData,
    raw: editingTagData.title,
    community: curCommunity.raw,
    group: '',
  }

  console.log('## onCreate: ', tag)
  sr71$.mutate(S.createArticleTag, tag)
}

/**
 * init editing tag for create/edit action
 */
const _initEditingTag = (mode) => {
  if (mode === 'create') {
    store.mark({ editingTag: DEFAULT_CREATE_TAG, mode })
  } else {
    store.mark({ editingTag: store.settingTag, mode })
  }
}

// ###############################
// init & uninit handlers
// ###############################

const _handleDone = (): void => {
  closeDrawer()
  send(EVENT.REFRESH_TAGS)
  store.mark({ processing: false })
}

const DataSolver = [
  {
    match: asyncRes('deleteArticleTag'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('createArticleTag'),
    action: () => _handleDone(),
  },
  {
    match: asyncRes('updateArticleTag'),
    action: () => _handleDone(),
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      store.mark({ processing: false })
      errRescue({ type: ERR.GRAPHQL, details, path: 'TagSettingEditor' })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      store.mark({ processing: false })
      errRescue({ type: ERR.TIMEOUT, details, path: 'TagSettingEditor' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      store.mark({ processing: false })
      errRescue({ type: ERR.NETWORK, path: 'TagSettingEditor' })
    },
  },
]

export const useInit = (_store: TStore, mode: 'create' | 'edit'): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    _initEditingTag(mode)

    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    // return () => store.reset()
  }, [_store, mode])
}
