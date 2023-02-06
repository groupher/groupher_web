import styled from 'styled-components'

import { Bar as BarBase } from '@/widgets/Common'
import UpvoteSVG from '@/icons/Upvote'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.flexColumn()};
  background: ${theme('alphaBg2')};
  border-radius: 6px;
  height: 50px;
  padding: 3px 6px;
  opacity: ${({ opacity }) => opacity};
`

export const Bar = styled(BarBase)`
  background: #c3d6f3;
`

export const Footer = styled.div`
  ${css.flex('align-center')};
`

export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(10)};
  transform: scaleY(0.8);
  fill: #5d9dfb;
  opacity: 0.8;
  margin-top: 1px;
`

export const Count = styled.div`
  font-size: 13px;
  color: #5d9dfb;
  margin-left: 4px;
  flex-grow: 1;
  /* opacity: 0.8; */
`
