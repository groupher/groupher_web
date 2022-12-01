import styled from 'styled-components'

import type { TTestable } from '@/spec'

import InfoSVG from '@/icons/Info'
// import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('justify-between')};
  flex-wrap: wrap;

  border-bottom: 1px solid;
  border-color: ${theme('divider')};
  /* border-radius: 5px; */
  /* box-shadow: rgb(0 0 0 / 7%) 0px 0px 24px; */
  /* padding: 30px 10px; */
  padding: 20px 0;
  padding-top: 15px;
  margin-bottom: 25px;
  margin-top: -8px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 5px;
  width: 100%;
`
export const Title = styled.h2`
  color: ${theme('article.title')};
`
export const Desc = styled.p`
  line-height: 1.75em;
  font-size: 13px;
  color: ${theme('article.digest')};
`
export const TagDot = styled.div`
  ${css.circle(12)};
  background: #849acd;
  margin-right: 12px;
`
export const InfoIcon = styled(InfoSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  margin-right: 2px;
  opacity: 0.7;

  /* transform: rotate(45deg); */
`
