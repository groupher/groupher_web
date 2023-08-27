import styled from 'styled-components'

import { Bar as BarBase } from '@/widgets/Common'
import UpvoteSVG from '@/icons/Upvote'

import css, { theme } from '@/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.flex()};
  background: ${theme('alphaBg2')};
  border-radius: 6px;
  height: 50px;
  padding: 3px 6px;
  opacity: ${({ opacity }) => opacity};
  margin-bottom: 6px;
`
export const UpvotesWrapper = styled.div`
  ${css.size(40)};
  ${css.flexColumn('align-both')};

  border: 1px solid;
  border-color: #dac7e3;
  border-radius: 8px;

  box-shadow: rgb(151 149 165 / 15%) 0px 8px 24px;
`
export const RightPart = styled.div`
  ${css.flexColumn()};
  margin-left: 14px;
`
export const Footer = styled.div`
  ${css.flex('align-center')};
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  transform: scaleY(0.8);
  fill: ${theme('baseColor.purple')};
  opacity: 0.8;
  margin-top: 2px;
`

export const Count = styled.div`
  font-size: 13px;
  color: ${theme('baseColor.purple')};
`

export const Bar = styled(BarBase)`
  background: ${theme('baseColor.purple')};
`
