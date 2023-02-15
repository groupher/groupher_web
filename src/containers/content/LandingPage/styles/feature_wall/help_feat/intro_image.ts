import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css from '@/utils/css'

import BadSVG from './BadSVG'
import SoSoSVG from './SoSoSVG'
import GoodSVG from './GoodSVG'

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

  background: white;
  border: 1px dotted;
  border-color: #6db7b7;
  border-radius: 10px;
  z-index: 2;
`
export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: -300px;
  top: -400px;
  width: 600px;
  height: 390px;

  background: linear-gradient(137deg, rgba(80, 161, 162, 0.76) 52%, rgba(204, 191, 149, 0.71) 100%);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};
  transform: rotate(4deg);
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
  bottom: -40px;
  left: -260px;
`

export const Icon1 = styled(BadSVG)`
  ${css.size(19)};
  opacity: 0.85;
  margin-top: -1px;
`
export const Icon2 = styled(SoSoSVG)`
  ${css.size(19)};
  opacity: 0.85;
  margin-top: -1px;
`
export const Icon3 = styled(GoodSVG)`
  ${css.size(20)};
  opacity: 0.8;
`
