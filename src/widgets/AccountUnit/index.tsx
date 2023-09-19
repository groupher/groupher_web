/*
 *
 * AccountUnit
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:AccountUnit:index')

type TProps = {
  testid?: string
}

const AccountUnit: FC<TProps> = ({ testid = 'account-unit' }) => {
  return (
    <Wrapper testid={testid}>
      <div>
        <h2>AccountUnit widgets</h2>
        <p>impress me</p>
      </div>
    </Wrapper>
  )
}

export default memo(AccountUnit)
