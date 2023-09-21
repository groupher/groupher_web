import styled from 'styled-components'
import Link from 'next/link'

import type { TActive, TPrimaryColor } from '@/spec'
import css, { theme, primaryTheme } from '@/css'
import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
type TLinkItem = TActive & TPrimaryColor

export const LinkItem = styled(Link)<TLinkItem>`
  color: ${({ $active, primaryColor }) =>
    $active ? primaryTheme(primaryColor) : theme('article.digest')};
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  text-decoration: none;
  display: flex;
  padding: 2px 8px;
  border-radius: 3px;

  &:hover {
    color: ${({ primaryColor }) => primaryTheme(primaryColor)};
    background: ${theme('hoverBg')};
    text-decoration: none;
    cursor: pointer;
  }
`

export const GroupItem = styled(LinkItem)`
  ${css.row('align-center')};
`

export const ColumnWrapper = styled.div`
  ${css.row('align-center')};
`

export const MenuPanel = styled.div`
  ${css.column()};
  width: 90px;
  padding: 2px 2px;
  gap: 8px 0;
`

export const ArrowIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
`
