import styled, { css, theme } from '@/css'

import UpvoteSVG from '@/icons/Upvote'

export const Wrapper = styled.div<{ color: string }>`
  ${css.row('align-center')};
  padding: 0 5px;
  border: 1px solid;
  border-color: ${({ color }) => color || theme('divider')};
  border-radius: 5px;
  margin-left: -1px;
  filter: saturate(0.6);
`
export const UpvoteIcon = styled(UpvoteSVG)<{ color: string }>`
  ${css.size(14)};
  fill: ${({ color }) => color || theme('article.digest')};
  opacity: 0.4;
  margin-top: -1px;
`
export const Text = styled.div<{ color: string }>`
  color: ${({ color }) => color || theme('article.title')};
  font-size: 13px;
  margin-left: 6px;
  opacity: 0.6;
`
export const Counter = styled.div`
  opacity: 0.6;
`
