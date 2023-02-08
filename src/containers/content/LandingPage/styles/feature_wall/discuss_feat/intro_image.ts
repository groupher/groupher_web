import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css from '@/utils/css'

import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'
import ShareSVG from '@/icons/Share'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  flex-grow: 1;
  position: relative;
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
  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgb(217 199 228) 52%, rgba(229, 216, 217, 1) 100%);
  border-radius: 20px;
  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};
  transform: rotate(-6deg);
`
export const ColorBlockHolder = styled(ColorBlock)`
  left: 0px;
  top: 0;
  opacity: 0.3;
`
export const IconsWrapper = styled.div`
  position: absolute;
  ${css.flex('align-center')};
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
