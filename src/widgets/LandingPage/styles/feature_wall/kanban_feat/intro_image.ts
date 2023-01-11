import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import Img from '@/Img'
import css from '@/utils/css'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'

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

  background: linear-gradient(137deg, rgba(197, 214, 245, 1) 52%, rgba(72, 144, 157, 0.37) 100%);

  border-radius: 20px;
  transform: rotate(4deg);

  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};

  transition: all 0.3s;
  transition-delay: 0.8s;
`
export const IconsWrapper = styled.div<TActive>`
  position: absolute;
  ${css.flex('align-center')};
  gap: 0 15px;
  bottom: -40px;
  left: 40px;
  filter: saturate(0.8);

  opacity: ${({ $active }) => ($active ? 1 : 0)};

  transition: all 0.3s;
  transition-delay: 1s;
`
export const Icon1 = styled(GtdTodoSVG)`
  ${css.size(21)};
  fill: #5799fb;
  opacity: 0.6;
`
export const Icon2 = styled(GtdWipSVG)`
  ${css.size(23)};
  fill: #5799fb;
  opacity: 0.8;
`
export const Icon3 = styled(GtdDoneSVG)`
  ${css.size(21)};
  fill: #69b8cc;
  opacity: 0.8;
`
