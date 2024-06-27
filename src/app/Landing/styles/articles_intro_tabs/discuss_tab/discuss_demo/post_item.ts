import UpvoteSVG from '~/icons/Upvote'

import styled, { css, theme } from '~/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.row()};
  background: ${theme('htmlBg')};
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
  border-color: ${theme('button.upvoteBorder')};
  border-radius: 8px;

  box-shadow: rgb(151 149 165 / 15%) 0px 8px 24px;
`
export const RightPart = styled.div`
  ${css.column()};
  margin-left: 14px;
`
export const Title = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${theme('article.title')};
`
export const Footer = styled.div`
  transform: scale(0.8);
  width: 120px;
  margin-top: 4px;
  margin-left: -18px;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  transform: scaleY(0.8);
  fill: ${theme('article.digest')};
  opacity: 0.8;
  margin-top: 2px;
`

export const Count = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
`
