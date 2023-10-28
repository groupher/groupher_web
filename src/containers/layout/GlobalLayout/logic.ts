import { ReactNode, useEffect, Children, isValidElement, cloneElement } from 'react'

import { APP_VERSION } from '@/config'
import type { TMetric, TScrollDirection, TGlowPosition, TArticle } from '@/spec'
import METRIC from '@/constant/metric'
import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import { buildLog } from '@/logger'
import { errRescue } from '@/signal'
import { Global } from '@/helper'

import { matchArticleUpvotes } from '@/utils/macros'
import asyncSuit from '@/async'

import S from './schema'
import type { TStore } from './store'

/* eslint-disable-next-line */
const log = buildLog('L:GlobalLayout')

let store: TStore | undefined
let sub$ = null

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.UPVOTE_ARTICLE],
})

// custromScroll's scroll direction change
export const onPageScrollDirhange = (bodyScrollDirection: TScrollDirection): void =>
  store.mark({ bodyScrollDirection })

export const getGlowPosition = (metric: TMetric, glowFixed: boolean): TGlowPosition => {
  if (metric === METRIC.HOME) {
    return 'absolute'
  }

  return glowFixed ? 'fixed' : 'absolute'
}

export const clearDemoSetting = () => store.clearLocalSettings()
export const loadDemoSetting = () => store.loadDemoSetting()
/**
 * log ascii Buddha just for fun
 * 控制台打印佛祖保佑
 */
export const logBuddha = (): void => {
  if (process.env.CUR_ENV === 'production') {
    /* eslint-disable */
    console.log(
      ' .......................................................\n\n\n' +
        '                       _oo0oo_                      \n' +
        '                      o8888888o                     \n' +
        '                      88" . "88           if (bug) {                  \n' +
        '                      (| -_- |)    .oO      bug = false          \n' +
        '                      0\\  =  /0           }             \n' +
        '                    ___/‘---’\\___                   \n' +
        "                  .' \\|       |/ '.                 \n" +
        '                 / \\\\|||  :  |||// \\                \n' +
        '                / _|||||-【】-|||||_ \\               \n' +
        '               |   | \\\\\\  -  /// |   |              \n' +
        "               | \\_|  ''\\---/''  |_/ |              \n" +
        "               \\  .-\\__  '-'  ___/-. /              \n" +
        "             ___'. .'  /--.--\\  '. .'___            \n" +
        '           ."" ‘<‘.___\\_<|>_/___.’>’ "".          \n' +
        '        | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |        \n' +
        '         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /        \n' +
        '    =====‘-.____‘.___ \\_____/___.-’___.-’=====     \n' +
        '                       ‘=---=’                      \n' +
        '                                                    \n\n' +
        '.........................................................\n\n' +
        ' ##########   https://github.com/groupher   #########\n\n' +
        '.........................................................',
    )
    /* eslint-enable */
  }
}

// cloning children with new props
// see detail: https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
export const childrenWithProps = (
  children: ReactNode,
  props: Record<string, unknown>,
): ReactNode => {
  return Children.map(children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (isValidElement(child)) {
      return cloneElement(child, { ...props })
    }
    return child
  })
}

/**
 * set appVersion to window from package.json
 * @link https://stackoverflow.com/a/67701490/4050784
 */
const initAppVersion = (): void => {
  Global.appVersion = APP_VERSION || 'unknow'
}

// ###############################
// init & uninit
// ###############################
export const handleUpvote = (article: TArticle, viewerHasUpvoted: boolean): void => {
  const { id, meta } = article

  store.setViewingAlways(article)
  store.updateViewerHasUpvoted(viewerHasUpvoted)
  const queryLatestUsers = true

  viewerHasUpvoted
    ? sr71$.mutate(S.getUpvoteSchema(meta.thread, queryLatestUsers), { id })
    : sr71$.mutate(S.getUndoUpvoteSchema(meta.thread, queryLatestUsers), { id })
}

const handleUovoteRes = ({ upvotesCount, meta }) => {
  store.syncUploadInfo(upvotesCount, meta)
}

const DataSolver = [
  ...matchArticleUpvotes(handleUovoteRes),
  {
    match: asyncRes(EVENT.UPVOTE_ARTICLE),
    action: (_data) => {
      const { data } = _data[EVENT.UPVOTE_ARTICLE]
      const { article, viewerHasUpvoted } = data
      handleUpvote(article, viewerHasUpvoted)
    },
  },
]
const _handleError = () => {
  //
}

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      _handleError()
      errRescue({ type: ERR.GRAPHQL, details, path: 'GlobalLayout' })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      _handleError()
      errRescue({ type: ERR.TIMEOUT, details, path: 'GlobalLayout' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      _handleError()
      errRescue({ type: ERR.NETWORK, path: 'GlobalLayout' })
    },
  },
]

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    // const { online, isMobile } = extra
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    initAppVersion()

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
