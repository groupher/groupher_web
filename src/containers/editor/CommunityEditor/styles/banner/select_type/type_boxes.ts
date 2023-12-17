import type { TActive, TColor } from '@/spec'
import styled, { css, theme, rainbow, animate, gradientBg } from '@/css'

import CheckSVG from '@/icons/CheckBold'

import BrowserSVG from '@/icons/Browser'
import GameSVG from '@/icons/Game'
import RobotSVG from '@/icons/Robot'
import HammerSVG from '@/icons/Hammer'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 30px;
  height: 105px;
  width: 720px;
`
type TBox = { touched: boolean } & TActive
export const Box = styled.div<TBox>`
  ${css.column('align-start', 'justify-between')};
  padding: 5px;
  width: 152px;
  height: 100px;
  width: ${({ $active }) => (!$active ? '152px' : '158px')};
  height: ${({ $active }) => (!$active ? '100px' : '110px')};

  border-radius: 8px;
  border: 1px solid transparent;
  background: ${theme('alphaBg')};

  box-shadow: ${({ $active }) =>
    $active
      ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
      : 'rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;'};

  opacity: ${({ touched, $active }) => (touched && !$active ? 0.8 : 1)};
  transform: ${({ $active, $angle }) => ($active ? `rotate(${$angle}deg)` : '')};

  &:active {
    margin-top: 8px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transform: ${({ $angle }) => `rotate(${$angle}deg)`};
  }

  transition: all 0.2s;
`

type TInnerBox = TActive & TColor
export const InnerBox = styled.div<TInnerBox>`
  width: 100%;
  height: 100%;
  padding: 11px;
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  z-index: 1;
  position: relative;
  overflow: hidden;
`
export const ColorMask = styled.div<TInnerBox>`
  position: absolute;
  left: 0;
  top: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${({ $active, $color }) => ($active ? gradientBg($color) : 'transparent')};
  z-index: -1;
  margin-top: ${({ $active }) => ($active ? 0 : '20px')};
  transition: all 0.2s;

  ${InnerBox}:hover & {
    opacity: 1;
    margin-top: 0;
    background: ${({ $color }) => gradientBg($color)};
  }
`
export const Header = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  font-size: 12px;
`
export const MainText = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: 450;
  margin-top: 10px;
  margin-left: -1px;
`
export const CheckIcon = styled(CheckSVG)<TColor>`
  ${css.size(12)};
  fill: ${({ $color }) => rainbow($color)};
  margin-top: -3px;
  margin-right: -2px;
`
const commonIcon = (comp) => {
  return styled(comp)<TInnerBox>`
    ${css.size(20)};
    fill: ${({ $active, $color }) => ($active ? rainbow($color) : theme('hint'))};

    ${InnerBox}:hover & {
      animation: ${animate.jump} 0.3s linear;
      fill: ${({ $color }) => rainbow($color)};
    }
  `
}
export const Icon = {
  Browser: commonIcon(BrowserSVG),
  Game: styled(commonIcon(GameSVG))`
    ${css.size(19)};
  `,
  Hammer: commonIcon(HammerSVG),
  Robot: commonIcon(RobotSVG),
}
