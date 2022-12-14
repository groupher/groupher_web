/*
 *
 * Footer
 *
 */

import { FC } from 'react'

import type { TMetric } from '@/spec'
import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import SimpleLayout from './SimpleLayout'
// import FullLayout from './FullLayout'
import PowerbyInfo from './PowerbyInfo'

import { Wrapper, InnerWrapper } from '../styles'

/* eslint-disable-next-line */
const log = buildLog('C:Footer')

type TProps = {
  metric?: TMetric
  testid?: string
}

const FooterContainer: FC<TProps> = ({ metric, testid = 'footer' }) => {
  return (
    <Wrapper testid={testid} metric={metric}>
      <InnerWrapper metric={metric}>
        <SimpleLayout />
        {/* <FullLayout /> */}
        <PowerbyInfo />
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(FooterContainer, 'footer') as FC<TProps>
