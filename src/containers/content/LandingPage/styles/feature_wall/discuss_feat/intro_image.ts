import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import Img from '@/Img'
import css from '@/utils/css'

import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'
import PeopleSVG from '@/icons/People'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  flex-grow: 1;
  /* width: 500px;
  height: 440px; */
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
  box-shadow: ${css.cardShadow};
  border-radius: 5px;
  box-shadow: 0 5px 25px rgb(35 35 35 / 5%);
`
export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: 0;
  top: 0;
  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgb(217 199 228) 52%, rgba(229, 216, 217, 1) 100%);
  border-radius: 20px;
  /* transform: ${({ $active }) => ($active ? 'rotate(-5deg)' : 'rotate(0deg)')}; */
  transform: rotate(-5deg);

  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};

  transition: all 0.3s;
  transition-delay: 1s;
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
  ${css.size(19)};
  fill: #b086bd;
  opacity: 0.6;
  transform: scaleY(0.9);
  margin-top: -1px;
`
export const Icon2 = styled(CommentSVG)`
  ${css.size(16)};
  fill: #b086bd;
  opacity: 0.6;
`
export const Icon3 = styled(PeopleSVG)`
  ${css.size(19)};
  fill: #b086bd;
  opacity: 0.7;
  margin-top: -1px;
`
