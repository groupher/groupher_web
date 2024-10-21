import styled, { css, theme, animate } from '~/css'
import { WithPosition } from '~/widgets/Common'

import CurveLineSVG from './CurveLine'
import LineSVG from './Line'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 460px;
  height: 500px;
  z-index: 2;
  position: absolute;
  bottom: 40px;
  left: -20px;
`
export const Bot = styled(WithPosition)`
  width: auto;
  color: ${theme('article.digest')};
  padding: 4px 10px;
  background: ${theme('gradientBg.green')};
  font-weight: bold;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
`
export const AI = styled(WithPosition)`
  width: auto;
  color: ${theme('article.digest')};
  padding: 4px 10px;
  background: ${theme('gradientBg.orange')};
  font-weight: bold;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
`
export const BgBubble = styled.div`
  width: 180px;
  height: 180px;
  position: absolute;
  top: 155px;
  left: 140px;
  border-radius: 78px;
  background: ${theme('gradientBg.green')};
  animation: ${animate.rotate360} 6s linear infinite;
  z-index: 1;
`
export const LeftBgBubble = styled(BgBubble)`
  width: 46px;
  height: 46px;
  border-radius: 18px;
  top: 225px;
  left: 50px;
  background: ${theme('gradientBg.orange')};
`
export const RightBgBubble = styled(BgBubble)`
  width: 48px;
  height: 40px;
  border-radius: 18px;
  top: 225px;
  left: 360px;
  background: ${theme('gradientBg.green')};
`
export const HLineIcon = styled(LineSVG)`
  height: 80px;
  position: absolute;
  top: 215px;
  left: 28px;
`
export const HLineIcon2 = styled(LineSVG)`
  height: 80px;
  position: absolute;
  top: 198px;
  right: 30px;
  z-index: 100;
  transform: rotate(180deg);
`
export const LineIcon = styled(LineSVG)`
  height: 80px;
  position: absolute;
  top: 90px;
  left: 141px;
  transform: rotate(90deg);
`
export const LineIcon2 = styled(LineSVG)`
  height: 80px;
  position: absolute;
  bottom: 96px;
  left: 159px;
  transform: rotate(-90deg);
`
export const CurveLineIcon1 = styled(CurveLineSVG)`
  position: absolute;
  top: -80px;
  left: 20px;
  width: 200px;
  height: 350px;
  transform: rotateX(180deg) rotateZ(352deg);
`
export const CurveLineIcon2 = styled(CurveLineSVG)`
  position: absolute;
  top: -80px;
  right: 20px;
  width: 200px;
  height: 350px;
  transform: rotateZ(172deg);
`
export const CurveLineIcon3 = styled(CurveLineSVG)`
  position: absolute;
  bottom: -70px;
  left: 20px;
  width: 200px;
  height: 350px;
  transform: rotate(-8deg);
`
export const CurveLineIcon4 = styled(CurveLineSVG)`
  position: absolute;
  bottom: -70px;
  right: 20px;
  width: 200px;
  height: 350px;
  transform: rotateY(180deg) rotateZ(-8deg);
`
