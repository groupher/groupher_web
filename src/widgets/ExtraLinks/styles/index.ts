import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/utils/css'
import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
`
export const LinkItem = styled(Link)`
  color: ${theme('article.digest')};
  text-decoration: none;

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
  width: 80px;
  padding: 4px 5px;
`

export const ArrowIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
`
