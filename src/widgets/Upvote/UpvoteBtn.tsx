/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import usePrimaryColor from '@/hooks/usePrimaryColor'

import type { TUpvoteLayout } from '@/spec'
import { buildLog } from '@/logger'

import { Wrapper, ContentWrapper, IconWrapper, UpIcon } from './styles/upvote_btn'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

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
      <ContentWrapper>
        <IconWrapper type={type}>
          <UpIcon type={type} $active={viewerHasUpvoted} count={count} color={primaryColor} />
        </IconWrapper>
      </ContentWrapper>
    </Wrapper>
  )
}

export default memo(UpvoteBtn)
