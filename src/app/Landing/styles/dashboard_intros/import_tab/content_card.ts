import styled, { css, theme, animate } from '@/css'
import { WithPosition } from '@/widgets/Common'

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
export const Bot = styled(WithPosition)`
  width: auto;
  color: ${theme('article.digest')};
  padding: 6px 10px;
  background: ${theme('alphaBg')};
  font-weight: bold;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 18px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
`
export const BgBubble = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 190px;
  left: 180px;
  border-radius: 38px;
  background: ${theme('gradientBg.green')};
  animation: ${animate.rotate360} 6s linear infinite;
`
export const LeftBgBubble = styled(BgBubble)`
  width: 50px;
  height: 50px;
  border-radius: 18px;
  top: 215px;
  left: 50px;
  background: ${theme('gradientBg.green')};
`
export const RightBgBubble = styled(BgBubble)`
  width: 48px;
  height: 45px;
  border-radius: 18px;
  top: 215px;
  left: 360px;
  background: ${theme('gradientBg.orange')};
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
