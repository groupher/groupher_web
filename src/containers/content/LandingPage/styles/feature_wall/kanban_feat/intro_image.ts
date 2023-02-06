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
  ${css.flexColumn('align-end')};
  width: 600px;
  height: 400px;
  background: ${theme('alphaBg2')};
  border: 1px solid;
  border-color: #c8d5f2;
  border-radius: 15px;
  z-index: 2;
`
export const BoardsWrapper = styled.div`
  ${css.flex('justify-center', 'align-end')};
  gap: 0 18px;
  width: 100%;
`
export const Board = styled.div<{ shadow?: boolean }>`
  ${css.flexColumn()};
  padding: 6px;
  gap: 6px;
  overflow: hidden;

  width: 168px;
  height: 300px;
  background: #c8d6f24f;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: ${({ shadow }) => (shadow ? '#c3d6f336 1px 5px 17px 7px' : 'none')}; ;
`

export const Image = styled(Img)`
  width: 600px;
  height: 396px;
  object-fit: cover;
  box-shadow: ${css.cardShadow};
  border-radius: 20px;
  border: 1px solid;
  border-color: #c6d4f0;
  box-shadow: 0 5px 25px rgb(35 35 35 / 5%);
  background: ${theme('alphaBg2')};

  /* border: 1px solid transparent;
  border-image: linear-gradient(0.35turn, transparent, #c6d4f0, #c6d4f0, #c6d4f0, transparent); */
  /* border-image-slice: 1; */
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
  bottom: -38px;
  left: -270px;
`
export const Icon1 = styled(GtdTodoSVG)`
  ${css.size(19)};
  fill: #5799fb;
  opacity: 0.6;
`
export const Icon2 = styled(GtdWipSVG)`
  ${css.size(20)};
  fill: #5799fb;
  opacity: 0.8;
`
export const Icon3 = styled(GtdDoneSVG)`
  ${css.size(19)};
  fill: #69b8cc;
  opacity: 0.8;
`
