import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import CheckSVG from '@/icons/Check'

export const Wrapper = styled.div`
  height: 320px;
  width: calc(100% + 6px);
  position: absolute;
  left: -3px;
  bottom: -50px;
  background: rgb(255, 255, 255);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40%);
  border-radius: 10px;
  padding: 0 82px;
  padding-top: 150px;
`
export const InnerWrapper = styled.div`
  width: calc(100% + 118px);
  ${css.flex()};
  flex-wrap: wrap;
  gap: 16px 0;
`
export const Item = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  width: 33%;
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(15)};
  margin-right: 8px;
  fill: ${theme('baseColor.green')};
`
export const Footer = styled.div`
  ${css.flex('align-both')};
  width: 100%;
  margin-top: 40px;
`
