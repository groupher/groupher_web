import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import Img from '@/Img'
import css from '@/utils/css'

import EmojiSVG from '@/icons/EmojiTada'
import UpvoteSVG from '@/icons/Upvote'
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
`
export const Image = styled(Img)`
  width: 600px;
  height: 400px
  border-radius: 5px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 5px 25px rgb(35 35 35 / 5%);
`
export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: 0;
  top: 0;
  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgba(244, 183, 180, 1) 52%, rgba(235, 171, 62, 0.3) 100%);
  border-radius: 20px;
  /* transform: ${({ $active }) => ($active ? 'rotate(-5deg)' : 'rotate(0deg)')}; */
  transform: rotate(-4deg);

  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};

  transition: all 0.3s;
  transition-delay: 0.8s;
`

export const IconsWrapper = styled.div<TActive>`
  position: absolute;
  ${css.flex('align-center')};
  gap: 0 18px;
  bottom: -38px;
  right: 40px;
  filter: saturate(0.8);

  opacity: ${({ $active }) => ($active ? 1 : 0)};

  transition: all 0.3s;
  transition-delay: 1s;
`
export const Icon1 = styled(UpvoteSVG)`
  ${css.size(21)};
  fill: #f46b68;
  opacity: 0.7;
  transform: scaleY(0.8);
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
