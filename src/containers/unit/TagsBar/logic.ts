import { useEffect } from 'react'
import { toUpper, findIndex } from 'ramda'

import type { TTag } from '@/spec'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import asyncSuit from '@/async'
import { errRescue } from '@/signal'
import { buildLog } from '@/logger'
import { getParameterByName } from '@/utils/route'

import type { TStore } from './store'
import S from './schema'

/* eslint-disable-next-line */
const log = buildLog('L:TagsBar')

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.COMMUNITY_CHANGE],
})

let sub$ = null
let store: TStore | undefined

export const onTagSelect = (tag: TTag): void => {
  store.selectTag(tag)
}

export const loadTags = (): void => {
  const { curThread } = store
  // TODO: remove

  const communitySlug = store.curCommunity.slug
  const thread = toUpper(curThread)

  const args = { filter: { community: communitySlug, thread } }

  store.mark({ loading: true })
  sr71$.query(S.pagedArticleTags, args)
}

// if url has tag=xxx query, then set the activeTag ifneed
const setActiveTagFromURL = (tags: TTag[]): void => {
  const tagOnURL = getParameterByName('tag')
  if (!tagOnURL) return
  const idx = findIndex((t) => t.slug === tagOnURL, tags)
  if (idx >= 0) {
    onTagSelect(tags[idx])
  }
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedArticleTags'),
    action: ({ pagedArticleTags: tags }): void => {
      setActiveTagFromURL(tags.entries)
      store.mark({ tags: tags.entries, loading: false })
    },
  },
]
const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: () => {
      store.mark({ loading: false })
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      store.mark({ loading: false })
      errRescue({ type: ERR.TIMEOUT, details, path: 'AccountEditor' })
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => {
      store.mark({ loading: false })
      errRescue({ type: ERR.NETWORK, path: 'AccountEditor' })
    },
  },
]

// ###############################
// init & uninit
// ###############################

export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    log('effect init')
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    // let activeTag = pick(['id', 'title', 'color'], active || emptyTag) as TTag
    // if (isEmpty(activeTag.title)) activeTag = null
    // store.mark({ thread, activeTag })

    return () => {
      log('effect uninit')
      sub$.unsubscribe()
      sr71$.stop()
    }
  }, [_store])
}
