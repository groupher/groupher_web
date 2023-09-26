import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'
import css, { theme, primaryTheme } from '@/css'

import LinkSVG from '@/icons/Link'
import ArrowUpRightSVG from '@/icons/ArrowUpRight'
import MoreSVG from '@/icons/menu/MoreL'

import { LinkItem as LinkItemBase, ArrowIcon as ArrowIconBase, MenuPanel as MenuPanelBase } from '.'

export const Wrapper = styled.div`
  gap: 0 16px;
`
export const LinkItem = styled(LinkItemBase)`
  ${css.row('align-center')};
  font-size: 13.5px;
  width: 160px;
  border-radius: 10px;
  height: 32px;
  margin-bottom: 4px;
`
export const MenuPanel = styled(MenuPanelBase)`
  gap: 5px 0;
`
export const MenuLinkItem = styled(LinkItem)`
  width: 140px !important;
  height: 28px;
  margin-bottom: 0;
  margin-top: 0;
  border-radius: 4px;
`

type TGroupItem = TActive & TPrimaryColor
export const GroupItem = styled(LinkItem)<TGroupItem>`
  ${css.row('align-center')};
  position: relative;
  padding-right: 22px;
  height: 28px;
  margin-top: 2px;
  margin-bottom: 2px;
  background: ${({ $active }) => ($active ? theme('hoverBg') : theme(''))};

  &:hover {
    background: ${theme('hoverBg')};
  }
`
export const ArrowIcon = styled(ArrowIconBase)`
  position: absolute;
  ${css.size(14)};
  right: 8px;
  opacity: 0.8;
`
export const MoreIcon = styled(MoreSVG)<TGroupItem>`
  ${css.size(14)};
  margin-right: 12px;
  margin-left: 1px;
  fill: ${({ $active, primaryColor }) => ($active ? primaryTheme(primaryColor) : theme('hint'))};

  ${LinkItem}:hover & {
    fill: ${({ primaryColor }) => primaryTheme(primaryColor)};
  }
`

export const LinkIcon = styled(LinkSVG)<TPrimaryColor>`
  ${css.size(20)};
  fill: ${theme('hint')};
  margin-right: 9px;
  margin-left: -1px;

  ${LinkItem}:hover & {
    fill: ${({ primaryColor }) => primaryTheme(primaryColor)};
  }
`

export const ArrowUpRightIcon = styled(ArrowUpRightSVG)<TPrimaryColor>`
  ${css.size(12)};
  fill: ${({ primaryColor }) => primaryTheme(primaryColor)};
  margin-top: 2px;
  margin-right: 1px;
  opacity: 0;

  ${LinkItem}:hover & {
    opacity: 1;
  }
`
