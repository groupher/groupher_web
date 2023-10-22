/*
 *
 * ArticleFooter
 *
 */

import { FC } from 'react'

import { buildLog } from '@/logger'
import { bond } from '@/mobx'

import Panel from './Panel'

import type { TStore } from './store'
import { Wrapper } from './styles'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleFooter')

type TProps = {
  articleFooter?: TStore
  testid?: string
}

const ArticleFooterContainer: FC<TProps> = ({
  articleFooter: store,
  testid = 'article-footer',
}) => {
  useInit(store)
  const { viewingArticle } = store
  const { author } = viewingArticle

  return (
    <Wrapper testid={testid}>
      <Panel author={author} article={viewingArticle} />
    </Wrapper>
  )
}

export default bond(ArticleFooterContainer, 'articleFooter') as FC<TProps>
