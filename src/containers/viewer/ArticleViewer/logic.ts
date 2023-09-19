import { useEffect } from 'react'
import { merge } from 'ramda'

import type { TArticle } from '@/spec'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'
import { buildLog } from '@/logger'
import { errRescue, authWarn } from '@/utils/signal'
import asyncSuit from '@/utils/async'
import { scrollDrawerToTop } from '@/dom'
import { matchArticleUpvotes, matchArticles } from '@/utils/macros'

import S from './schema'
import type { TStore } from './store'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.DRAWER.CLOSE, EVENT.RELOAD_ARTICLE],
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:ArticleViewer')

export const handleUpvote = (article: TArticle, viewerHasUpvoted: boolean): void => {
  if (!store.isLogin) return authWarn({ hideToast: true })
  const { id, meta } = article

  store.updateUpvote(viewerHasUpvoted)

  const queryLatestUsers = true

  viewerHasUpvoted
    ? sr71$.mutate(S.getUpvoteSchema(meta.thread, queryLatestUsers), { id })
    : sr71$.mutate(S.getUndoUpvoteSchema(meta.thread, queryLatestUsers), { id })
}

const loadArticle = (): void => {
  markLoading()

  const userHasLogin = store.isLogin
  const { originalCommunitySlug, innerId, meta } = store.viewingArticle

  const variables = { community: originalCommunitySlug, id: innerId, userHasLogin }

  return sr71$.query(S.getArticleSchema(meta.thread), variables)
}

const markLoading = (maybe = true) => store.mark({ loading: maybe })

const handleArticleRes = (article: TArticle): void => {
  log('# handleArticleRes: ', article)
  markLoading(false)

  const thread = article.meta.thread.toLowerCase()
  const { document, ...restArticle } = article
  store.mark({ document })
  store.setViewing({ [thread]: merge(store.viewingArticle, restArticle) })

  setTimeout(() => {
    const { id, viewerHasUpvoted, views, upvotesCount } = article
    store.syncArticle({
      id,
      viewerHasUpvoted,
      views,
      upvotesCount,
      viewerHasViewed: true,
    })
  }, 2000)
}

const handleUovoteRes = ({ upvotesCount, meta }) => {
  store.updateUpvoteCount(upvotesCount, meta)

  const { id, viewerHasUpvoted, meta: viewingArticleMeta } = store.viewingArticle
  const syncMeta = merge(viewingArticleMeta, meta)
  store.syncArticle({ id, viewerHasUpvoted, upvotesCount, meta: syncMeta })
}

// ###############################
// init & uninit handlers
// ###############################
const DataSolver = [
  ...matchArticleUpvotes(handleUovoteRes),
  ...matchArticles(handleArticleRes),
  {
    match: asyncRes(EVENT.RELOAD_ARTICLE),
    action: () => {
      scrollDrawerToTop()
      markLoading(true)
      loadArticle()
    },
  },

  {
    match: asyncRes(EVENT.DRAWER.CLOSE),
    action: () => {
      sr71$.stop()
      markLoading(false)
    },
  },

  // {
  //   match: asyncRes('setTag'),
  //   action: () => {
  //     loadPost(store.viewingArticle)
  //     closeDrawer()
  //     store.setViewing({ post: {} })
  //   },
  // },
  // {
  //   match: asyncRes('unsetTag'),
  //   action: () => {
  //     loadPost(store.viewingArticle)
  //     closeDrawer()
  //     store.setViewing({ post: {} })
  //   },
  // },
]
const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: () => {
      //
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => errRescue({ type: ERR.TIMEOUT, details, path: 'PostViewer' }),
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => errRescue({ type: ERR.NETWORK, path: 'PostViewer' }),
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    loadArticle()

    return () => {
      store.reset()
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
