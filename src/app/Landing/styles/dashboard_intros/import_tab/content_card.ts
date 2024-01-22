import styled, { css } from '@/css'

import CurveLineSVG from './CurveLine'
import LineSVG from './Line'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 460px;
  height: 500px;
  z-index: 2;
  position: absolute;
  bottom: 100px;
  left: 140px;
`
export const LineIcon = styled(LineSVG)`
  height: 80px;
  position: absolute;
  top: 118px;
  left: 141px;
  transform: rotate(90deg);
`
export const LineIcon2 = styled(LineSVG)`
  height: 80px;
  position: absolute;
  bottom: 136px;
  left: 159px;
  transform: rotate(-90deg);
`
export const CurveLineIcon1 = styled(CurveLineSVG)`
  position: absolute;
  top: -50px;
  left: 20px;
  width: 200px;
  height: 350px;
  transform: rotateX(180deg) rotateZ(352deg);
`
export const CurveLineIcon2 = styled(CurveLineSVG)`
  position: absolute;
  top: -50px;
  right: 20px;
  width: 200px;
  height: 350px;
  transform: rotateZ(172deg);
`
export const CurveLineIcon3 = styled(CurveLineSVG)`
  position: absolute;
  bottom: -30px;
  left: 20px;
  width: 200px;
  height: 350px;
  transform: rotate(-8deg);
`
export const CurveLineIcon4 = styled(CurveLineSVG)`
  position: absolute;
  bottom: -30px;
  right: 20px;
  width: 200px;
  height: 350px;
  transform: rotateY(180deg) rotateZ(-8deg);
`
