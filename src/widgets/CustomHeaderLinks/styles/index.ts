import Link from 'next/link'

import type { TActive, TColor } from '~/spec'
import styled, { css, theme, rainbow } from '~/css'
import ArrowSVG from '~/icons/ArrowSimple'

import useTwBelt from '~/hooks/useTwBelt'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
type TLinkItem = TActive & TColor

export default () => {
  const { cn, fg, bg, br, primary, fill } = useTwBelt()

  const link = cn(
    'row-center text-sm rounded px-1.5 h-8 pointer no-underline',
    `hover:${fg('text.title')}`,
    `hover:${bg('hoverBg')}`,
    fg('text.digest'),
  )

  return {
    link,
    menuLink: cn(
      link,
      'border border-transparent',
      `hover:${bg('menuHoverBg')}`,
      `hover:${br('divider')}`,
    ),
    linkActive: cn(primary('fg'), bg('hoverBg')),
    arrowIcon: cn('absolute size-3.5 right-px -rotate-90', fill('text.digest')),
  }
}

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
