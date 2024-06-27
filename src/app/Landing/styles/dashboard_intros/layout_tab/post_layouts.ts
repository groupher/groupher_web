import styled, { css, rainbow, theme } from '~/css'

import type { TColor } from '~/spec'
import UpvoteSVG from '~/icons/Upvote'

export const Wrapper = styled.div`
  margin-top: 15px;
  ${css.column('align-both')};
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.7;
`
export const Layouts = styled.div`
  ${css.row('align-center')};
  padding: 20px;
  flex-wrap: wrap;
  border-radius: 10px;
  gap: 15px 20px;
  /* background: ${theme('landing.greyBg')}; */
`
export const Card = styled.div`
  position: relative;
  overflow: hidden;
  width: 158px;
  height: 54px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid;
  border-radius: 5px;
  border-color: ${theme('divider')};
  box-shadow: ${theme('button.boxShadow')};
  background: ${theme('htmlBg')};
`
export const UpvoteBox = styled.div`
  width: 30px;
  height: 32px;
  ${css.column('align-both')};
  background: ${theme('alphaBg')};
  border: 1px solid;
  border-radius: 5px;
  border-color: ${theme('divider')};
  box-shadow: ${theme('button.boxShadow')};
  background: ${theme('htmlBg')};
`

export const UpvoteIcon = styled(UpvoteSVG)<TColor>`
  ${css.size(11)};
  fill: ${({ $color }) => rainbow($color)};
  opacity: 0.7;
  margin-top: 1px;
`
export const UpvoteCount = styled.div<TColor>`
  font-size: 11px;
  font-weight: 500;
  color: ${({ $color }) => rainbow($color)};
  opacity: 0.7;
`
