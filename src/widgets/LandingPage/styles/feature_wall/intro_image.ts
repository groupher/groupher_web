import styled from 'styled-components'

import type { TTestable } from '@/spec'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 500px;
  height: 400px;
  position: relative;
`
export const Image = styled(Img)`
  ${css.size(475)};
  width: 510px;
  border-radius: 5px;
  object-fit: cover;
  /* box-shadow: ${css.cardShadow}; */
  /* box-shadow: 0 5px 25px rgb(35 35 35 / 10%); */
`
export const ColorBlock = styled.div`
  position: absolute;
  left: 20px;
  top: 0;
  ${css.size(455)};
  width: 500px;
  background: #d9edf2;
  border-radius: 10px;
  transform: rotate(1.5deg);
  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
export const ColorBlock2 = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0;
  ${css.size(455)};
  width: 500px;
  background: #ffb4b2;
  border-radius: 10px;
  transform: rotate(-1.5deg);
  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
