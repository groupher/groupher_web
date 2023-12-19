import { Bar as BarBase } from '@/widgets/Common'
import UpvoteSVG from '@/icons/Upvote'

import styled, { css, theme } from '@/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.column()};
  border-radius: 6px;
  height: 50px;
  padding: 3px 6px;
  opacity: ${({ opacity }) => opacity};
  background: ${theme('alphaBg2')};
`
export const Bar = styled(BarBase)`
  background: ${theme('hint')};
`
export const Footer = styled.div`
  ${css.row('align-center')};
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(10)};
  transform: scaleY(0.8);
  fill: ${theme('article.digest')};
  opacity: 0.8;
  margin-top: 1px;
`
export const Count = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-left: 4px;
  flex-grow: 1;
  /* opacity: 0.8; */
`
