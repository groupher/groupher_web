/*
 *
 * FeedbackFooter
 *
 */

import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import TopInfo from './TopInfo'
import BottomInfo from './BottomInfo'

import { Wrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:FeedbackFooter:index')

type TProps = {
  offsetRight?: number
} & TSpace

const FeedbackFooter: FC<TProps> = ({ offsetRight = 30, ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      <TopInfo />
      <BottomInfo offsetRight={offsetRight} />
    </Wrapper>
  )
}

export default memo(FeedbackFooter)
