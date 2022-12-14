import PubSub from 'pubsub-js'
import Router from 'next/router'

import { values, includes } from 'ramda'

import type {
  TID,
  TUser,
  TAttInfo,
  TPaymentUsage,
  TWindow,
  TGQLError,
  TArticle,
  TCommunity,
  TThread,
  TTag,
  TCommunitySetterStyle,
  TReportType,
  TArticlePubSelector,
} from '@/spec'
import { HCN } from '@/constant/name'
import { NON_COMMUNITY_ROUTE } from '@/constant/route'
import { THREAD, ARTICLE_THREAD } from '@/constant/thread'
import TYPE from '@/constant/type'
import EVENT from '@/constant/event'

import BStore from './bstore'
import { scrollToHeader } from './dom'

export const Global: TWindow = typeof window !== 'undefined' ? window : null

/**
 * publish event message, 'send' inspired by Elixir
 */
export const send = (msg: string, data = {}): void => {
  // TODO: check the msg is valid
  // PubSub.publishSync(msg, data)
  PubSub.publish(msg, data)
}

/**
 * shortcut for logout
 */
export const logout = (): void => {
  send(EVENT.LOGOUT)
}

/**
 * shortcut for close Drawer
 *
 */
export const closeDrawer = (type = ''): void => send(EVENT.DRAWER.CLOSE, { type })

/**
 * shortcut for call cashier
 *
 */
export const checkout = (amount: number, usage: TPaymentUsage): void =>
  send(EVENT.CALL_CASHIER, { amount, usage })

export const addCollection = (): void => {
  send(EVENT.SET_FAVORITE_CONTENT, {
    data: { thread: THREAD.POST },
  })
}

/**
 * report content
 */
export const report = (type: TReportType, data?: TAttInfo): void => {
  send(EVENT.REPORT, { type, data })
}

/**
 * hepler for call the JoinModal Container to show wechatQRCode or mail scriscribe list etc ..
 *
 */
export const joinUS = (type?: string, data = {}): void => {
  send(EVENT.JOIN_US, { type, data })
}

export const moveToCommunity = (): void => {
  send(EVENT.MOVE_TO_COMMUNITY, {})
}

export const mirrorToCommunity = (): void => {
  send(EVENT.MIRROR_TO_COMMUNITY, {})
}

export const setTag = (): void => {
  send(EVENT.SET_TAG, {})
}

export const listUsers = (data): void => {
  const type = TYPE.DRAWER.USER_LISTER
  send(EVENT.DRAWER.OPEN, { type, data })
}

export const c11nSettings = (): void => {
  send(EVENT.DRAWER.OPEN, { type: TYPE.DRAWER.C11N_SETTINGS })
}

export const callWallpaperEditor = (): void => {
  send(EVENT.DRAWER.OPEN, { type: TYPE.DRAWER.CUSTOM_BG_EDITOR })
}

export const callDashboardDesc = (data): void => {
  send(EVENT.DRAWER.OPEN, { type: TYPE.DRAWER.DASHBOARD_DESC, data })
}

export const callSubscriber = (): void => {
  send(EVENT.SUBSCRIBE, {})
}

export const callGEditor = (): void => {
  send(EVENT.DRAWER.OPEN, { type: TYPE.DRAWER.G_EDITOR })
}

export const callTagSettingEditor = (): void => {
  send(EVENT.DRAWER.OPEN, { type: TYPE.DRAWER.TAG_SETTING })
}

export const callAuth = (): void => {
  send(EVENT.AUTH, {})
}

/**
 * sync selector from publish button to g-editor
 */
export const callSyncSelector = (data: TArticlePubSelector): void => {
  send(EVENT.ARTICLE_SELECTOR, { data })
}

export const upvoteOnArticleList = (article: TArticle, viewerHasUpvoted: boolean): void => {
  send(EVENT.UPVOTE_ON_ARTICLE_LIST, {
    article,
    viewerHasUpvoted,
  })
}

export const authWarn = (option = {}): void => send(EVENT.AUTH_WARNING, option)

/**
 * handle click and doubleClick safely
 * see: https://github.com/facebook/react/issues/3185#issuecomment-75138124
 *
 * @param {function} onClick A callback function for single click events
 * @param {function} onDoubleClick A callback function for double click events
                     scroll to header by default
 * @param {number} [latency=300] The amount of time (in milliseconds) to
 *                 wait before differentiating a single from a double click
 * example:
 * before: onClick={() => openMenu(TYPE.MM_TYPE.GLOBAL_MENU)}
 * after:  onClick={multiClick(openMenu(TYPE.MM_TYPE.GLOBAL_MENU))}
 */
export const multiClick = (
  onClick: (HTMLElementEventMap) => void,
  onDoubleClick: (e: HTMLElementEventMap) => void = scrollToHeader,
  latency = 250,
): ((event: HTMLElementEventMap) => void) => {
  let timeoutID = null

  return (event) => {
    if (!timeoutID) {
      timeoutID = setTimeout(() => {
        onClick?.(event)
        timeoutID = null
      }, latency)
    } else {
      timeoutID = clearTimeout(timeoutID)
      onDoubleClick?.(event)
    }
  }
}

/**
 * handle user account state change
 */
export const sessionChanged = (user: TUser): void => {
  send(EVENT.SESSION_CHANGED)
  BStore.set('accountInfo', user as string)
  // see: https://stackoverflow.com/a/55349670/4050784
  Global.dispatchEvent(new Event(EVENT.SESSION_CHANGED))
}

/**
 * handle user account state change
 */
export const viewingChanged = (articleId: TID | null): void => {
  BStore.set('viewingInfo', articleId)
  // see: https://stackoverflow.com/a/55349670/4050784
  Global.dispatchEvent(new Event(EVENT.VIEWING_CHANGED))
}

/**
 * ?????????????????????
 * - ??????????????????????????????????????????????????????
 * - ??????????????????????????????????????????????????????
 */
export const changeToCommunity = (raw = ''): void => {
  const isClient = typeof window === 'object'
  if (!isClient) return

  const { pathname } = window.location
  const curPath = pathname.slice(1)
  const isNonCommunityPage = includes(curPath, values(NON_COMMUNITY_ROUTE))
  const isArticlePage = includes(curPath.split('/')[0], [
    values(ARTICLE_THREAD),
    // works detail page
    'w',
  ])
  const isTargetNonCommunityPage = includes(raw, values(NON_COMMUNITY_ROUTE))

  if (isNonCommunityPage || isArticlePage || isTargetNonCommunityPage) {
    const target = raw === HCN ? '' : raw
    Router.push(`/${target}`)
    send(EVENT.DRAWER.CLOSE)
    return
  }

  send(EVENT.COMMUNITY_CHANGE_BEFORE, { path: raw })
  send(EVENT.DRAWER.CLOSE)
}

/**
 * send preview article singal to Drawer
 */
export const previewArticle = (article: TArticle): void => {
  const type = TYPE.DRAWER[`${article.meta.thread}_VIEW`]
  const data = article

  send(EVENT.DRAWER.OPEN, { type, data })
}

export const setArticleTag = (community: TCommunity, thread: TThread, tags: TTag[]): void => {
  if (!community.id) {
    console.error('should set community for tag setter')
    return
  }
  send(EVENT.SET_TAG, { community, thread, tags })
}

export const selectCommunity = (communityStyle?: TCommunitySetterStyle): void => {
  send(EVENT.SELECT_COMMUNITY, { communityStyle })
}

export const errRescue = ({ type, operation, details, path }: TGQLError): void => {
  send(EVENT.ERR_RESCUE, { type, data: { operation, details, path } })
}
