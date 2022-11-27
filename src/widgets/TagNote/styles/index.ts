import styled from 'styled-components'

import type { TTestable } from '@/spec'

import PinSVG from '@/icons/Pin'
// import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('justify-between')};
  flex-wrap: wrap;

  border-bottom: 2px solid;
  border-color: ${theme('divider')};
  /* border-radius: 5px; */
  /* box-shadow: rgb(0 0 0 / 7%) 0px 0px 24px; */
  /* padding: 30px 10px; */
  padding: 20px 0;
  padding-top: 15px;
  margin-bottom: 25px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 5px;
  width: 100%;
`
export const Title = styled.h2`
  color: ${theme('article.title')};
`
export const TagDot = styled.div`
  ${css.circle(10)};
  background: #849acd;
  margin-right: 10px;
`
export const PinIcon = styled(PinSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 2px;
  opacity: 0.8;

  transform: rotate(45deg);
`
