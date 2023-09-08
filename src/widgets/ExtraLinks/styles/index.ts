import styled from 'styled-components'
import Link from 'next/link'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'
import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
export const LinkItem = styled(Link)<TActive>`
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  text-decoration: none;
  display: block;
  padding: 2px 8px;
  border-radius: 3px;

  &:hover {
    color: ${theme('article.title')};
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
