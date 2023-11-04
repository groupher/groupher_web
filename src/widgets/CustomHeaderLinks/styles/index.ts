import styled from 'styled-components'
import Link from 'next/link'

import type { TActive, TColor } from '@/spec'
import css, { theme, rainbow } from '@/css'
import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
type TLinkItem = TActive & TColor

// export const LinkItem = styled.a<TLinkItem>`
export const LinkItem = styled(Link)<TLinkItem>`
  color: ${({ $active, $color }) =>
    $active ? rainbow($color, 'article.title') : theme('article.digest')};
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};

  text-decoration: none;
  display: flex;
  padding: 2px 8px;
  border-radius: 3px;
  filter: ${({ $active }) => ($active ? 'brightness(1.2)' : '')};

  &:hover {
    color: ${({ $color }) => rainbow($color, 'article.title')};
    filter: brightness(1.2);
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
  width: 140px;
  gap: 8px 0;
`
export const ArrowIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
`
