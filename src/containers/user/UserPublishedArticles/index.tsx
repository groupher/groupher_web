/*
 *
 * UserPublished
 *
 */

import { FC, Fragment } from 'react'

import type { TResState } from '@/spec'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import PagedArticles from '@/widgets/PagedArticles'
import ThreadSelector from './ThreadSelector'

import { TStore } from './store'
import { ArticlesWrapper } from './styles'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:UserPublished')

type TProps = {
  userPublishedArticles?: TStore
}

const UserPublishedArticlesContainer: FC<TProps> = ({ userPublishedArticles: store }) => {
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

export default bond(UserPublishedArticlesContainer, 'userPublishedArticles') as FC<TProps>
