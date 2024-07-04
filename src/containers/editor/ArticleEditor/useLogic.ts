import { pick, keys, mergeDeepRight } from 'ramda'
import { proxy, useSnapshot } from 'valtio'

import type { TSubmitState, TEditMode } from '~/spec'
import { ARTICLE_CAT } from '~/const/gtd'

import type { TStore } from './spec'

type TRet = {
  reset: () => void
} & TStore

const store = proxy<TStore>({
  mode: 'publish',
  isArchived: false,
  archivedAt: null,

  title: '',
  author: null,
  body: '{}',
  linkAddr: '',
  copyRight: 'cc',
  isQuestion: false,

  // job spec
  company: '',
  companyLink: '',

  // showSubTitle: T.opt(T.bool, false),
  publishing: false,
  publishDone: false,
  //
  wordsCountReady: false,

  // selectors
  activeCat: ARTICLE_CAT.FEATURE,
  activeTag: null,

  get allowEdit(): boolean {
    if (store.mode === 'publish') return true

    return false
  },

  get isArticleAuthor(): boolean {
    return store.allowEdit
  },

  get isReady(): boolean {
    const { title, wordsCountReady } = store
    const titleReady = title.length > 0

    return wordsCountReady && titleReady
  },

  get submitState(): TSubmitState {
    const { mode } = store

    const basicStatus = pick(
      ['publishing', 'publishDone', 'isReady', 'isArchived', 'isArticleAuthor'],
      store,
    )

    return { ...basicStatus, mode: mode as TEditMode }
  },

  commit: (patch: Partial<TStore>): void => {
    Object.assign(store, mergeDeepRight(store, patch))
  },
})

export default (): TRet => {
  const snap = useSnapshot(store)

  const reset = (): void => {
    snap.commit({
      mode: 'publish',
      title: '',
      body: '{}',
      linkAddr: '',
      copyRight: 'cc',
      isQuestion: false,
      publishing: false,
      publishDone: false,
    })
  }

  return {
    ...pick(keys(snap), snap),

    // actions
    reset,
  }
}
