import { useEffect } from 'react'

import { parseURL } from '@/utils/route'
import { Global } from '@/helper'
import { buildLog } from '@/logger'

const _log = buildLog('L:Route')

let store = null

// function will fire only when browser history btn clicked
// see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onpopstate
const browserHistoryBtnClicked = (popstate) => {
  Global.location = popstate.state.as
}

// ###############################
// init & uninit
// ###############################

export const useInit = (_store, routeObj) => {
  useEffect(() => {
    store = _store
    // sync init router info
    const { mainPath, subPath } = parseURL(routeObj)
    const { query } = routeObj

    store.mark({ mainPath, subPath, query })

    Global.onpopstate = browserHistoryBtnClicked
  }, [_store, routeObj])
}

export const holder = 1
