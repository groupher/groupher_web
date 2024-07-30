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

  return {
    link: cn(
      'row-center text-sm rounded px-2 py-px h-8 pointer no-underline border border-transparent',
      `hover:${fg('text.title')}`,
      `hover:${bg('hoverBg')}`,
      `hover:${br('divider')}`,
      fg('text.digest'),
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
