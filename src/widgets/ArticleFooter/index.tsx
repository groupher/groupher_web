/*
 *
 * ArticleFooter
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import Panel from './Panel'
import { Wrapper } from './styles'

const _log = buildLog('c:ArticleFooter:index')

type TProps = {
  testid?: string
}

const ArticleFooter: FC<TProps> = ({ testid = 'article-footer' }) => {
  return (
    <Wrapper $testid={testid}>
      <Panel />
    </Wrapper>
  )
}

export default memo(ArticleFooter)
