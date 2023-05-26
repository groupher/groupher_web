import { useEffect } from 'react'
import { merge } from 'ramda'

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

export const onDelete = (tag: TTag): void => {
  const { id, thread, community } = tag

  sr71$.mutate(S.deleteArticleTag, { id, community: community.raw, thread })
}

export const edit = (e: TEditValue, key): void => {
  const { editingTagData } = store

  store.mark({ editingTag: merge(editingTagData, { [key]: e }) })
}

export const onCreate = (): void => {
  const { curTag, curCommunity } = store

  const tag = {
    ...curTag,
    raw: curTag.title,
    community: curCommunity.raw,
    group: '',
  }

  console.log('## onCreate: ', tag)
  sr71$.mutate(S.createArticleTag, tag)
}

export const onUpate = (): void => {
  console.log('## onUpdate')
}

/**
 */
const _initCurTag = (mode) => {
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
  // refresh the tag list
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
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      errRescue({ type: ERR.GRAPHQL, details, path: 'TagSettingEditor' })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => errRescue({ type: ERR.TIMEOUT, details, path: 'TagSettingEditor' }),
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => errRescue({ type: ERR.NETWORK, path: 'TagSettingEditor' }),
  },
]

export const useInit = (_store: TStore, mode: 'create' | 'edit'): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    _initCurTag(mode)

    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    // return () => store.reset()
  }, [_store, mode])
}
