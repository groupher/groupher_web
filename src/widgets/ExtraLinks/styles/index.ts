import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'
import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
`
export const LinkItem = styled(Link)`
  color: ${theme('article.digest')};
  text-decoration: none;
  display: block;

  &:hover {
    color: ${theme('article.title')};
    text-decoration: none;
    cursor: pointer;
  }
`

export const GroupItem = styled(LinkItem)`
  ${css.flex('align-center')};
`

export const ColumnWrapper = styled.div`
  ${css.flex('align-center')};
`

export const MenuPanel = styled.div`
  ${css.flexColumn()};
  width: 80px;
  padding: 4px 5px;
  gap: 5px 0;
`

export const ArrowIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
`
