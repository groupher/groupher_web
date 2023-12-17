/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import { UPVOTE_LAYOUT } from '@/constant/layout'
import AnimatedCount from '@/widgets/AnimatedCount'

import useUpvote from './useUpvote'
import UpvoteBtn from './UpvoteBtn'

import { Wrapper, Button, Alias, UpWrapper, CountWrapper } from './styles/comment_layout'

const _log = buildLog('w:Upvote:index')

type TProps = {
  testid?: string
  count?: number
  alias?: string
  viewerHasUpvoted?: boolean
  onAction?: (viewerHasUpvoted: boolean) => void
}

const Upvote: FC<TProps> = ({
  testid = 'upvote',
  alias = '赞同',
  count = 0,
  viewerHasUpvoted = false,
  onAction = log,
}) => {
  const primaryColor = usePrimaryColor()
  const { handleClick, startAnimate } = useUpvote({ viewerHasUpvoted, onAction })

  return (
    <Wrapper $testid={testid}>
      <Button color={primaryColor} $active={viewerHasUpvoted} onClick={handleClick}>
        <UpWrapper>
          <UpvoteBtn
            type={UPVOTE_LAYOUT.COMMENT}
            viewerHasUpvoted={viewerHasUpvoted}
            startAnimate={startAnimate}
            count={count}
          />
        </UpWrapper>
        <Alias color={primaryColor} $active={viewerHasUpvoted}>
          {alias}
        </Alias>
        {count !== 0 && (
          <CountWrapper>
            <AnimatedCount count={count} $active={viewerHasUpvoted} size="small" />
          </CountWrapper>
        )}
      </Button>
    </Wrapper>
  )
}

export default memo(Upvote)
