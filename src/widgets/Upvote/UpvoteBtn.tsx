/*
 *
 * Upvote
 *
 */

import { type FC, memo } from 'react'

import usePrimaryColor from '@/hooks/usePrimaryColor'

import type { TUpvoteLayout } from '@/spec'

import { Wrapper, IconWrapper, UpIcon } from './styles/upvote_btn'

type TProps = {
  type?: TUpvoteLayout
  viewerHasUpvoted?: boolean
  count?: number
  startAnimate?: boolean
}

const UpvoteBtn: FC<TProps> = ({
  type = 'default',
  viewerHasUpvoted = false,
  startAnimate = false,
  count = 0,
}) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper $showAnimation={startAnimate} type={type}>
      <IconWrapper type={type}>
        <UpIcon type={type} $active={viewerHasUpvoted} count={count} color={primaryColor} />
      </IconWrapper>
    </Wrapper>
  )
}

export default memo(UpvoteBtn)
