import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css from '@/css'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.columnGrow('align-both')};
  position: relative;

  ${css.media.mobile`
    transform: scale(0.52);
    margin-top: -50px;
  `};
`
export const ImageWrapper = styled.div`
  ${css.column('align-end')};
  width: 600px;
  height: 400px;
  background: white;
  border: 1px dotted;
  border-color: #c8d5f2;
  border-radius: 10px;
  z-index: 2;
`

export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: 0;
  top: -400px;
  width: 600px;
  height: 390px;
  background: linear-gradient(137deg, rgb(226 236 255) 52%, rgb(219 238 241) 100%);
  /* backdrop-filter: blur(5px); */
  border-radius: 20px;
  /* box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')}; */
  transform: rotate(4deg);

  ${css.media.mobile`
    left: -140px;
    top: 5px;
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
