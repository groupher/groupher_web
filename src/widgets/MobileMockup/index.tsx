/*
 *
 * MobileMockup
 *
 */

import { type FC, memo, type ReactNode } from 'react'

import { Wrapper, Content } from './styles'

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
