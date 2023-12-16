import type { TActive, TColor } from '@/spec'
import styled, { css, theme, rainbow, animate } from '@/css'

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

  border-radius: 8px;
  border: 1px solid transparent;
  /* border-color: ${($active) => ($active ? theme('divider') : 'transparent')} ; */
  background: ${theme('alphaBg')};

  box-shadow: ${({ $active }) =>
    $active
      ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
      : 'rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;'};

  opacity: ${({ touched, $active }) => (touched && !$active ? 0.8 : 1)};
  transform: ${({ touched, $active }) => (touched && !$active ? 'scale(0.92)' : '')};
  /* transform: scale(1); */

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    transform: scale(1);
  }

  transition: all 0.2s;
`

export const GRADIENT_BG = {
  PURPLE: 'linear-gradient(-149deg,#faf5ffd4 0%,rgb(222 198 243) 100%)',
  BLUE: 'linear-gradient(310deg,#fafdff 1.1989710908323433e-13%,rgb(209 237 255 / 83%) 100%)',
  GREEN: 'linear-gradient(-50deg,#fcfffc 0%,rgb(216 240 221 / 80%) 100%)',
  ORANGE: 'linear-gradient(244deg,#fffcf7 0%,rgb(255 234 217 / 72%) 100%)',
  PINK: 'linear-gradient(140deg,#fff5fb99 0%,rgb(255 231 230 / 84%) 100%)',
}

type TInnerBox = TActive & TColor
export const InnerBox = styled.div<TInnerBox>`
  width: 100%;
  height: 100%;
  padding: 11px;
  border-radius: 8px;
  background: ${({ $active, $color }) => ($active ? GRADIENT_BG[$color] : 'transparent')};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};
  z-index: 1;
  position: relative;
  overflow: hidden;

  ${Box}:hover &:after {
    opacity: 1;
    margin-top: 0px;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: ${({ $color }) => GRADIENT_BG[$color]};
    z-index: -1;
    margin-top: 20px;
    transition: all 0.2s;
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
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(20)};
    fill: ${theme('hint')};

    ${Box}:hover & {
      animation: ${animate.jump} 0.3s linear;
      fill: ${theme('article.digest')};
    }
  `
}

export const Icon = {
  Browser: commonIcon(BrowserSVG),
  Game: commonIcon(GameSVG),
  Hammer: commonIcon(HammerSVG),
  Robot: commonIcon(RobotSVG),
}
