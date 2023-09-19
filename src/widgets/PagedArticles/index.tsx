/*
 *
 * PagedArticles
 *
 */

import { FC, memo } from 'react'
import Pagi from '@/widgets/Pagi'

import type { TThread, TPagedArticles, TResState } from '@/spec'
import EVENT from '@/constant/event'

import { send } from '@/signal'
import { buildLog } from '@/logger'

import ArticleList from './ArticleList'
// import CommunityRecommends from './CommunityRecommends'

/* eslint-disable-next-line */
const log = buildLog('w:PagedArticles:index')

export type TProps = {
  thread: TThread
  data: TPagedArticles
  resState: TResState
  // TODO: remove
  emptyPrefix?: string
}

const PagedArticles: FC<TProps> = ({ thread, data, resState, emptyPrefix }) => {
  const { entries, ...pagi } = data

  return (
    <>
      <ArticleList
        thread={thread}
        entries={entries}
        resState={resState}
        emptyPrefix={emptyPrefix}
      />

      <Pagi
        {...pagi}
        onChange={(page) => send(EVENT.REFRESH_ARTICLES, { page })}
        top={80}
        bottom={30}
      />
    </>
  )
}

/* <CommunityRecommends /> */
export default memo(PagedArticles)
