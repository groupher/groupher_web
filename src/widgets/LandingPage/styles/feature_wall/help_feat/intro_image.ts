import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

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
  /* border: 1px solid; */
  /* border-color: ${theme('divider')}; */
  /* box-shadow: 0 5px 25px rgb(35 35 35 / 10%); */
`
export const ColorBlock = styled.div<TActive>`
  position: absolute;
  left: 0;
  top: 0;
  width: 600px;
  height: 390px;
  /* background: ${({ $active }) =>
    $active
      ? 'linear-gradient(137deg, rgba(244, 183, 180, 1) 52%, rgba(235, 171, 62, 1) 100%)'
      : theme('hoverBg')}; */

  background: linear-gradient(
    137deg,
    rgba(80, 161, 162, 0.7609637605042017) 52%,
    rgba(204, 191, 149, 0.7105435924369747) 100%
  );
  border-radius: 20px;
  transform: rotate(4deg);

  box-shadow: ${({ $active }) => ($active ? '0 5px 25px rgb(35 35 35 / 10%)' : 'none')};

  transition: all 0.3s;
  transition-delay: 0.8s;
`
