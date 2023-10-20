/*
 *
 * Share
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'
import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:Share:index')

type TProps = {
  testid?: string
}

const Share: FC<TProps> = ({ testid = 'share' }) => {
  return (
    <Wrapper testid={testid}>
      <div>
        <h2>Share widgets</h2>
        <p>impress me</p>
      </div>
    </Wrapper>
  )
}

export default memo(Share)
