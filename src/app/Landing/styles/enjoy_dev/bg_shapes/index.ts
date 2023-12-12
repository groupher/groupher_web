import styled from 'styled-components'

import css, { animate, theme } from '@/css'

import CurveLine1SVG from './CurveLine1'
import CurveLine2SVG from './CurveLine2'
import CurveLine3SVG from './CurveLine3'
import CurveLine4SVG from './CurveLine4'

import TwoLineSVG from './TwoLine'

import ShapeCircleSVG from './ShapeCircle'
// import ShapeCross1SVG from './ShapeCross1'
import ShapeCross2SVG from './ShapeCross2'

import ShapeCircleHalfSVG from './ShapeCircleHalf'

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const CurveLine1 = styled(CurveLine1SVG)`
  ${css.size(300)};
  position: absolute;
  top: 65px;
  left: 184px;
  transform: scaleY(1.05) rotate(1deg);
  z-index: -1;
  filter: drop-shadow(2px 4px 6px lightgrey);

  animation: ${animate.blinker} 4s linear infinite alternate;

  ${css.media.mobile`
    animation: none;
  `};
`

export const CurveLine2 = styled(CurveLine2SVG)`
  ${css.size(300)};
  position: absolute;
  top: 73px;
  left: 567px;
  transform: scaleY(0.92) rotate(1deg);
  z-index: -1;
  filter: drop-shadow(2px 4px 6px lightgrey);

  animation: ${animate.blinker} 3s cubic-bezier(0.17, 0.67, 0.91, 0.27) infinite alternate;

  ${css.media.mobile`
    animation: none;
  `};
`

export const CurveLine3 = styled(CurveLine3SVG)`
  ${css.size(300)};
  position: absolute;
  top: 272px;
  left: 208px;
  transform: scaleY(1.42) rotate(1deg);
  z-index: -1;
  filter: drop-shadow(2px 4px 6px lightgrey);

  animation: ${animate.blinker} 2s cubic-bezier(0.53, 0.24, 0.91, 0.27) infinite alternate;
  animation-delay: 2s;

  ${css.media.mobile`
    animation: none;
  `};
`
export const CurveLine4 = styled(CurveLine4SVG)`
  ${css.size(300)};
  position: absolute;
  top: 263px;
  left: 600px;
  transform: scaleY(1.3) rotate(1deg);
  z-index: -1;
  filter: drop-shadow(2px 4px 6px lightgrey);

  animation: ${animate.blinker} 1s cubic-bezier(0.09, 0.74, 0.36, 1.05) infinite alternate;

  ${css.media.mobile`
    animation: none;
  `};
`

export const ShapeCross1Icon = styled(ShapeCross2SVG)`
  ${css.size(20)};
  position: absolute;
  bottom: 70px;
  right: 120px;
  fill: #ffe4a0;
  opacity: 0.6;

  animation: ${animate.breath} 1s linear infinite alternate;
  transition: all 0.2s;

  ${css.media.mobile`
    animation: none;
  `};
`
export const ShapeCross2Icon = styled(ShapeCross2SVG)`
  ${css.size(16)};
  position: absolute;
  bottom: 40px;
  right: 140px;
  fill: #ff6754;
  opacity: 0.3;
`

export const ShapeCircleIcon = styled(ShapeCircleSVG)`
  ${css.circle(25)};
  fill: #c287ba;
  position: absolute;
  top: 10px;
  left: 70px;
  opacity: 0.65;
`
export const ShapeCircle2Icon = styled.div`
  ${css.circle(22)};
  border: 3px solid;
  border-color: #f4e5f1;
  position: absolute;
  top: 50px;
  left: 65px;
`

export const ShapeSquareIcon = styled.div`
  ${css.size(16)};
  border-radius: 4px;
  background: #5a7ab7;
  position: absolute;
  bottom: 50px;
  left: 65px;
  transform: rotate(45deg);
  opacity: 0.3;
`

export const ShapeSquare2Icon = styled.div`
  ${css.size(16)};
  border-radius: 3px;
  background: #5a7ab7;
  position: absolute;
  top: 530px;
  left: 65px;
  transform: rotate(45deg);
  opacity: 0.1;
`

export const ShapeCircleHalfIcon = styled(ShapeCircleHalfSVG)`
  ${css.size(50)};
  fill: orange;
  position: absolute;
  top: 38px;
  left: 858px;
  transform: rotate(-140deg);
  opacity: 0.4;
`

export const TwoLineIcon = styled(TwoLineSVG)`
  ${css.size(32)};
  fill: ${theme('hint')};
  position: absolute;
  top: 75px;
  left: 855px;
  opacity: 0.2;
  transform: rotate(30deg);
`
