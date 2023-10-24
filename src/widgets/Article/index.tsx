/*
 *
 * Article
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'
import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:Article:index')

type TProps = {
  testid?: string
}

const Article: FC<TProps> = ({ testid = 'article' }) => {
  return (
    <Wrapper testid={testid}>
      <div>
        <h2>Article widgets</h2>
        <p>impress me</p>
      </div>
    </Wrapper>
  )
}

export default memo(Article)
