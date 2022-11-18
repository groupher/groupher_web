/*
 *
 * Footer
 *
 */

import { FC } from 'react'
import { includes } from 'ramda'

import type { TMetric } from '@/spec'
import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

// import HomeLayout from './HomeLayout'
import SimpleLayout from './SimpleLayout'
// import HostingCommunityView from './HostingCommunityView'

import { Wrapper } from '../styles'

/* eslint-disable-next-line */
const log = buildLog('C:Footer')

type TProps = {
  metric?: TMetric
  testid?: string
}

const FooterContainer: FC<TProps> = ({ metric, testid = 'footer' }) => {
  return (
    <Wrapper testid={testid} metric={metric}>
      <SimpleLayout />
    </Wrapper>
  )
}

export default bond(FooterContainer, 'footer') as FC<TProps>
