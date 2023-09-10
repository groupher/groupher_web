import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import Checker from '@/widgets/Checker'

import BrowserSVG from '@/icons/Browser'
import GameSVG from '@/icons/Game'
import RobotSVG from '@/icons/Robot'
import HammerSVG from '@/icons/Hammer'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 30px;
  height: 105px;
  width: 700px;
`
type TBox = { touched: boolean } & TActive
export const Box = styled.div<TBox>`
  ${css.column('align-start', 'justify-between')};
  padding: 10px 18px;
  padding-top: 18px;
  padding-right: 5px;
  width: 154px;
  height: 100px;

  border-radius: 5px;
  border: 1px solid;
  border-color: ${theme('article.digest')};

  border: ${({ active }) => (active ? '1px solid' : '1px solid')};
  border-top: ${({ active }) => (active ? '3px solid' : '1px solid')};

  border-color: ${({ active }) => (active ? theme('button.primary') : theme('lightText'))};
  box-shadow: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.1) 0px 10px 50px;' : 'none')};

  opacity: ${({ touched, active }) => (touched && !active ? 0.65 : 1)};
  transform: ${({ touched, active }) => (touched && !active ? 'scale(0.92)' : '')};

  &:hover {
    cursor: pointer;
    opacity: 1;
    border: 1px solid;
    border-top: ${({ active }) => (active ? '3px solid' : '1px solid')};
    border-color: ${theme('button.primary')};
  }
  transition: all 0.2s;
`
export const Header = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  font-size: 12px;
`

export const MainText = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  margin-left: -1px;
`
export const FooterText = styled.div`
  font-size: 13px;
  opacity: 0;
`
export const TheChecker = styled(Checker)`
  transform: scale(0.85);
  margin-top: -3px;
  margin-right: -2px;
`

const BrowserIcon = styled(BrowserSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};
`

const GameIcon = styled(GameSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};
`

const HammerIcon = styled(HammerSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};
`

const RobotIcon = styled(RobotSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};
`

export const Icon = {
  Browser: BrowserIcon,
  Game: GameIcon,
  Robot: RobotIcon,
  Hammer: HammerIcon,
}
