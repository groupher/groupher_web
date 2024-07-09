/*
 *
 * ArticleFooter
 *
 */

import { type FC, memo } from 'react'

import Panel from './Panel'
import { Wrapper } from './styles'

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
