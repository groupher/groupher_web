import styled, { css, theme } from '~/css'

import type { TActive } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'

type TProps = TActive

export default ({ active }: TProps) => {
  const { cn, fg, bg, br } = useTwBelt()
  const { inView: badgeInView } = useCommunityDigestViewport()

  return {
    wrapper: cn(
      'row-center gap-y-2.5 h-9 text-sm py-0.5 px-1.5 border border-transparent pointer rounded-md',
      active ? 'pr-2 pl-2' : 'pl-3.5',
      badgeInView ? 'pl-3.5' : 'pl-2.5',
      active && bg('menuHoverBg'),
      active && br('divider'),
      active ? fg('text.title') : fg('text.digest'),
      `hover:${fg('text.title')}`,
      `hover:${bg('menuHoverBg')}`,
    ),
  }
}

type TMenuBar = { $withTop: boolean } & TActive
export const MenuBar = styled.div<TMenuBar>`
  ${css.row('align-center')};
  gap: 0 10px;
  color: ${theme('article.digest')};
  font-size: 14px;
  height: 38px;
  width: 100%;
  padding: ${({ $withTop }) => ($withTop ? '2px 5px' : '2px 14px')};
  padding-right: 8px;
  background: ${({ $active }) => ($active ? theme('menuHoverBg') : '')};
  box-shadow: ${({ $active }) => ($active ? theme('shadow.xl') : '')};
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('divider') : 'transparent')};
  border-radius: 6px;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('shadow.xl')};
    border-color: ${theme('divider')};
    cursor: pointer;
  }
`
