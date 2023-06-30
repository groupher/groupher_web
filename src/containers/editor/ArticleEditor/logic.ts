import { useEffect } from 'react'
import Router from 'next/router'
import { values } from 'ramda'

import type { TEditValue, TCommunity, TTag, TArticleCat } from '@/spec'
import { HCN } from '@/constant/name'
import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import { buildLog } from '@/utils/logger'
import asyncSuit from '@/utils/async'
import { getParameterByName } from '@/utils/route'
import { titleCase } from '@/utils/fmt'
import { errRescue } from '@/utils/signal'
import { updateEditing } from '@/utils/mobx'
import { matchArticles } from '@/utils/macros'

import type { TStore } from './store'
import S from './schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.ARTICLE_SELECTOR],
})

let sub$ = null
let store: TStore | undefined

/* eslint-disable-next-line */
const log = buildLog('L:ArticleEditor')

export const changeCommunity = (community: TCommunity): void => {
  store.mark({ community })
}

export const onTagSelect = (tags: TTag[], checked: boolean): void => {
  store.mark({ articleTags: tags })
}

export const loadCommunity = (): void => {
  const { mode } = store

  if (mode !== 'publish') return
  const slug = getParameterByName('community')?.toLowerCase()

  sr71$.query(S.community, { slug })
}

export const loadArticle = (): void => {
  const { thread, viewingArticle } = store
  const { id } = viewingArticle

  sr71$.query(S[thread], { id })
}

export const editOnChange = (e: TEditValue, key: string): void => {
  updateEditing(store, key, e)
}

export const onCancel = (): void => {
  const { mode } = store

  mode === 'publish' ? gotoBackToCommunity() : gotoArticleDetail()
}

const gotoArticleDetail = () => {
  const { viewingArticle, thread } = store
  Router.push(`/${thread}/${viewingArticle.id}`)
}

const gotoBackToCommunity = () => {
  const { communityData } = store
  const { slug } = communityData

  const path = slug === HCN ? '/' : `/${slug}`
  Router.push(path)
}

export const onPublish = (): void => {
  const { mode } = store
  store.mark({ publishing: true })

  mode === 'publish' ? doCreate() : doUpdate()
}

const doCreate = () => {
  const { thread, editData, communityId } = store
  const variables = { communityId, ...editData }
  log('onPublish --> ', variables)

  const schema = S[`create${titleCase(thread)}`]
  sr71$.mutate(schema, variables)
}

const doUpdate = () => {
  const { thread, editData, viewingArticle } = store
  const { id } = viewingArticle
  const variables = { id, ...editData }
  log('onUpdate --> ', variables)

  const schema = S[`update${titleCase(thread)}`]
  sr71$.mutate(schema, variables)
}

export const setWordsCountState = (wordsCountReady: boolean): void => {
  store?.mark({ wordsCountReady })
}

export const catOnChange = (activeCat: TArticleCat) => {
  store.mark({ activeCat })
}

export const tagOnChange = (activeTag: TTag) => {
  store.mark({ activeTag })
}

// ###############################
// init & uninit handlers
// ###############################

const handleArticleRes = (article) => {
  store.setViewing(article)

  store.loadEditData(article)
}

const handleMutateRes = (data): void => {
  store.mark({ publishing: false, publishDone: true })
  store.setViewing(values(data)[0])

  gotoArticleDetail()
}

const DataSolver = [
  ...matchArticles(handleArticleRes),
  {
    match: asyncRes('createPost'),
    action: handleMutateRes,
  },
  {
    match: asyncRes('updatePost'),
    action: handleMutateRes,
  },
  {
    match: asyncRes('community'),
    action: ({ community }) => store.mark({ community }),
  },
  {
    match: asyncRes(EVENT.ARTICLE_SELECTOR),
    action: (data) => {
      const {
        data: { cat, tag },
      } = data[EVENT.ARTICLE_SELECTOR]

      cat && catOnChange(cat)
      tag?.id !== '' && tagOnChange(tag)
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => {
      store.mark({ publishing: false })
      errRescue({ type: ERR.GRAPHQL, details, path: 'publishPost' })
      //
    },
  },
]

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
    log('useInit: ', store)

    loadCommunity()
    if (store.mode === 'update') loadArticle()

    // return () => store.reset()
    return () => {
      sr71$.stop()
      sub$.unsubscribe()
      sub$ = null
      store.reset()
    }
  }, [_store])
}
