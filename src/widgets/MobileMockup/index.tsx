/*
 *
 * MobileMockup
 *
 */

import { type FC, memo, type ReactNode } from 'react'

import { buildLog } from '@/logger'

import { Wrapper, Content } from './styles'

const _log = buildLog('w:MobileMockup:index')

type TProps = {
  testid?: string
  children: ReactNode
}

const MobileMockup: FC<TProps> = ({ testid = 'mobile-mockup', children }) => {
  return (
    <Wrapper $testid={testid}>
      <Content>{children}</Content>
    </Wrapper>
  )
}

export default memo(MobileMockup)
