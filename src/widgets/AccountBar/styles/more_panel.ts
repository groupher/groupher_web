import styled, { css, theme } from '@/css'

import type { TActive } from '@/spec'

import ReportSVG from '@/icons/Report'
import SettingSVG from '@/icons/Setting'

export const Wrapper = styled.div`
  padding: 10px 8px;
`
export const MenuBar = styled.div<{ $withTop: boolean }>`
  ${css.row('align-center')};
  gap: 0 8px;
  color: ${theme('article.digest')};
  font-size: 14px;
  height: 35px;
  width: 100%;
  padding: 2px 15px;
  padding: ${({ $withTop }) => ($withTop ? '2px 12px' : '2px 18px')};
  border: 1px solid;
  border-color: transparent;
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
  transition: all .2s;
`
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(15)};
    fill: ${theme('article.digest')};
    cursor: pointer;

    &:hover {
      fill: ${theme('article.title')};
    }
  `
}

export const ICON = {
  Report: commonIcon(ReportSVG),
  Dashboard: commonIcon(SettingSVG),
}
