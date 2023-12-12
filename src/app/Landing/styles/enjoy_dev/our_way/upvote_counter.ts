import styled, { css, theme } from '@/css'

import UpvoteSVG from '@/icons/Upvote'

export const Wrapper = styled.div<{ color: string }>`
  ${css.row('align-center')};
  padding: 0 5px;
  border: 1px solid;
  border-color: ${({ color }) => color || theme('divider')};
  border-radius: 5px;
  margin-left: -1px;
`
export const UpvoteIcon = styled(UpvoteSVG)<{ color: string }>`
  ${css.size(12)};
  fill: ${({ color }) => color || theme('article.digest')};
  transform: scaleY(0.85);
  opacity: 0.8;
  margin-top: -1px;
`

export const Text = styled.div<{ color: string }>`
  color: ${({ color }) => color || theme('article.title')};
  font-size: 13px;
  margin-left: 6px;
`
