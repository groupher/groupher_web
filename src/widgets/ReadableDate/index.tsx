/*
 *
 * ReadableDate
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import AbsoluteFmt from './AbsoluteFmt'
import { Wrapper } from './styles'

const _log = buildLog('w:ReadableDate:index')

type TProps = {
  testid?: string
  date: string
  withTime?: boolean
  className?: string
}

const ReadableDate: FC<TProps> = ({
  testid = 'readable-date',
  className = 'readable-date',
  withTime = true,
  date,
}) => {
  return (
    <Wrapper $testid={testid} className={className}>
      <AbsoluteFmt datetime={date} className={className} withTime={withTime} />
    </Wrapper>
  )
}

export default memo(ReadableDate)
