/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import AnimatedCount from '@/widgets/AnimatedCount'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'
import { Wrapper, Button, CountWrapper, Alias } from './styles/article_layout'

const _log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  viewerHasUpvoted?: boolean
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  count = 0,
  viewerHasUpvoted = false,
  onAction = log,
}) => {
  const primaryColor = usePrimaryColor()
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  console.log('## viewerHasUpvoted: ', viewerHasUpvoted)

  return (
    <Wrapper $testid={testid}>
      <Button $color={primaryColor} $active={viewerHasUpvoted} onClick={handleClick}>
        <UpvoteBtn viewerHasUpvoted={viewerHasUpvoted} count={count} startAnimate={startAnimate} />
        <CountWrapper>
          <AnimatedCount count={count} $active={viewerHasUpvoted} size="medium" />
        </CountWrapper>
        <Alias $color={primaryColor} $active={viewerHasUpvoted}>
          票
        </Alias>
      </Button>
    </Wrapper>
  )
}

export default memo(Upvote)
