import styled, { css, theme, animate } from '@/css'

import type { TActive } from '@/spec'

import CheckSVG from '@/icons/Check'

import PandaSVG from '@/icons/Panda'
import HuaSVG from '@/icons/Huaren'
import GuardSVG from '@/icons/EnGuard'
import TaowaSVG from '@/icons/Taowa'
import SpainSVG from '@/icons/SpainCow'

export const Wrapper = styled.div`
  padding: 10px 8px;
  animation: ${animate.fadeInBounce} 0.4s linear;
`
type TMenuBar = { $withTop: boolean } & TActive
export const MenuBar = styled.div<TMenuBar>`
  ${css.row('align-center')};
  gap: 0 10px;
  color: ${theme('article.digest')};
  font-size: 14px;
  height: 38px;
  width: 100%;
  padding: ${({ $withTop }) => ($withTop ? '2px 5px' : '2px 14px')};
  padding-right: 8px;
  background: ${({ $active }) => ($active ? theme('menuHoverBg') : '')};
  box-shadow: ${({ $active }) => ($active ? theme('shadow.xl') : '')};
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('divider') : 'transparent')};
  border-radius: 6px;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('shadow.xl')};
    border-color: ${theme('divider')};
    cursor: pointer;
  }
`

export const IconBox = styled.div<TActive>`
  ${css.size(26)};
  ${css.row('align-both')};
  border-radius: 5px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  &:hover {
    box-shadow: ${theme('shadow.xl')};
    background: ${theme('hoverBg')};
  }
`
export const PeopleBox = styled(IconBox)<TActive>`
  background: ${({ $active }) => ($active ? theme('rainbow.redBg') : '')};
  &:hover {
    background: ${theme('rainbow.redBg')};
  }
`
export const TopBox = styled(IconBox)<{ $show: boolean }>`
  max-width: ${({ $show }) => ($show ? '26px' : '0')};
  transition: all 0.2s;
`
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(18)};
    cursor: pointer;
  `
}

export const ICON = {
  Check: styled(commonIcon(CheckSVG))`
    ${css.size(16)};
    fill: ${theme('article.digest')};
  `,
  Guard: styled(commonIcon(GuardSVG))`
    ${css.size(19)};
  `,
  Taowa: styled(commonIcon(TaowaSVG))`
    ${css.size(19)};
  `,
  Hua: styled(commonIcon(HuaSVG))`
    fill: ${theme('article.digest')};
    margin-top: 1px;
  `,
  Panda: styled(commonIcon(PandaSVG))`
    margin-top: 4px;
  `,
  Spain: styled(commonIcon(SpainSVG))`
    ${css.size(20)};
    margin-top: -1px;
  `,
}
