import styled, { keyframes } from 'styled-components'

import type { TSpace, TSizeTSM, TPrimaryColor } from '@/spec'
import { getRandomInt } from '@/helper'
import css, { rainbowTheme } from '@/css'

import { getLavaLampScale } from './metric'

const grow = keyframes`
  from {transform: scale(0,0); opacity: 0;}
  to {transform: scale(1,1); opacity: 1;}
`
const move = keyframes`
  from {transform: translateX(0px)}
  to {transform: translateX(80px)}
`

type TWrapper = TSpace & { size: TSizeTSM }
export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-both')};
  overflow: hidden;
  width: 80px;
  height: 18px;
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};

  transform: ${({ size }) => getLavaLampScale(size)};
`
export const Container = styled.div`
  ${css.row()};
  width: 100%;
  position: relative;
`
const speed = [0.3, 0.6, 3, 2, 1.6, 1.8]

const speedMap = {
  0: 0.8,
  1: 1,
  2: 1.2,
  3: 2,
  4: 0.6,
  5: 0.8,
  6: 1.6,
  7: 0.8,
  8: 0.3,
  9: 0.3,
}

type TCircle = { index: number } & TPrimaryColor
export const Circle = styled.span<TCircle>`
  ${css.circle(3)};
  background-color: ${({ primaryColor }) => rainbowTheme(primaryColor)};
  animation: ${move} 1s linear 0ms infinite;
  /* animation-duration: ${() => `${speed[getRandomInt(0, speed.length - 1)]}s`}; */
  width: ${({ index }) => (index === 2 || index === 6 ? '15px' : '4px')};
  animation-duration: ${({ index }) => `${speedMap[index]}s`};
  margin-right: 3px;

  &:first-child {
    position: absolute;
    top: 0;
    left: 0;
    animation: ${grow} 1s linear 0ms infinite;
  }

  &:last-child {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 0;
    animation: ${grow} 1s linear 0s infinite reverse;
  }
`
