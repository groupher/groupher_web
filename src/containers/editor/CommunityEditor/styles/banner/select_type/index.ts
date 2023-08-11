import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Img from '@/Img'

export const Wrapper = styled.div<{ marginTop: boolean }>`
  position: relative;
  ${css.flexColumn('align-center')};
  color: ${theme('article.digest')};
  /* background-image: linear-gradient(#043B49, #022A35); */
  background-image: ${theme('banner.linearGradient')};
  width: 100%;
  min-height: 680px;
  margin-top: ${({ marginTop }) => (marginTop ? '68px' : '0')};
  transition: all 0.4s;
`
export const InnerWrapper = styled.div`
  ${css.flexColumn('align-center')};
  height: 380px;
  margin-top: 50px;
`
export const IntroTitle = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 20px;
  margin-left: -10px;
`
export const SloganTextWrapper = styled.div<{ highlight: boolean }>`
  margin-left: 3px;
  margin-right: 3px;

  font-weight: ${({ highlight }) => (highlight ? 'bold' : '')};
  color: ${({ highlight }) => (highlight ? theme('article.title') : theme('article.digest'))};
`
export const AddNewIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(18)};
  margin-right: 10px;
  transform: rotate(-90deg);
  margin-top: -1px;
`
export const Title = styled.div`
  color: ${theme('banner.title')};
  font-size: 1.1rem;
`
export const NextBtn = styled.div`
  ${css.flex('justify-center')};
  width: 280px;
  margin-top: 24px;
`
export const Note = styled.div`
  ${css.flex('align-center')};
  margin-top: 50px;
`
export const ErrorMsg = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 45px;
  color: ${theme('baseColor.red')};
  font-size: 13px;
`
export const InfoMsg = styled(ErrorMsg)`
  color: ${theme('button.primary')};
  bottom: 35px;
`
