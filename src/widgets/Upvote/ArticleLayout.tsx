/*
 *
 * Upvote
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import usePrimaryColor from '@/hooks/usePrimaryColor'
import useTheme from '@/hooks/useTheme'
import AnimatedCount from '@/widgets/AnimatedCount'

import { Wrapper, Button, UpvoteIcon, CountWrapper, Alias } from './styles/article_layout'

/* eslint-disable-next-line */
const log = buildLog('w:Upvote:index')

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
  const { themeMap } = useTheme()

  return (
    <Wrapper testid={testid}>
      <Button color={primaryColor} $active={viewerHasUpvoted}>
        <UpvoteIcon color={primaryColor} $active={viewerHasUpvoted} />
        <CountWrapper>
          <AnimatedCount count={count} $active={viewerHasUpvoted} size="medium" />
        </CountWrapper>
        <Alias color={primaryColor} $active={viewerHasUpvoted}>
          票
        </Alias>
      </Button>
    </Wrapper>
  )
}

export default memo(Upvote)
