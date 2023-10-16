import styled from 'styled-components'

import { Bar as BarBase } from '@/widgets/Common'
import UpvoteSVG from '@/icons/Upvote'

import css, { theme } from '@/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.row()};
  background: ${theme('alphaBg2')};
  border-radius: 6px;
  height: 50px;
  padding: 3px 6px;
  opacity: ${({ opacity }) => opacity};
  margin-bottom: 6px;
`
export const UpvotesWrapper = styled.div`
  ${css.size(40)};
  ${css.column('align-both')};

  border: 1px solid;
  border-color: #dac7e3;
  border-radius: 8px;

  box-shadow: rgb(151 149 165 / 15%) 0px 8px 24px;
`
export const RightPart = styled.div`
  ${css.column()};
  margin-left: 14px;
`
export const Footer = styled.div`
  ${css.row('align-center')};
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  transform: scaleY(0.8);
  fill: ${theme('rainbow.purple')};
  opacity: 0.8;
  margin-top: 2px;
`

export const Count = styled.div`
  font-size: 13px;
  color: ${theme('rainbow.purple')};
`

export const Bar = styled(BarBase)`
  background: ${theme('rainbow.purple')};
`
