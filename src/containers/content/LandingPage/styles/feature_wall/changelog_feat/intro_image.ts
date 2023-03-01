import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css from '@/utils/css'

import EmojiSVG from '@/icons/EmojiTada'
import BroadcastSVG from '@/icons/Broadcast'
import CommentSVG from '@/icons/Heart'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  flex-grow: 1;
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
  border-color: #f9b7b5;
  overflow: hidden;
`

export const ColorBlock = styled.div<TActive>`
  position: absolute;
  top: -400px;
  left: 0;
  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgb(253 223 222) 52%, rgb(252 242 223) 100%);
  border-radius: 20px;
  transform: rotate(-4deg);

  /* box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')}; */

  ${css.media.mobile`
    left: 0;
    top: 0;
  `};
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
  z-index: -3;
`
export const Icon1 = styled(BroadcastSVG)`
  ${css.size(21)};
  fill: #f46b68;
  opacity: 0.85;
  margin-top: -1px;
`
export const Icon2 = styled(CommentSVG)`
  ${css.size(20)};
  fill: #f48d68;
  opacity: 0.8;
`
export const Icon3 = styled(EmojiSVG)`
  ${css.size(21)};
  opacity: 0.5;
  margin-top: -2px;
`
