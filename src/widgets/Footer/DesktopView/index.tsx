/*
 *
 * Footer
 *
 */

import { FC } from 'react'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import SimpleLayout from './SimpleLayout'
import GroupLayout from './GroupLayout'
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
        {metric === METRIC.HOME ? <GroupLayout metric={metric} /> : <SimpleLayout />}
        <PowerbyInfo metric={metric} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(FooterContainer, 'footer') as FC<TProps>
