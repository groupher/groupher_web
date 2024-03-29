import { useEffect } from 'react'
// import { } from 'ramda'

import type { TThread } from '@/spec'

import EVENT from '@/constant/event'
import TYPE from '@/constant/type'

import asyncSuit from '@/async'
import { plural } from '@/fmt'
import { send } from '@/signal'
import { buildLog } from '@/logger'

import type { TStore } from './store'
// import S from './service'

const { SR71, $solver, asyncRes } = asyncSuit

const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.DRAWER.AFTER_CLOSE],
})

let sub$ = null
let store: TStore | undefined

const log = buildLog('L:ModeLine')

export const tabOnChange = (activeThread: TThread): void => {
  const subPath = plural(activeThread)
  // log('EVENT.activeThread -----> ', activeThread)
  // log('EVENT.subPath -----> ', subPath)

  store.markRoute({ subPath })
  store.setViewing({ activeThread })

  send(EVENT.ARTICLE_THREAD_CHANGE, { data: { activeThread } })
}

export const openMenu = (activeMenu: string): void => {
  store.mark({ activeMenu })

  switch (activeMenu) {
    case TYPE.MM_TYPE.GLOBAL_MENU: {
      openGlobalMenu()
      return
    }

    case TYPE.MM_TYPE.SEARCH: {
      openSearchMenu()
      return
    }

    case TYPE.MM_TYPE.FILTER: {
      openFilterMenu()
      return
    }

    case TYPE.MM_TYPE.COMMUNITY: {
      openCommunityMenu()
      return
    }

    case TYPE.MM_TYPE.EXPLORE: {
      openExploreMenu()
      return
    }

    case TYPE.MM_TYPE.SHARE: {
      openShareMenu()
      return
    }

    default: {
      openMoreMenu()
      return
    }
  }
}

/**
 * open global navi menu on mobile
 */
const openGlobalMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.GLOBAL_MENU,
    options: {
      direction: 'bottom',
      position: 'M',
    },
  })
}

/**
 * open filter menu for current community on mobile
 */
const openSearchMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.SEARCH,
    options: {
      direction: 'bottom',
      position: 'M',
    },
  })
}

/**
 * open article share menu
 */
const openShareMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.SHARE,
    options: {
      direction: 'bottom',
      position: 'M',
    },
  })
}

/**
 * open filter menu for current community on mobile
 */
const openFilterMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.FILTER,
    options: {
      direction: 'bottom',
      position: 'M',
    },
  })
}

/**
 * open community menu on mobile
 */
const openCommunityMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.COMMUNITY,
    options: {
      direction: 'bottom',
      position: 'M',
    },
  })
}

/**
 * open explore menu on mobile
 */
const openExploreMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.EXPLORE,
    options: {
      direction: 'bottom',
      position: 'M',
    },
  })
}

/**
 * open more menu on mobile
 */
const openMoreMenu = () => {
  send(EVENT.DRAWER.OPEN, {
    type: TYPE.DRAWER.MODELINE_MENU,
    data: TYPE.MM_TYPE.MORE,
    options: {
      direction: 'bottom',
      position: 'L',
    },
  })
}

// ###############################
// init & uninit handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes(EVENT.DRAWER.AFTER_CLOSE),
    action: () => store.mark({ activeMenu: '' }),
  },
]

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('useInit: ', store)
    sub$ = sr71$.data().subscribe($solver(DataSolver, []))

    return () => {
      store.mark({ activeMenu: '' })
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
