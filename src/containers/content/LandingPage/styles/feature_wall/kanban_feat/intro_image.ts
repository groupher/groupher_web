import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

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
  height: 396px;
  border-radius: 5px;
  object-fit: cover;
  box-shadow: ${css.cardShadow};
  border-radius: 5px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: 0 5px 25px rgb(35 35 35 / 5%);
  background: ${theme('alphaBg2')};
`
export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: -300px;
  top: -400px;
  width: 600px;
  height: 390px;
  background: linear-gradient(137deg, rgba(197, 214, 245, 1) 52%, rgba(72, 144, 157, 0.37) 100%);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};
  transform: rotate(5deg);
`
export const ColorBlockHolder = styled(ColorBlock)`
  left: 0px;
  top: 0;
  opacity: 0.3;
`
export const IconsWrapper = styled.div`
  position: absolute;
  ${css.flex('align-center')};
  gap: 0 15px;
  bottom: -40px;
  left: -270px;
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
