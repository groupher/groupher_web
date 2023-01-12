import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import Img from '@/Img'
import css from '@/utils/css'

import BadSVG from './BadSVG'
import SoSoSVG from './SoSoSVG'
import GoodSVG from './GoodSVG'

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

  background: linear-gradient(137deg, rgba(80, 161, 162, 0.76) 52%, rgba(204, 191, 149, 0.71) 100%);
  border-radius: 20px;
  transform: rotate(4deg);

  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};

  transition: all 0.3s;
  transition-delay: 0.8s;
`

export const IconsWrapper = styled.div<TActive>`
  position: absolute;
  ${css.flex('align-center')};
  gap: 0 18px;
  bottom: -38px;
  left: 45px;
  filter: saturate(0.8);

  opacity: ${({ $active }) => ($active ? 1 : 0)};

  transition: all 0.3s;
  transition-delay: 1s;
`

export const Icon1 = styled(BadSVG)`
  ${css.size(20)};
  opacity: 0.85;
  margin-top: -1px;
`
export const Icon2 = styled(SoSoSVG)`
  ${css.size(20)};
  opacity: 0.85;
  margin-top: -1px;
`
export const Icon3 = styled(GoodSVG)`
  ${css.size(22)};
  opacity: 0.8;
`
