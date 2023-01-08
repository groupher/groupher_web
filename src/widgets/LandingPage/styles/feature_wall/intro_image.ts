import styled from 'styled-components'

import type { TTestable } from '@/spec'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  flex-grow: 1;
  /* width: 500px;
  height: 440px; */
  position: relative;
`
export const Image = styled(Img)`
  width: 600px;
  height: 400px
  border-radius: 5px;
  object-fit: cover;
  box-shadow: ${css.cardShadow};
  border-radius: 5px;
  /* border: 1px solid; */
  /* border-color: ${theme('divider')}; */
  /* box-shadow: 0 5px 25px rgb(35 35 35 / 10%); */
`
export const ColorBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 600px;
  height: 390px;
  /* background: #ffb4b2; */
  background: rgb(244, 183, 180);
  background: linear-gradient(137deg, rgba(244, 183, 180, 1) 52%, rgba(235, 171, 62, 1) 100%);

  border-radius: 20px;
  transform: rotate(-5deg);
  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
export const ColorBlock2 = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0;
  ${css.size(455)};
  width: 500px;
  border-radius: 10px;
  transform: rotate(-1.5deg);
  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
