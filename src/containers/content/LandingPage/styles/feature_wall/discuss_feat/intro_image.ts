import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css from '@/css'

import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'
import ShareSVG from '@/icons/Share'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.columnGrow('align-both')};
  position: relative;

  ${css.media.mobile`
    transform: scale(0.52);
    margin-top: -50px;
  `};
`
export const ImageWrapper = styled.div`
  width: 600px;
  height: 400px;

  z-index: 2;
  background: white;
  padding: 5px;
  border-radius: 10px;
  border: 1px dotted;
  border-color: #af92c1;
  overflow: hidden;
`
export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: -300px;
  top: -400px;

  left: 0;
  top: -400px;

  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgb(233 222 241) 52%, rgb(240 225 238) 100%);
  border-radius: 20px;

  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};
  transform: rotate(-5deg);

  ${css.media.mobile`
    left: 0;
    top: 0;
    transform: rotate(-4deg);
    opacity: 0.8;
  `};
`
export const ColorBlockHolder = styled(ColorBlock)`
  left: 0px;
  top: 0;
  opacity: 0.3;
`
export const IconsWrapper = styled.div`
  position: absolute;
  ${css.row('align-center')};
  gap: 0 18px;
  bottom: -30px;
  right: -250px;
  z-index: -1;
`
export const Icon1 = styled(UpvoteSVG)`
  ${css.size(18)};
  fill: #b086bd;
  opacity: 0.8;
  transform: scaleY(0.8);
  margin-top: -1px;
`
export const Icon2 = styled(CommentSVG)`
  ${css.size(16)};
  fill: #b086bd;
  opacity: 0.6;
`
export const Icon3 = styled(ShareSVG)`
  ${css.size(18)};
  fill: #b086bd;
  opacity: 0.7;
  margin-top: -1px;
  margin-left: -2px;
`
