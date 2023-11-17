import type { TArticleFilter } from '@/spec'

import { scrollToHeader } from '@/dom'
import { buildLog } from '@/logger'

// import S from './schema'

/* eslint-disable-next-line */
const log = buildLog('L:ArticlesThread')

export const inAnchor = (): void => {
  console.log('## inAnchor')
}
export const outAnchor = (): void => {
  console.log('## outAnchor')
}

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
}

// do query paged articles
const doQuery = (page: number): void => {
  // const args = store.getLoadArgs(page)
  // log('args: ', args)
  // sr71$.query(S.getPagedArticlesSchema(store.curThread), args)
}
