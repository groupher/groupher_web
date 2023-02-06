import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

import EmojiSVG from '@/icons/EmojiTada'
import BroadcastSVG from '@/icons/Broadcast'
import CommentSVG from '@/icons/Heart'

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
  /* border: 5px solid; */
  z-index: 2;
  background: ${theme('alphaBg')};
  backdrop-filter: blur(5px);
  padding: 5px;
  border-radius: 10px;
  overflow: hidden;
`
export const Image = styled(Img)`
  width: 100%;
  height: 390px;
  border-radius: 5px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 5px 25px rgb(35 35 35 / 5%);
`
export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: -290px;
  top: -400px;
  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgba(244, 183, 180, 1) 52%, rgba(235, 171, 62, 0.3) 100%);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  transform: rotate(-3deg);

  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};
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
  bottom: -25px;
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
