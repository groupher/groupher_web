import styled, { css, theme } from '@/css'
import UpvoteSVG from '@/icons/Upvote'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.row('align-both')};
  padding-left: 4px;
  padding-top: 6px;
  position: relative;
  margin-bottom: 20px;

  /* transform: scale(0.4); */
`
export const Cover = styled.div`
  background: ${theme('article.title')};
  ${css.size(42)};
  border-radius: 4px;
  z-index: 1;
  position: absolute;
  top: 8px;
  left: 8px;
  transform: rotate(-9deg);
`
export const Box = styled.div`
  width: 44px;
  height: 40px;
  ${css.row('align-both')};
  border-radius: 5px;
  background: white;
  z-index: 2;
  border: 3px solid;
  border-color: ${theme('article.title')};
`
export const UpvoteIcon = styled(UpvoteSVG)`
  fill: ${theme('article.title')};
  margin-bottom: 2px;
  ${css.size(25)};
  transform: scaleY(0.85);
  filter: drop-shadow(2px 2px 3px lightgrey);
`
