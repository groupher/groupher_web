/*
 *
 * UserPublished
 *
 */

import { FC, Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import type { TResState } from '@/spec'

import { buildLog } from '@/logger'

import PagedArticles from '@/widgets/PagedArticles'
import ThreadSelector from './ThreadSelector'

import { useStore } from './store'
import { ArticlesWrapper } from './styles'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:UserPublished')

const UserPublishedArticles: FC = () => {
  const store = useStore()
  useInit(store)

  const { thread, viewingUser, pagedArticlesData, resState, hasContentBg } = store

  return (
    <Fragment>
      <ThreadSelector thread={thread} user={viewingUser} />
      <ArticlesWrapper hasContentBg={hasContentBg}>
        <PagedArticles data={pagedArticlesData} thread={thread} resState={resState as TResState} />
      </ArticlesWrapper>
    </Fragment>
  )
}

export default observer(UserPublishedArticles)
