import { useEffect } from 'react'

import type { TArticle, TArticleFilter } from '@/spec'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'
import TYPE from '@/constant/type'

import { scrollToHeader } from '@/dom'
import asyncSuit from '@/async'
import { buildLog } from '@/logger'
import { errRescue, previewArticle } from '@/signal'

import type { TStore } from './store'
// import S from './schema'

/* eslint-disable-next-line */
const log = buildLog('L:ArticlesThread')

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [
    EVENT.PREVIEW_ARTICLE,
    EVENT.REFRESH_ARTICLES,
    EVENT.ARTICLE_THREAD_CHANGE,
    EVENT.COMMUNITY_CHANGE,
    EVENT.C11N_DENSITY_CHANGE,
  ],
})

let store: TStore | undefined
let sub$ = null

export const inAnchor = (): void => store?.showTopModeline(false)
export const outAnchor = (): void => store?.showTopModeline(true)

export const onFilterSelect = (option: TArticleFilter): void => {
  // store.selectFilter(option)
  // console.log('cur filter: ', store.filtersData)
  loadArticles()
}

/**
 * load paged articles then save them to store
 */
const loadArticles = (page = 1): void => {
  console.log('## do loadArticles')
  scrollToHeader()
  // doQuery(page)
  // store.markRoute({ tag: tag.slug })
  // store.markRoute({ page })
}

// do query paged articles
const doQuery = (page: number): void => {
  // const args = store.getLoadArgs(page)
  // log('args: ', args)
  // sr71$.query(S.getPagedArticlesSchema(store.curThread), args)
}

/**
 * prepack then send preview event to drawer
 */
const onPreview = (article: TArticle): void => {
  const { resState } = store
  if (resState === TYPE.RES_STATE.LOADING) return

  previewArticle(article)
}

// ###############################
// Data & Error handlers
// ###############################
const DataSolver = [
  {
    match: asyncRes(EVENT.PREVIEW_ARTICLE),
    action: (res) => {
      const { article } = res[EVENT.PREVIEW_ARTICLE]
      onPreview(article)
    },
  },
  {
    match: asyncRes(EVENT.REFRESH_ARTICLES),
    action: (res) => {
      const { page = 1 } = res[EVENT.REFRESH_ARTICLES]
      loadArticles(page)
    },
  },
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
    action: ({ details }) => {
      errRescue({ type: ERR.TIMEOUT, details, path: 'PostsThread' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      errRescue({ type: ERR.NETWORK, path: 'PostsThread' })
    },
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    store.afterInitLoading()
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
