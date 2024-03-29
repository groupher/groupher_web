import { useEffect } from 'react'

import type { TChangeMode, TEditValue, TTag } from '@/spec'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import { buildLog } from '@/logger'
import asyncSuit from '@/async'
import { send, errRescue, closeDrawer } from '@/signal'
import { CHANGE_MODE } from '@/constant/mode'

import { DEFAULT_CREATE_TAG } from './constant'
import S from './schema'
import type { TStore } from './store'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store: TStore | undefined

const log = buildLog('L:TagSettingEditor')

export const edit = (e: TEditValue, key): void => {
  const { editingTagData } = store

  store.mark({ editingTag: { ...editingTagData, [key]: e } })
}

export const onDelete = (tag: TTag): void => {
  store.mark({ processing: true })
  const { id, thread, community } = tag

  sr71$.mutate(S.deleteArticleTag, { id, community: community.slug, thread })
}

export const onUpdate = (): void => {
  store.mark({ processing: true })
  const { editingTagData, curCommunity, curThread } = store

  const tag = {
    ...editingTagData,
    slug: editingTagData.title,
    community: curCommunity.slug,
    thread: curThread,
  }

  sr71$.mutate(S.updateArticleTag, tag)
}

export const onCreate = (): void => {
  store.mark({ processing: true })
  const { editingTagData, curCommunity, curThread } = store

  const tag = {
    ...editingTagData,
    slug: editingTagData.title,
    community: curCommunity.slug,
    thread: curThread,
  }

  sr71$.mutate(S.createArticleTag, tag)
}

/**
 * init editing tag for create/edit action
 */
const _initEditingTag = (mode) => {
  if (mode === CHANGE_MODE.CREATE) {
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

export const useInit = (_store: TStore, mode: TChangeMode): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    _initEditingTag(mode)

    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    }
    // return () => store.reset()
  }, [_store, mode])
}
