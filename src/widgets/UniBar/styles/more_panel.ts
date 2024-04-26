import styled, { css, theme, animate } from '@/css'

import type { TActive } from '@/spec'

import ReportSVG from '@/icons/Report'
import SettingSVG from '@/icons/Setting'
import LinkSVG from '@/icons/ArrowUpRight'

export const Wrapper = styled.div`
  padding: 10px 8px;
  animation: ${animate.fadeInBounce} 0.4s linear;
`
export const MenuBar = styled.div<{ $withTop: boolean }>`
  ${css.row('align-center')};
  gap: 0 8px;
  color: ${theme('article.digest')};
  font-size: 14px;
  height: 38px;
  width: 100%;
  padding: ${({ $withTop }) => ($withTop ? '2px 5px' : '2px 16px')};
  padding-right: 8px;
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
  Dashboard: styled(commonIcon(SettingSVG))`
    ${css.size(18)};
    margin-left: -2px;
  `,
  Link: styled(commonIcon(LinkSVG))`
    opacity: 0;
    ${MenuBar}:hover & {
      opacity: 0.8;
    }
  `,
}
