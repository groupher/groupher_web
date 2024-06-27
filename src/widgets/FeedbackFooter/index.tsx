/*
 *
 * FeedbackFooter
 *
 */

import { type FC, memo } from 'react'

import type { TSpace } from '~/spec'

import TopInfo from './TopInfo'
import BottomInfo from './BottomInfo'

import { Wrapper } from './styles'

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
