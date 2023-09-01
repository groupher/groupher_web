import styled from 'styled-components'

import css, { theme } from '@/css'

import DomainSVG from '@/icons/Domain'

export const Wrapper = styled.div`
  position: relative;
  ${css.column('align-both')};
  color: ${theme('article.digest')};
  /* background-image: linear-gradient(#043B49, #022A35); */
  background-image: ${theme('banner.linearGradient')};
  width: 100%;
  height: 260px;
`
export const IntroTitle = styled.div`
  position: relative;
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: -10px;
`

export const Title = styled.div`
  color: ${theme('banner.title')};
  font-size: 1.1rem;
`
export const DomainIcon = styled(DomainSVG)`
  fill: ${theme('article.title')};
  ${css.size(18)};
  margin-right: 10px;
`
export const NextBtn = styled.div`
  position: absolute;
  ${css.row('align-center', 'justify-around')};
  width: 200px;
  bottom: 25px;
  margin-left: 10px;
  filter: grayscale(1);
`
export const ErrorMsg = styled.div`
  position: absolute;
  bottom: 55px;
  color: ${theme('baseColor.red')};
  font-size: 13px;
`
