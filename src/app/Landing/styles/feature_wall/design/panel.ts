import styled, { css, theme, animate } from '@/css'

import CursorSVG from '@/icons/Cursor'
import { WithPosition } from '@/widgets/Common'

import { GradientText } from '../../index'

export const Wrapper = styled.div`
  padding: 15px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`
type TLine = {
  height?: number
  width?: number
  $hovering?: boolean
  $rotate?: number
  $opacity?: number
}
export const Line = styled(WithPosition)<TLine>`
  width: ${({ width }) => `${width || 350}px`};
  height: 10px;
  border-top: 1px dashed;
  border-top-color: ${theme('hint')};
  /* background: ${({ $hovering }) => ($hovering ? theme('rainbow.green') : theme('divider'))}; */
  /* opacity: ${({ $hovering }) => ($hovering ? 0.3 : 1)}; */
  opacity: 0.4;
  z-index: 2;
  transform: ${({ $rotate }) => `rotate(${$rotate || 0}deg)`};
  transition: all 0.2s;
`
export const Column = styled(WithPosition)<TLine>`
  height: ${({ height }) => `${height || 200}px`};
  width: 10px;
  border-right: 1px dashed;
  border-right-color: ${theme('hint')};
  opacity: 0.5;
  z-index: 2;
  transform: ${({ $rotate }) => `rotate(${$rotate || 0}deg)`};
  transition: all 0.2s;
`
export const IndexBar = styled(WithPosition)<TLine>`
  height: ${({ height }) => `${height || 40}px`};
  width: 1px;
  background: ${theme('rainbow.red')};
  z-index: 20;
  transition: all 0.2s;
  opacity: ${({ $opacity }) => $opacity || 0.8};

  &:before {
    content: "";
    position: absolute;
    top: -4px;
    left: -2px;
    ${css.circle(5)};
    border: 1px solid;
    border-color: ${theme('rainbow.red')};
  }
`
export const IndexRowBar = styled(WithPosition)<TLine>`
  width: ${({ width }) => `${width || 40}px`};

  height: 1px;
  background: ${theme('rainbow.red')};
  z-index: 20;
  transition: all 0.2s;
  opacity: ${({ $opacity }) => $opacity || 0.8};

  &:before {
    content: "";
    position: absolute;
    top: 0px;
    left: -5px;
    width: 10px;
    height: 1px;
    background: ${theme('rainbow.red')};
    transform: rotate(90deg);
  }
`
export const BottomIndexBar = styled(WithPosition)<TLine>`
  width: ${({ width }) => width || '136px'};
  height: 1px;
  background: ${theme('rainbow.red')};
  z-index: 20;
  transition: all 0.2s;
  opacity: ${({ $opacity }) => $opacity || 0.8};

  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -4px;
    ${css.circle(5)};
    border: 1px solid;
    border-color: ${theme('rainbow.red')};
  }

  &:after {
    content: "";
    position: absolute;
    top: -2px;
    right: -4px;
    ${css.circle(5)};
    border: 1px solid;
    border-color: ${theme('rainbow.red')};
  }
`

export const IndexText = styled(WithPosition)<{ $opacity?: number }>`
  color: ${theme('rainbow.red')};
  font-size: 9px;
  background: ${theme('htmlBg')};
  opacity: ${({ $opacity }) => $opacity || 0.8};
  padding: 0 5px;
  z-index: 30;
`
export const LeftIndexText = styled(IndexText)`
  transform: rotate(-90deg);
`

type TCursor = { top: number; right: number }
export const CursorIcon = styled(CursorSVG)<TCursor>`
  ${css.size(16)};
  fill: ${theme('rainbow.blue')};
  position: absolute;
  top: ${({ top }) => `${top}px`};
  right: ${({ right }) => `${right}px`};
  transition: all 0.2s;
`
export const CursorText = styled.div<TCursor>`
  font-size: 9px;
  font-weight: bold;
  background: ${theme('rainbow.blue')};
  color: ${theme('htmlBg')};
  position: absolute;
  border-radius: 4px;
  padding: 0 4px;
  top: ${({ top }) => `${top}px`};
  right: ${({ right }) => `${right}px`};
  opacity: 0.85;
  transition: all 0.2s;
`

export const CavansBlock = styled(WithPosition)<{ $rotate: number }>`
  transform: ${({ $rotate }) => `rotate(${$rotate || 0}deg)`};
  width: 274px;
  height: 152px;
  ${css.row('align-both')};
  background: ${theme('htmlBg')};
  border-radius: 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgb(128 128 128 / 10%) 0px 0px 20px;
  z-index: 10;

  transition: all 0.2s;
`
export const GridMask = styled.div`
  position: absolute;
  left: 40px;
  top: 22px;
  width: 180px;
  height: 115px;
  // https://pattern.monster/cross-section/
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='0.5' stroke='hsla(259, 0%, 28%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-16,-4)' fill='url(%23a)'/></svg>");
  opacity: 0.12;
  z-index: 11;
`
export const MainTextGradient = styled(GradientText)`
  position: absolute;
  top: 45px;
  left: 60px;
  font-size: 42px;
  letter-spacing: 2px;
  /* this seems styled-component's bug, need importort to overwrite */
  font-weight: 800 !important;
  z-index: 12;
  animation: ${animate.jump} 0.4s linear;
  transition: all 0.2s;
`
export const MainText = styled.div`
  position: absolute;
  top: 45px;
  left: 60px;
  color: ${theme('article.digest')};
  font-size: 42px;
  letter-spacing: 2px;
  font-weight: 700;
  z-index: 12;
`
