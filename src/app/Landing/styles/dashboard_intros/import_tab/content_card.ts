import styled, { css } from '@/css'

import CurveLineSVG from './CurveLine'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 460px;
  height: 500px;
  z-index: 2;
  position: absolute;
  bottom: 100px;
  left: 140px;
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
