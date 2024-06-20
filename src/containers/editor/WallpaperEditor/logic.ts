import { useEffect } from 'react'
import { pick } from 'ramda'

import EVENT from '@/const/event'

import asyncSuit from '@/async'
import { toast, closeDrawer } from '@/signal'

import S from './schema'
import type { TStore } from './store'
import { QUERY_KEYS } from './constant'

const { SR71, $solver, asyncRes } = asyncSuit
const sr71$ = new SR71({
  receive: EVENT.DRAWER.AFTER_CLOSE,
})

let store: TStore | undefined
let sub$ = null

export const close = (): void => {
  store.rollbackEdit()
  closeDrawer()
}

export const onSave = (): void => {
  const { curCommunity } = store
  const community = curCommunity.slug

  const args = { community, ...pick(QUERY_KEYS, store) }

  store.mark({ loading: true })

  sr71$.mutate(S.updateDashboardWallpaper, args)
}

const DataResolver = [
  {
    match: asyncRes(EVENT.DRAWER.AFTER_CLOSE),
    action: () => store.reset(),
  },
  {
    match: asyncRes('updateDashboardWallpaper'),
    action: ({ updateDashboardWallpaper }) => {
      store.mark({
        initWallpaper: pick(QUERY_KEYS, updateDashboardWallpaper.dashboard.wallpaper),
        loading: false,
      })
      closeDrawer()
      toast('壁纸已保存')
    },
  },
]

// ###############################
// init & uninit handlers
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    if (!sub$) {
      sub$ = sr71$.data().subscribe($solver(DataResolver, []))
    }
    // return () => store.reset()
  }, [_store])
}
