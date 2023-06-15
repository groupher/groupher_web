import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css, { theme, animate } from '@/utils/css'

import Img from '@/Img'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div<TSpace>`
  ${css.flex('justify-center')};
  width: 100%;
  ${(props) => css.spaceMargins(props)};
`
export const InnerWrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  width: 220px;
`
export const EmptyWrapper = styled(Wrapper)<TSpace>`
  ${css.flex('align-both')};

  ${(props) => css.spaceMargins(props)};
`

export const ArrowLeftIcon = styled(ArrowSVG)<{ disabled: boolean }>`
  ${css.size(21)};
  fill: ${theme('article.digest')};

  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};

  &:hover {
    fill: ${({ disabled }) => (disabled ? theme('article.digest') : theme('article.title'))};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`

export const LeftArrow = styled.div`
  position: relative;
`

export const RightArrow = styled.div`
  position: relative;
`
export const LeftBar = styled.div`
  width: 5px;
  height: 3px;
  position: absolute;
  left: 22px;
  top: 9px;
  background: ${theme('article.digest')};
  opacity: 0;
  border-radius: 3px;

  ${LeftArrow}:hover & {
    opacity: 0.6;
    animation: ${animate.zoomIn} 0.1s linear;
    left: 16px;
  }

  transition: left 0.2s;
`

export const RightBar = styled.div`
  width: 5px;
  height: 3px;
  position: absolute;
  left: -3px;
  top: 9px;
  background: ${theme('article.digest')};
  opacity: 0;
  border-radius: 3px;

  ${RightArrow}:hover & {
    opacity: 0.6;
    animation: ${animate.zoomIn} 0.1s linear;
    left: 1px;
  }

  transition: left 0.2s;
`

export const ArrowRightIcon = styled(ArrowLeftIcon)`
  transform: rotate(180deg);
`

export const Main = styled.div`
  ${css.flex('align-center')};
  margin-left: 50px;
  margin-right: 50px;
`
// see https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
export const NumInputer = styled.input<{ value: number }>`
  height: 26px;
  width: ${({ value }) => (value >= 10 ? '35px' : '25px')};

  padding: 0 3px;
  outline: none;
  border: 1px solid;
  border-color: #d5d5d5; // TODO
  color: ${theme('article.digest')};
  text-align: center;
  border-radius: 7px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  &:hover {
    border-color: ${theme('article.info')};
  }

  &:focus {
    border-color: ${theme('article.info')};
  }

  transition: all 0.2s;
`
export const Slash = styled.div`
  font-size: 12px;
  margin-top: 1px;
  color: ${theme('article.digest')};
  margin-left: 8px;
  margin-right: 8px;
`
export const Total = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
`

export const BottomMsg = styled.div`
  font-size: 16px;
  color: ${theme('article.digest')};
  opacity: 0.6;
  &:before {
    content: '\/\\*';
    margin-right: 10px;
    font-family: monospace;
  }
  &:after {
    content: '*/';
    margin-left: 10px;
    font-family: monospace;
  }
`
export const CommonCenterArrowIcon = styled(Img)`
  fill: ${theme('article.info')};
  ${css.size(30)};
  transition: all 0.2s;
`
export const CommonBottomArrowIcon = styled(Img)`
  fill: ${theme('article.info')};
  ${css.size(16)};
  margin-bottom: 3px;
`
export const CommonNavi = styled.div`
  font-size: 18px;
  color: ${theme('article.info')};

  &:hover {
    font-weight: bold;
  }

  ${css.media.mobile`
    font-size: 14px;
  `};
`
export const CommonHint = styled.div`
  font-size: 12px;
  margin-bottom: 2px;
`
